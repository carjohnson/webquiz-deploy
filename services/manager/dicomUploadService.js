// services/manager/dicomUploadService.js
//
// Uploads a staged, extracted DICOM zip into Orthanc via its REST API.
// This is a port of the standalone ImportDicomFiles.py script onto the
// app's own Orthanc connection (utils/orthancClient.js) and log-file
// conventions (see restoreService.js / pacsScrapeService.js), run from
// the manager's "Upload DICOMS" task instead of from the command line.
//

const path = require("path");
const fsPromise = require("fs/promises");

const { getClient } = require("../../utils/orthancClient");
const { getStamp } = require("../../utils/dirUtils");
const { walkFiles } = require("../../utils/fileWalk");

// ----------------------- Configuration -----------------------
const REQUEST_TIMEOUT_MS = 20 * 1000;   // fail fast instead of hanging forever
const MAX_RETRIES = 10;                 // max attempts per file before skipping
const RETRY_DELAY_MS = 2 * 1000;        // pause between retries

const WAKEUP_TIMEOUT_MS = 60 * 1000;    // patience for the initial wake-up ping
const WAKEUP_MAX_RETRIES = 6;           // how many times to try waking the server
const WAKEUP_RETRY_DELAY_MS = 5 * 1000; // pause between wake-up attempts

// How many files are uploaded to Orthanc at once. Kept modest (unlike
// restoreSegFiles' CONCURRENCY=4 local disk copy) since these are real
// network requests against what may be a small/free-tier PACS instance.
const CONCURRENCY = 3;
// ---------------------------------------------------------------------

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function logLine(msg, LOG_FILE) {
  await fsPromise.appendFile(LOG_FILE, `[${new Date().toISOString()}] ${msg}\n`);
  console.log(msg);
}

// =========================================================
// Same "is this actually DICOM, or a stray JSON file that got zipped up
// alongside it" check as ImportDicomFiles.py's IsJson -- content-based,
// not filename-based, since nothing enforces a .json extension on
// metadata files a scanner/export tool might drop into the same folder.
function looksLikeJson(buffer) {
  try {
    JSON.parse(buffer.toString("utf8"));
    return true;
  } catch {
    return false;
  }
}

// =========================================================
// Pings Orthanc once before the real upload loop starts, so a sleeping
// free-tier host has a chance to wake up on its own patience budget,
// rather than burning through the first file's retry budget. A 5xx
// response (or no response at all) means the server process is still
// coming up, so we keep waiting; anything else (200, 401, 404, etc.)
// means the server is actually answering requests.
async function wakeUpServer(client, LOG_FILE) {
  await logLine("Waking up Orthanc...", LOG_FILE);

  for (let attempt = 1; attempt <= WAKEUP_MAX_RETRIES; attempt++) {
    try {
      const resp = await client.get("/system", {
        timeout: WAKEUP_TIMEOUT_MS,
        validateStatus: () => true, // inspect the status ourselves, don't throw on 4xx/5xx
      });

      if (resp.status < 500) {
        await logLine(
          `Orthanc is up (HTTP ${resp.status}) on wake-up attempt ${attempt}/${WAKEUP_MAX_RETRIES}. Proceeding.`,
          LOG_FILE
        );
        return true;
      }

      await logLine(
        `Wake-up attempt ${attempt}/${WAKEUP_MAX_RETRIES}: Orthanc returned HTTP ${resp.status} (still starting up?), retrying...`,
        LOG_FILE
      );
    } catch (err) {
      await logLine(
        `Wake-up attempt ${attempt}/${WAKEUP_MAX_RETRIES} failed (${err.message}), retrying...`,
        LOG_FILE
      );
    }

    if (attempt < WAKEUP_MAX_RETRIES) {
      await sleep(WAKEUP_RETRY_DELAY_MS);
    }
  }

  await logLine(
    "WARNING: Could not confirm Orthanc is awake. Proceeding anyway -- the first file(s) may need extra retries.",
    LOG_FILE
  );
  return false;
}

// =========================================================
// Uploads a single file to Orthanc's /instances endpoint, retrying up to
// MAX_RETRIES times on connection failure / timeout / non-200 response
// before giving up and skipping the file. Returns a short status string
// ('imported', 'ignored_json', or 'skipped') for the caller to tally.
async function uploadOneFile(client, absPath, relPath, LOG_FILE) {
  const content = await fsPromise.readFile(absPath);

  if (looksLikeJson(content)) {
    await logLine(`Ignored (JSON, not DICOM): ${relPath}`, LOG_FILE);
    return "ignored_json";
  }

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const resp = await client.post("/instances", content, {
        headers: { "Content-Type": "application/dicom" },
        timeout: REQUEST_TIMEOUT_MS,
        maxBodyLength: Infinity,
        maxContentLength: Infinity,
        validateStatus: () => true,
      });

      if (resp.status === 200) {
        await logLine(`Imported (attempt ${attempt}/${MAX_RETRIES}): ${relPath}`, LOG_FILE);
        return "imported";
      }
      // Non-200: fall through to retry below.
    } catch {
      // connection failure / timeout -- fall through to retry below.
    }

    if (attempt < MAX_RETRIES) {
      await sleep(RETRY_DELAY_MS);
    }
  }

  await logLine(`SKIPPED after ${MAX_RETRIES} failed attempts: ${relPath}`, LOG_FILE);
  return "skipped";
}

