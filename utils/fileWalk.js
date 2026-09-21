// utils/fileWalk.js
//
// Generalized out of restoreService.js's local walkFiles helper so any
// service that needs to recurse a staged/extracted directory (restore's
// seg-files, the DICOM upload's staged zip, etc.) can share one
// implementation instead of each keeping its own copy.

const path = require("path");
const fsPromise = require("fs/promises");

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

module.exports = { walkFiles };