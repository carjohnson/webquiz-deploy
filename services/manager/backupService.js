/**
 * backup-Service.js
 *
 * Disaster-recovery backup for:
 *    1. The MongoDB collections
 *    2. SEG files (referenced via segmentationDataRef)
 *
 * ENV VARS REQUIRED:
 *  NODE_ENV                production / development 
 *  MONGO_URI               e.g. mongodb+srv://user:pass@cluster/dbname (either production or development)
 *  REACT_APP_API_BASE_URL  internal Render URL for the node app, e.g. http://baines-webquiz-deplot.onrender.com
 *                          (use the Render *internal* hostname, not the public one,
 *                          to avoid egress charges and auth exposure)
 *  BACKUP_DIR              local staging folder, default ./backup-output
 */

require("dotenv").config();

const fsSync = require("fs");
const fsPromise = require("fs/promises");
const path = require("path");
const mongoose = require("mongoose");
const { pipeline } = require("stream/promises");
const asyncHandler = require("express-async-handler");
const { EJSON } = require('bson');
const archiver = require('archiver');
const { connectToModeDb } = require('../../utils/dbConnection');
const { getStamp } = require('../../utils/backupDirUtils');

// Matches getStamp()'s format exactly: YYYY-MM-DD_HH-MM-SS, optionally
// with a .zip extension. cleanupBackups only ever touches entries that
// match this — anything else dropped into BACKUP_ROOT (by hand, or by
// something else entirely) is left alone rather than swept up by a
// recursive delete.
const BACKUP_ENTRY_RE = /^\d{4}-\d{2}-\d{2}_\d{2}-\d{2}-\d{2}(\.zip)?$/;
const DEFAULT_MAX_BACKUP_AGE_MS = 7 * 24 * 60 * 60 * 1000; // 7 days



// =========================================================
async function logLine(msg, LOG_FILE) {
  await fsPromise.appendFile(LOG_FILE, `[${new Date().toISOString()}] ${msg}\n`);
}

// =========================================================
function getDestPath(raw, SEG_DIR) {
  const normalized = raw.replace(/\\/g, "/");
  const marker = "/outputs/";
  const idx = normalized.indexOf(marker);
  if (idx === -1) throw new Error(`Could not find ${marker} in path`);

  const rel = normalized.slice(idx + marker.length);
  return path.join(SEG_DIR, rel);
}

// =========================================================
async function transferSegFile({ raw, dest, apiBase, isProd }) {
  if (isProd) {
    const downloadUrl = `${apiBase}/backup?path=${encodeURIComponent(raw)}`;
    console.log("*** DOWNLOAD URL:", downloadUrl);
    await downloadToFile(downloadUrl, dest);
    return `Downloaded file: ${downloadUrl} -> ${dest}`;
  }

  const localPath = apiBase && raw.startsWith(apiBase) ? raw.slice(apiBase.length) : raw;
  await fsPromise.mkdir(path.dirname(dest), { recursive: true });
  await fsPromise.copyFile(localPath, dest);
  return `Copied file: ${localPath}`;
}

// =========================================================
async function zipDirectory (dirPath, zipPath) {
  await fsPromise.mkdir(path.dirname(zipPath), { recursive: true });

  return new Promise((resolve, reject) => {
    const output = fsSync.createWriteStream(zipPath);
    const archive = archiver("zip", { zlib: { level: 9 } });

    output.on("close", resolve);
    output.on("error", reject);
    archive.on("error", reject);

    archive.pipe(output);
    archive.directory(dirPath, false);
    archive.finalize();
  });
}

