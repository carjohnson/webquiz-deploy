const fs = require("fs");
const fsPromise = require("fs/promises");
const path = require("path");
const asyncHandler = require("express-async-handler");


// backupService.js writes one file per collection, named
// "<collectionName>-collection.json" (see runBackup's write loop).
// This must stay in sync with that naming convention.
const COLLECTION_FILE_RE = /^(.+)-collection\.json$/i;
const DEFAULT_MAX_FILE_AGE_MS = 7 * 24 * 60 * 60 * 1000; // 7 days


// =========================================================
// Reads a backup directory and returns the list of collection names
// found in it, derived from files named "<name>-collection.json".
// Ignore manager collection - not for backup or restore - should not exist.
function getBackupCollections(backupDir) {
  if (!backupDir || !backupDir.trim()) {
    throw new Error("Backup directory is required.");
  }

  if (!fs.existsSync(backupDir)) {
    throw new Error(`Backup directory not found: ${backupDir}`);
  }

  const stat = fs.statSync(backupDir);
  if (!stat.isDirectory()) {
    throw new Error(`Not a directory: ${backupDir}`);
  }

  const entries = fs.readdirSync(backupDir, { withFileTypes: true });

  return entries
    .filter((entry) => entry.isFile() && COLLECTION_FILE_RE.test(entry.name))
    .map((entry) => entry.name.match(COLLECTION_FILE_RE)[1])
    .filter((collectionName) => collectionName !== "manager-collection" )
    .sort();
}

// =========================================================
// timestamp used for backup folder and for restore log files
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
/**
 * Removes folders and files based on FILE_ENTRY_RE set from outputDir (BACKUP_ROOT)
 * once they're older than maxAgeMs, giving the user a window to
 * download a file before it's swept away.
 *
 * maxAgeMs — only entries matching that exact timestamp naming pattern
 * are touched; anything else in outputDir is left alone.
 *
 * @param {string} outputDir - BACKUP_ROOT
 * @param {number} [maxAgeMs] - defaults to 7 days
 * @returns {Promise<string[]>} names of entries that were removed
 */
async function cleanupWorkDir(outputDir, FILE_ENTRY_RE, maxAgeMs = DEFAULT_MAX_FILE_AGE_MS) {
  await fsPromise.mkdir(outputDir, { recursive: true });

  const entries = await fsPromise.readdir(outputDir, { withFileTypes: true });
  const now = Date.now();
  const removed = [];

  for (const entry of entries) {
    if (!FILE_ENTRY_RE.test(entry.name)) continue;

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

module.exports = { getBackupCollections, getStamp, cleanupWorkDir };

