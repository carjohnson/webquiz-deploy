require("dotenv").config();

const path = require('path');
const fsSync = require("fs");
const fsPromise = require("fs/promises");
const { EJSON } = require("bson");

const { connectToModeDb, ensureDatabaseExists } = require('../../utils/dbConnection');
const { getBackupCollections, getStamp } = require('../../utils/backupDirUtils');

const CONCURRENCY = 4;

// =========================================================
// Helpers
// =========================================================

// =========================================================
async function logLine(msg, LOG_FILE) {
  await fsPromise.appendFile(LOG_FILE, `[${new Date().toISOString()}] ${msg}\n`);
}

// =========================================================
async function restoreSingleCollection(db, stagingDir, colName) {
  // Map MongoDB collection name → backup filename
  const backupFileName = `${colName}-collection`;
  const filePath = path.join(stagingDir, `${backupFileName}.json`);

  if (!fsSync.existsSync(filePath)) {
    throw new Error(`Backup file not found: ${filePath}`);
  }

  const raw = await fsPromise.readFile(filePath, "utf8");

  // Convert EJSON → BSON
  const docs = EJSON.parse(raw);

  const collection = db.collection(colName);

  // Clear the collection first so the restore fully replaces its
  // contents — otherwise documents already in the DB but absent from
  // this backup would stick around as stale entries.
  await collection.deleteMany({});

  if (Array.isArray(docs) && docs.length > 0) {
    await collection.insertMany(docs);
  }

  return docs.length;
}

// =========================================================
// Recursively lists every file under rootDir, returned as paths
// relative to rootDir (POSIX-style, forward slashes, regardless of OS).
async function walkFiles(rootDir) {
  const relFiles = [];

  async function walk(currentDir) {
    const entries = await fsPromise.readdir(currentDir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);
      if (entry.isDirectory()) {
        await walk(fullPath);
      } else {
        relFiles.push(path.relative(rootDir, fullPath).split(path.sep).join("/"));
      }
    }
  }

  await walk(rootDir);
  return relFiles;
}

// =========================================================
/**
 * Restores every file under stagingDir/seg-files onto this server's own
 * disk, into outputsRoot, preserving the same relative path each file
 * had under seg-files (which itself mirrors the original project app's
 * /outputs/... structure — see backupService.getDestPath).
 *
 * outputsRoot is ALWAYS wiped clean first, unconditionally — even if
 * this particular backup turns out to have zero seg files (missing or
 * empty seg-files/ folder). A restore should fully replace outputsRoot's
 * contents with whatever this backup has; for zero seg files that means
 * outputsRoot ends up empty too, not "leave whatever was already there."
 *
 * This is a plain local file copy — no HTTP involved — because the
 * management app and the project app's disk are the same process now.
 *
 * @param {string} stagingDir - path to a single folder on server's backend used to unzip backup folder
 * @param {string} outputsRoot - absolute path to the project app's
 *   outputs directory on this server's disk
 */
async function restoreSegFiles(stagingDir, outputsRoot) {
  const segRoot = path.join(stagingDir, "seg-files");

  // Always start from a clean outputsRoot, regardless of whether this
  // backup has any seg files at all.
  await fsPromise.rm(outputsRoot, { recursive: true, force: true });
  await fsPromise.mkdir(outputsRoot, { recursive: true });

  if (!fsSync.existsSync(segRoot)) {
    return { successCount: 0, failCount: 0, failures: [], totalSegFiles: 0 };
  }

  const relFiles = await walkFiles(segRoot);

  let successCount = 0;
  let failCount = 0;
  const failures = [];

  async function copyOne(relPath) {
    const srcPath = path.join(segRoot, ...relPath.split("/"));
    const destPath = path.join(outputsRoot, ...relPath.split("/"));

    try {
      await fsPromise.mkdir(path.dirname(destPath), { recursive: true });
      await fsPromise.copyFile(srcPath, destPath);
      successCount++;
    } catch (err) {
      failCount++;
      failures.push({ file: srcPath, error: err.message });
    }
  }

  // Small bounded-concurrency pool so we're not opening hundreds of file
  // handles at once on a large restore.
  let cursor = 0;
  async function worker() {
    while (cursor < relFiles.length) {
      const idx = cursor++;
      await copyOne(relFiles[idx]);
    }
  }
  await Promise.all(Array.from({ length: CONCURRENCY }, worker));

  return { successCount, failCount, failures, totalSegFiles: relFiles.length };
}


