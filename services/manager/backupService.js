/**
 * backup-Service.js
 *
 * Disaster-recovery backup for:
 *    1. The MongoDB collections
 *    2. SEG files (referenced via segmentationDataRef)
 *
 * ENV VARS REQUIRED:
 *  NODE_ENV                production / development 
 *  MONGO_URI_DEV           e.g. mongodb+srv://user:pass@cluster/dbname
 *  MONGO_URI_PROD
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


// =========================================================
async function logLine(msg, LOG_FILE) {
  await fsPromise.appendFile(LOG_FILE, `[${new Date().toISOString()}] ${msg}\n`);
}

// =========================================================
function getStamp() {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  const hh = String(d.getHours()).padStart(2, "0");
  const mi = String(d.getMinutes()).padStart(2, "0");
  const ss = String(d.getSeconds()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}_${hh}-${mi}-${ss}`;
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
  console.log("*** LOCAL PATH:", localPath);
  await fsPromise.mkdir(path.dirname(dest), { recursive: true });
  await fsPromise.copyFile(localPath, dest);
  return `Copied file: ${localPath}`;
}

// =========================================================
async function runBackup(outputDir) {
    const NODE_ENV = process.env.NODE_ENV;
    const REACT_APP_API_BASE_URL = process.env.REACT_APP_API_BASE_URL ;

    const BACKUP_DIR = path.join(outputDir,NODE_ENV,getStamp());
    const SEG_DIR = path.join(BACKUP_DIR, "seg-files");
    const LOG_FILE = path.join(BACKUP_DIR, "LogBackup.log");

    
    console.log("*** RUNNING BACKUP", BACKUP_DIR);

    await fsPromise.mkdir(SEG_DIR, { recursive: true });

    // export collections from MongoDB
    const db = mongoose.connection.db;
    if (!db) {
    throw new Error("MongoDB connection is not ready");
    }

    // 1. Dump each raw collection as JSON
    const collectionsToBackup = [
    "progress",
    "rulermeasurements",
    "segmentations",
    "study",
    "user",
    ];

    let segDocs = [];
    for (const collectionName of collectionsToBackup) {
        console.log(`Reading ${collectionName} collection...`);

        const docs = await db.collection(collectionName).find({}).toArray();
        if (collectionName === 'segmentations') {
            segDocs = docs;
        }

        const outputFile = path.join(BACKUP_DIR, `${collectionName}-collection.json`);
        await fsPromise.writeFile(outputFile, JSON.stringify(docs, null, 2));

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
        failures
    };
}


/***
 *  Get the seg files from the server - download 
 */

// exports.segfile_get = asyncHandler(async (req, res, next) => {
//   try {
//     const filePath = req.query.path;
//     if (!filePath) return res.status(400).send("Missing path");

//     res.download(filePath, path.basename(filePath));
//   } catch (err) {
//     next(err);
//   }
// });

async function cleanupBackup() {
  // optional helper
}

module.exports = {
  runBackup,
  cleanupBackup
};