// =========================================================
// Groups a flat list of relative paths (as returned by walkFiles) by
// their top-level folder -- one group per "study" for both the log
// file's per-folder summary lines and the studies breakdown returned
// to the caller (e.g. for the status page's per-study table). Files
// sitting directly at stagingDir's root are grouped under "(root)".
function groupByTopFolder(relFiles) {
  const groups = new Map();
  for (const relPath of relFiles) {
    const slashIdx = relPath.indexOf("/");
    const folder = slashIdx === -1 ? "(root)" : relPath.slice(0, slashIdx);
    if (!groups.has(folder)) groups.set(folder, []);
    groups.get(folder).push(relPath);
  }
  return groups;
}

// =========================================================
// Main function
// =========================================================

/**
 * @param {string} stagingDir - path to the extracted uploaded DICOM zip
 *   (staged via utils/restoreUpload.js's stageUploadedBackup, same as
 *   restore -- see managerController.upload_dicoms; it gets deleted
 *   right after this function returns, in upload_dicoms_post's cleanup).
 * @param {string} logsRoot - absolute path to the persistent folder
 *   (unlike stagingDir, NOT cleaned up) where each run's log file is
 *   written, one per run, timestamped so nothing gets overwritten.
 */
exports.runDicomUpload = async (stagingDir, logsRoot) => {
  await fsPromise.mkdir(logsRoot, { recursive: true });
  const logFileName = `DicomUploadLog_${getStamp()}.log`;
  const LOG_FILE = path.join(logsRoot, logFileName);

  const client = getClient();

  let importedCount = 0;
  let ignoredJsonCount = 0;
  let skippedCount = 0;
  const failures = [];

  try {
    await logLine(`*** RUNNING DICOM UPLOAD: ${stagingDir}`, LOG_FILE);

    await wakeUpServer(client, LOG_FILE);

    const relFiles = await walkFiles(stagingDir);
    const totalFileCount = relFiles.length;
    await logLine(`Found ${totalFileCount} file(s) to process.`, LOG_FILE);

    const folderGroups = groupByTopFolder(relFiles);

    // Bounded-concurrency pool, same pattern as restoreService's
    // restoreSegFiles -- not opening/uploading hundreds of files at once.
    const resultsByRelPath = new Map();
    let cursor = 0;
    async function worker() {
      while (cursor < relFiles.length) {
        const idx = cursor++;
        const relPath = relFiles[idx];
        const absPath = path.join(stagingDir, ...relPath.split("/"));
        try {
          const status = await uploadOneFile(client, absPath, relPath, LOG_FILE);
          resultsByRelPath.set(relPath, status);
          if (status === "imported") importedCount++;
          else if (status === "ignored_json") ignoredJsonCount++;
          else if (status === "skipped") {
            skippedCount++;
            failures.push({ file: relPath, error: `Skipped after ${MAX_RETRIES} failed attempts` });
          }
        } catch (err) {
          skippedCount++;
          failures.push({ file: relPath, error: err.message });
          await logLine(`FAILED (unexpected error) ${relPath}: ${err.message}`, LOG_FILE);
        }
      }
    }
    await Promise.all(Array.from({ length: CONCURRENCY }, worker));

    // One summary line per top-level folder ("study"), same as
    // ImportDicomFiles.py's PrintFolderSummary -- and, unlike before,
    // also handed back to the caller as `studies` so the status page
    // can show a per-study breakdown instead of only totals.
    const studies = [];
    for (const [folder, filesInFolder] of folderGroups) {
      const statuses = filesInFolder.map((f) => resultsByRelPath.get(f));
      const imported = statuses.filter((s) => s === "imported").length;
      const ignoredJson = statuses.filter((s) => s === "ignored_json").length;
      const skipped = statuses.filter((s) => s === "skipped").length;
      const parts = [];
      if (imported) parts.push(`${imported} imported`);
      if (skipped) parts.push(`${skipped} skipped`);
      if (ignoredJson) parts.push(`${ignoredJson} JSON ignored`);
      await logLine(`Folder ${folder}: ${parts.join(", ") || "no files"}`, LOG_FILE);
      studies.push({
        name: folder,
        totalFiles: filesInFolder.length,
        imported,
        ignoredJson,
        skipped,
      });
    }
    studies.sort((a, b) => a.name.localeCompare(b.name));

    await logLine(
      `Done. ${importedCount} imported, ${skippedCount} skipped, ${ignoredJsonCount} JSON ignored (of ${totalFileCount} total).`,
      LOG_FILE
    );

    return {
      stagingDir,
      logFile: logFileName,
      totalFileCount,
      successCount: importedCount,
      ignoredJsonCount,
      skippedCount,
      failCount: skippedCount,
      failures,
      studies,
    };
  } catch (err) {
    await logLine(`DICOM UPLOAD FAILED: ${err.message}`, LOG_FILE).catch(() => {});
    throw new Error(`Dicom upload failed: ${err.message}`);
  }
};