// =========================================================
// Main function
// =========================================================

/**
 * @param {string} stagingDir - path to the extracted uploaded backup
 *   (see utils/restoreUpload.js — this is NOT a path the user typed in;
 *   it's the server-side staging directory a previously-uploaded backup
 *   zip was extracted into, and it gets deleted right after this
 *   function returns — see managerController.restore_post's cleanup).
 * @param {"production"|"development"} envMode
 * @param {string} outputsRoot - absolute path to the project app's
 *   outputs directory on this server's disk
 * @param {string} restoreLogsRoot - absolute path to a persistent
 *   folder (unlike stagingDir, NOT cleaned up) where each restore's log
 *   file is written, one per run, timestamped so nothing gets
 *   overwritten by the next restore.
 */
exports.runRestore = async (stagingDir, envMode, outputsRoot, restoreLogsRoot) => {

  await fsPromise.mkdir(restoreLogsRoot, { recursive: true });
  const LOG_FILE = path.join(restoreLogsRoot, `RestoreLog_${getStamp()}.log`);

  try {

    const STAGING_DIR = path.join(stagingDir);

    // The collections to restore are whatever is actually in this
    // backup — not a fixed/expected list — so a backup taken before a
    // schema change (fewer/different collections) still restores
    // correctly instead of erroring on collections that don't exist.
    const dbCollections = getBackupCollections(STAGING_DIR);

    const { db, dbName: connectedDbName } = await connectToModeDb(envMode);

    const sLogMsg = [
        `*** RUNNING RESTORE: ${STAGING_DIR}`,
        `Mode: ${envMode}`,
        `Database: ${connectedDbName}`,
        `Collections to restore: ${dbCollections}`,
        `Outputs directory: ${outputsRoot}`,
        `Log file: ${LOG_FILE}`,
        ].join('\n');
    console.log(sLogMsg);
    await logLine(sLogMsg, LOG_FILE);


    let successCountDBCollections = 0;
    const totalDBCollections = dbCollections.length;
    let successCountSegFiles = 0;
    let totalSegFiles = 0;
    let failCount = 0;
    const failures = [];


    // restore database collections to Mongo
    await ensureDatabaseExists(db);

    for (const colName of dbCollections) {
        try {
        // restoreSingleCollection deletes the collection's existing
        // contents before restoring, so every collection ends up in
        // sync with the backup — no stale documents left behind.
        const restoredCount = await restoreSingleCollection(db, STAGING_DIR, colName);
        successCountDBCollections++;

        await logLine(`Successfully restored ${restoredCount} docs into '${colName}'`, LOG_FILE);
        } catch (err) {
        failCount++;
        failures.push({ collection: colName, error: err.message });

        await logLine(`FAILED restoring '${colName}': ${err.message}`, LOG_FILE);
        }
    }


    // restore seg files onto this server's disk (outputsRoot is wiped
    // clean first — see restoreSegFiles)
    try {
      const segResult = await restoreSegFiles(STAGING_DIR, outputsRoot);
      successCountSegFiles = segResult.successCount;
      totalSegFiles = segResult.totalSegFiles;
      failCount += segResult.failCount;
      failures.push(...segResult.failures);

      await logLine(
        `Seg files: ${segResult.successCount}/${segResult.totalSegFiles} restored into ${outputsRoot}`,
        LOG_FILE
      );
    } catch (err) {
      failCount++;
      failures.push({ segFiles: true, error: err.message });
      await logLine(`FAILED restoring seg files: ${err.message}`, LOG_FILE);
    }


    return {
        stagingDir: STAGING_DIR,
        logFile: LOG_FILE,
        successCountSegFiles,
        totalSegFiles,
        successCountDBCollections,
        totalDBCollections,
        failCount,
        failures
    };


  } catch (err) {
    await logLine(`RESTORE FAILED: ${err.message}`, LOG_FILE).catch(() => {});
    throw new Error(`Restore failed: ${err.message}`);
  }
};