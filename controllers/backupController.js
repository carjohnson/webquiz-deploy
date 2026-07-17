const asyncHandler = require("express-async-handler");



// =========================================================
// Server-side handler for GET /backup?path=...
// Called by the local backup script to download individual SEG files.
// Requires the shared-secret x-backup-key header as a second check
// (defense in depth), even though app.js already validates it earlier.
// =========================================================
exports.segfile_get = asyncHandler(async (req, res, next) => {
  try {
    const expectedKey = process.env.BACKUP_API_KEY;
    const providedKey = req.get("x-backup-key");
    const crypto = require("crypto");
    const keyOk =
      expectedKey &&
      providedKey &&
      providedKey.length === expectedKey.length &&
      crypto.timingSafeEqual(Buffer.from(providedKey), Buffer.from(expectedKey));
    if (!keyOk) {
      return res.status(401).send("Unauthorized");
    }

    const filePath = req.query.path;
    if (!filePath) return res.status(400).send("Missing path");

    // Only allow serving files that actually live under this app's own
    // /outputs directory, so ?path= can't be used to read arbitrary
    // files the server process can access (e.g. ../../.env).
    const allowedRoot = path.resolve(__dirname, "..", "outputs");
    const resolved = path.resolve(filePath);
    if (!resolved.startsWith(allowedRoot + path.sep)) {
      return res.status(403).send("Path not allowed");
    }

    res.download(resolved, path.basename(resolved));
  } catch (err) {
    next(err);
  }
});