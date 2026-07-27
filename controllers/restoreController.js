require("dotenv").config();

const path = require('path');
const fsSync = require("fs");
const fsPromise = require("fs/promises");
const { EJSON } = require("bson");
const axios = require("axios");
const https = require("https");

const { connectToModeDb, ensureDatabaseExists } = require('../utils/dbConnection');
const { getRuntimeConfig } = require('../utils/runtimeConfig');

const CONCURRENCY = 4;

// =========================================================
// Helpers
// =========================================================

// =========================================================
async function logLine(msg, LOG_FILE) {
  await fsPromise.appendFile(LOG_FILE, `[${new Date().toISOString()}] ${msg}\n`);
}

// =========================================================
function getBackupFilenameForCollection(colName) {
  return `${colName}-collection`;
}
// =========================================================
async function restoreSingleCollection(db, backupDir, colName) {
  // Map MongoDB collection name → backup filename
  const backupFileName = `${colName}-collection`;
  const filePath = path.join(backupDir, `${backupFileName}.json`);

  if (!fsSync.existsSync(filePath)) {
    throw new Error(`Backup file not found: ${filePath}`);
  }

  const raw = await fsPromise.readFile(filePath, "utf8");

  // Convert EJSON → BSON
  const docs = EJSON.parse(raw);

  const collection = db.collection(colName);

  await collection.deleteMany({});

  if (Array.isArray(docs) && docs.length > 0) {
    await collection.insertMany(docs);
  }

  return docs.length;
}

// =========================================================
/**
 * Restores every file under backupDir/seg-files into the target project
 * app's /outputs directory by POSTing each file to that app's
 * /backup/restore route. The target app (dev on localhost:3000, or the
 * prod Render service) is selected via apiBaseUrl from getRuntimeConfig,
 * so this works correctly regardless of where the management app itself
 * happens to be running from.
 *
 * @param {string} backupDir - path to a single backup folder, e.g.
 *   ".../backup-output/development/2026-07-20_12-12-36"
 * @param {"production"|"development"} mode
 */
async function restoreSegFiles(backupDir, mode) {
  const segRoot = path.join(backupDir, "seg-files");

  if (!fsSync.existsSync(segRoot)) {
    throw new Error(`Segmentation files directory not found: ${segRoot}`);
  }

  const { apiBaseUrl } = getRuntimeConfig(mode);
  if (!apiBaseUrl) {
    throw new Error(`No apiBaseUrl configured for mode "${mode}"`);
  }

  const restoreUrl = `${apiBaseUrl.replace(/\/+$/, "")}/backup/restore`;
  console.log(" *** Checkpoint ... apiBaseUrl", apiBaseUrl);
  console.log(" *** Checkpoint ... restoreUrl", restoreUrl);

  // The local dev project server runs HTTPS with a self-signed cert, which
  // Node/axios reject by default (DEPTH_ZERO_SELF_SIGNED_CERT). Only relax
  // verification for development — production must keep strict TLS checks.
  const httpsAgent =
    mode === "development" ? new https.Agent({ rejectUnauthorized: false }) : undefined;

  const backupKey = process.env.BACKUP_API_KEY;
  if (!backupKey) {
    throw new Error(
      "BACKUP_API_KEY is not set in the management app's environment (must match the project app's key)"
    );
  }

  let successCount = 0;
  let failCount = 0;
  const failures = [];

  // Walk seg-files first and collect every file path relative to segRoot,
  // so uploads can run with bounded concurrency instead of strictly
  // directory-by-directory.
  const relFiles = [];
  async function walk(currentDir) {
    const entries = await fsPromise.readdir(currentDir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);
      if (entry.isDirectory()) {
        await walk(fullPath);
      } else {
        relFiles.push(path.relative(segRoot, fullPath));
      }
    }
  }
  await walk(segRoot);

  async function uploadOne(relPath) {
    const localPath = path.join(segRoot, relPath);
    // Normalize to forward slashes on the wire regardless of the OS the
    // management app runs on, since the server-side handler splits on
    // both "/" and "\\" but stores/serves with "/".
    const remotePath = relPath.split(path.sep).join("/");

    try {
      await axios.post(restoreUrl, fsSync.createReadStream(localPath), {
        params: { path: remotePath },
        headers: {
          "x-backup-key": backupKey,
          "Content-Type": "application/octet-stream",
        },
        maxBodyLength: Infinity,
        maxContentLength: Infinity,
        httpsAgent,
      });
      successCount++;
    } catch (err) {
      failCount++;
      const errorDetail = err.response
        ? `HTTP ${err.response.status}: ${err.response.statusText} - ${JSON.stringify(err.response.data)}`
        : err.message;
      console.log(" *** Checkpoint ... upload FAILED for", remotePath, "-", errorDetail);
      failures.push({ file: localPath, error: errorDetail });
    }
  }

  // Small bounded-concurrency pool so we don't fire hundreds of
  // simultaneous uploads at the project server at once.
  let cursor = 0;
  async function worker() {
    while (cursor < relFiles.length) {
      const idx = cursor++;
      await uploadOne(relFiles[idx]);
    }
  }
  await Promise.all(Array.from({ length: CONCURRENCY }, worker));

  return { successCount, failCount, failures };
}


// =========================================================
// Main function
// =========================================================

exports.runRestore = async (backupDir, mode, collections, restoreActions) => {

  try {

    const { mongoUri, apiBaseUrl } = getRuntimeConfig(mode);

    const BACKUP_DIR = path.join(backupDir);
    const SEG_DIR = path.join(BACKUP_DIR, "seg-files");
    const LOG_FILE = path.join(BACKUP_DIR, "LogRestore.log");

    const { db, dbName: connectedDbName } = await connectToModeDb(mode);

    const sLogMsg = [
        `*** RUNNING RESTORE: ${BACKUP_DIR}`,
        `Mode: ${mode}`,
        `Database: ${connectedDbName}`,
        `API Base URL: ${apiBaseUrl}`,
        `Collections to restore: ${collections}`,
        `Actions to restore: ${restoreActions}`,
        ].join('\n');
    console.log(sLogMsg);
    await logLine(sLogMsg, LOG_FILE);
    console.log(`Mongo URI: ${mongoUri}`);


    let successCountDBCollections = 0;
    const totalDBCollections = collections.length;
    let successCountSegFiles = 0;
    let failCount = 0;
    const failures = [];


    if (restoreActions.includes("mongo")) {
        await ensureDatabaseExists(db);

        for (const colName of collections) {
            try {
            const restoredCount = await restoreSingleCollection(db, BACKUP_DIR, colName);
            successCountDBCollections++;

            await logLine(`Successfully restored ${restoredCount} docs into '${colName}'`, LOG_FILE);
            } catch (err) {
            failCount++;
            failures.push({ collection: colName, error: err.message });

            await logLine(`FAILED restoring '${colName}': ${err.message}`, LOG_FILE);
            }
        }
    }

    if (restoreActions.includes("segfiles")) {
        const segResult = await restoreSegFiles(BACKUP_DIR, mode);
        successCountSegFiles = segResult.successCount;
        failCount += segResult.failCount;
        failures.push(...segResult.failures);
    }



    return {
        backupDir: BACKUP_DIR,
        logFile: LOG_FILE,
        successCountSegFiles,
        successCountDBCollections,
        totalDBCollections,
        failCount,
        failures
    };


  } catch (err) {
    throw new Error(`Restore failed: ${err.message}`);
  }
};