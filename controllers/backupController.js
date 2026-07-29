const path = require("path");
const crypto = require("crypto");
const fsSync = require("fs");
const fsPromise = require("fs/promises");
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

// =========================================================
// Server-side handler for POST /backup/restore?path=...
// Called by the management app's restore script to upload individual
// SEG files back into THIS app's own /outputs directory (dev or prod,
// whichever this process happens to be running as).
//
// IMPORTANT: this route streams the raw request body straight to disk.
// Do not mount express.json()/express.urlencoded() ahead of it (or at
// least exclude this path), or the body-parser will consume the stream
// before this handler ever sees it.
// =========================================================
exports.segfile_post = asyncHandler(async (req, res, next) => {
  try {
    console.log(' *** RESTORING ... Im here');
    const expectedKey = process.env.BACKUP_API_KEY;
    const providedKey = req.get("x-backup-key");
    const keyOk =
      expectedKey &&
      providedKey &&
      providedKey.length === expectedKey.length &&
      crypto.timingSafeEqual(Buffer.from(providedKey), Buffer.from(expectedKey));
    if (!keyOk) {
      return res.status(401).send("Unauthorized");
    }

    const relPath = req.query.path;
    if (!relPath) return res.status(400).send("Missing path");

    // Reject absolute paths / drive letters / ".." segments outright,
    // before joining anything. This is stricter than resolving-and-
    // checking-prefix alone, and catches Windows-style "..\\" too.
    const segments = relPath.split(/[\\/]/);
    if (path.isAbsolute(relPath) || segments.includes("..") || segments.includes("")) {
      return res.status(400).send("Invalid path");
    }

    const outputsRoot = path.resolve(__dirname, "..", "outputs");
    const destPath = path.resolve(outputsRoot, relPath);
    console.log(' *** RESTORING ... destPath', destPath);

    // Same defense-in-depth prefix check as the GET route.
    if (!destPath.startsWith(outputsRoot + path.sep)) {
      return res.status(403).send("Path not allowed");
    }

    await fsPromise.mkdir(path.dirname(destPath), { recursive: true });

    const writeStream = fsSync.createWriteStream(destPath);

    req.pipe(writeStream);

    writeStream.on("finish", () => {
      res.status(200).json({ ok: true, path: relPath });
    });

    writeStream.on("error", (err) => {
      next(err);
    });

    req.on("error", (err) => {
      writeStream.destroy();
      next(err);
    });
  } catch (err) {
    next(err);
  }
});

