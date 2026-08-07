const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const AdmZip = require("adm-zip");

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const MAX_STAGING_AGE_MS = 24 * 60 * 60 * 1000; // 24h safety-net cleanup

// =========================================================
// Extracts a zip buffer to destDir, rejecting any entry whose path would
// resolve outside destDir (zip-slip protection) before writing anything.
function safeExtractZip(buffer, destDir) {
  const zip = new AdmZip(buffer);
  const entries = zip.getEntries();

  for (const entry of entries) {
    const targetPath = path.join(destDir, path.normalize(entry.entryName));
    const relative = path.relative(destDir, targetPath);
    if (relative.startsWith("..") || path.isAbsolute(relative)) {
      throw new Error(`Refusing to extract unsafe zip entry: ${entry.entryName}`);
    }
  }

  zip.extractAllTo(destDir, true);
}

// =========================================================
// Stages an uploaded backup zip under uploadsRoot: creates a fresh
// UUID-named directory and extracts the zip into it. Mirrors the shape
// of a single backupService.runBackup() output directory (collection
// JSON files + seg-files/ at the top level), since that's exactly what
// gets zipped on the way out.
//
// Caller is responsible for cleanup (see cleanupStagedUpload) once the
// restore has run or the upload is abandoned.
function stageUploadedBackup(fileBuffer, uploadsRoot) {
  fs.mkdirSync(uploadsRoot, { recursive: true });

  const uploadId = crypto.randomUUID();
  const stagingDir = path.join(uploadsRoot, uploadId);
  fs.mkdirSync(stagingDir, { recursive: true });

  try {
    safeExtractZip(fileBuffer, stagingDir);
  } catch (err) {
    fs.rmSync(stagingDir, { recursive: true, force: true });
    throw err;
  }

  return { uploadId, stagingDir };
}

// =========================================================
// Resolves an uploadId (as received from a client) to its staging
// directory under uploadsRoot, WITHOUT trusting any client-supplied
// path. Returns null if the id is malformed or the directory doesn't
// exist (expired/unknown).
function resolveStagedUploadDir(uploadId, uploadsRoot) {
  if (typeof uploadId !== "string" || !UUID_RE.test(uploadId)) {
    return null;
  }

  const stagingDir = path.join(uploadsRoot, uploadId);
  if (!fs.existsSync(stagingDir)) {
    return null;
  }

  return stagingDir;
}

// =========================================================
function cleanupStagedUpload(uploadId, uploadsRoot) {
  const stagingDir = resolveStagedUploadDir(uploadId, uploadsRoot);
  if (stagingDir) {
    fs.rmSync(stagingDir, { recursive: true, force: true });
  }
}

// =========================================================
// Safety net: removes any staging directories older than maxAgeMs, in
// case a user uploaded a backup and never ran (or never finished) the
// restore. Call on server startup and/or on an interval.
function cleanupStaleUploads(uploadsRoot, maxAgeMs = MAX_STAGING_AGE_MS) {
  fs.mkdirSync(uploadsRoot, { recursive: true });

  const now = Date.now();
  for (const name of fs.readdirSync(uploadsRoot)) {
    const dirPath = path.join(uploadsRoot, name);
    try {
      const stat = fs.statSync(dirPath);
      if (stat.isDirectory() && now - stat.mtimeMs > maxAgeMs) {
        fs.rmSync(dirPath, { recursive: true, force: true });
      }
    } catch {
      // ignore races where the dir vanished between readdir and stat
    }
  }
}

module.exports = {
  stageUploadedBackup,
  resolveStagedUploadDir,
  cleanupStagedUpload,
  cleanupStaleUploads,
};