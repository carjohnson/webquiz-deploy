// services/manager/deletePacsService.js
const fs = require("fs");
const path = require("path");
const { getClient } = require("../../utils/orthancClient");
const { getStamp } = require("../../utils/dirUtils");

/**
 * Deletes ALL studies from Orthanc. Destructive and irreversible unless
 * Orthanc has its own backup/replication configured.
 *
*
 * @param {string} logsRoot - directory to write the run log into
 * @param {object} opts
 * @param {boolean} opts.confirm - must be explicitly true, or the function throws
 *   without deleting anything. This is a deliberate guard rail against a
 *   route/cron accidentally calling this with no user intent behind it.
 * @param {boolean} [opts.dryRun=false] - if true, logs what WOULD be deleted
 *   but makes no delete calls. Useful to sanity check the study count first.
 */
async function deleteAllStudies(logsRoot, opts = {}) {
  const { confirm, dryRun = false } = opts;

  if (!confirm) {
    throw new Error(
      "deleteAllStudies() refused to run: pass { confirm: true } to actually delete studies " +
        "(use { confirm: true, dryRun: true } to preview first)."
    );
  }

  const client = getClient();

  fs.mkdirSync(logsRoot, { recursive: true });

  const timestamp = getStamp();
  const logFileName = `pacs_delete_${timestamp}.log`;
  const logPath = path.join(logsRoot, logFileName);

  const logLines = [];
  const log = (msg) => logLines.push(`[${new Date().toISOString()}] ${msg}`);

  const failures = [];
  let deletedCount = 0;

  log(dryRun ? "DRY RUN: Fetching study list from Orthanc..." : "Fetching study list from Orthanc...");

  let studies;
  try {
    const resp = await client.get("/studies", { params: { expand: true } });
    studies = resp.data;
  } catch (err) {
    log(`Failed to reach Orthanc: ${err.message}`);
    fs.writeFileSync(logPath, logLines.join("\n"), "utf8");
    throw new Error(`Failed to connect to Orthanc: ${err.message}`);
  }
  log(`Found ${studies.length} studies`);

  for (const study of studies) {
    const studyId = study.ID;
    const studyUID = (study.MainDicomTags || {}).StudyInstanceUID;

    if (dryRun) {
      log(`Would delete study ${studyId} (${studyUID})`);
      continue;
    }

    try {
      await client.delete(`/studies/${studyId}`);
      deletedCount += 1;
      log(`Deleted study ${studyId} (${studyUID})`);
    } catch (err) {
      const msg = `Failed to delete study ${studyId} (${studyUID}): ${err.message}`;
      log(msg);
      failures.push(msg);
    }
  }

  log(
    dryRun
      ? `Dry run complete. ${studies.length} studies would be deleted.`
      : `Done. Deleted ${deletedCount} of ${studies.length} studies (${failures.length} failures).`
  );
  fs.writeFileSync(logPath, logLines.join("\n"), "utf8");

  return {
    logFile: logFileName,
    logPath,
    studyCount: studies.length,
    successCount: deletedCount,
    failCount: failures.length,
    failures,
    dryRun,
  };
}

module.exports = { deleteAllStudies };