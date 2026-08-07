const fs = require("fs");

// backupService.js writes one file per collection, named
// "<collectionName>-collection.json" (see runBackup's write loop).
// This must stay in sync with that naming convention.
const COLLECTION_FILE_RE = /^(.+)-collection\.json$/i;

// =========================================================
// Reads a backup directory and returns the list of collection names
// found in it, derived from files named "<name>-collection.json".
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

module.exports = { getBackupCollections, getStamp };