// =========================================================
async function runBackup(outputDir) {
    const NODE_ENV = process.env.NODE_ENV;
    const REACT_APP_API_BASE_URL = process.env.REACT_APP_API_BASE_URL ;

    const backupTimestamp = getStamp();
    const BACKUP_DIR = path.join(outputDir,backupTimestamp);
    const SEG_DIR = path.join(BACKUP_DIR, "seg-files");
    const LOG_FILE = path.join(BACKUP_DIR, "LogBackup.log");
    const ZIP_FILENAME = backupTimestamp + '.zip';

    const { db, dbName, dbCollections } = await connectToModeDb(NODE_ENV);
    
    console.log("*** RUNNING BACKUP", BACKUP_DIR);

    await fsPromise.mkdir(SEG_DIR, { recursive: true });

    // 1. Dump each raw collection as JSON
    const collectionsToBackup = dbCollections;

    let segDocs = [];
    for (const collectionName of collectionsToBackup) {
        console.log(`Reading ${collectionName} collection...`);

        const docs = await db.collection(collectionName).find({}).toArray();
        if (collectionName === 'segmentations') {
            segDocs = docs;
        }

        const outputFile = path.join(BACKUP_DIR, `${collectionName}-collection.json`);
        await fsPromise.writeFile(outputFile, EJSON.stringify(docs, null, 2));

        const sLogMsg = `Wrote ${docs.length} docs to ${collectionName}-collection.json`;
        console.log(sLogMsg);
        await logLine(sLogMsg, LOG_FILE);
    }


    // 2. Walk every segmentationEntry and pull its SEG file from server
    let successCount = 0;
    let failCount = 0;
    const failures = [];

    const isProd = process.env.NODE_ENV === "production";
    const apiBase = (process.env.REACT_APP_API_BASE_URL || "").replace(/\/+$/, "");

    for (const doc of segDocs) {
        for (const entry of doc.segmentationIds || []) {
            const raw = entry.segmentationDataRef;
            if (!raw) continue;

            try {

            const dest = getDestPath(raw, SEG_DIR);

                console.log("RAW:", raw);
                console.log("DEST:", dest);
                console.log("apiBase", apiBase);
                console.log("isProd",isProd);
            const msg = await transferSegFile({ raw, dest, apiBase, isProd });
            successCount++;
            await logLine(msg, LOG_FILE);
            } catch (err) {
            failCount++;
            failures.push({
                segmentationId: entry.segmentationId,
                source: raw,
                error: err.message,
            });
            await logLine(`TRANSFER FAILED: ${err.message}`, LOG_FILE);
            }
        }
    }
    await logLine(`SEG transfer summary: ${successCount} succeeded, ${failCount} failed.`, LOG_FILE);
    
    return {
        backupDir: BACKUP_DIR,
        logFile: LOG_FILE,
        successCount,
        failCount,
        failures,
        zipFileName: ZIP_FILENAME,
    };
}

// =========================================================
/**
 * Removes backup folders and .zip files from outputDir (BACKUP_ROOT)
 * once they're older than maxAgeMs, giving the user a window to
 * download a backup's zip before it's swept away.
 *
 * A backup produces two sibling entries per run under outputDir: the
 * raw timestamped folder (e.g. "2026-08-07_19-27-01/") and its zip
 * (e.g. "2026-08-07_19-27-01.zip"). Both are removed once past
 * maxAgeMs — only entries matching that exact timestamp naming pattern
 * are touched; anything else in outputDir is left alone.
 *
 * @param {string} outputDir - BACKUP_ROOT
 * @param {number} [maxAgeMs] - defaults to 7 days
 * @returns {Promise<string[]>} names of entries that were removed
 */
async function cleanupBackups(outputDir, maxAgeMs = DEFAULT_MAX_BACKUP_AGE_MS) {
  await fsPromise.mkdir(outputDir, { recursive: true });

  const entries = await fsPromise.readdir(outputDir, { withFileTypes: true });
  const now = Date.now();
  const removed = [];

  for (const entry of entries) {
    if (!BACKUP_ENTRY_RE.test(entry.name)) continue;

    const entryPath = path.join(outputDir, entry.name);

    try {
      const stat = await fsPromise.stat(entryPath);
      if (now - stat.mtimeMs <= maxAgeMs) continue;

      await fsPromise.rm(entryPath, { recursive: true, force: true });
      removed.push(entry.name);
    } catch {
      // ignore races (entry vanished between readdir and stat, permission
      // hiccups, etc.) — best-effort sweep, not worth failing the caller
    }
  }

  return removed;
}

// // =========================================================
// // Kept for backward compatibility with existing callers/imports.
// async function cleanupBackup(outputDir, maxAgeMs) {
//   return cleanupBackups(outputDir, maxAgeMs);
// }

// =========================================================
// =========================================================
module.exports = {
  runBackup,
  zipDirectory,
  cleanupBackups,
};
