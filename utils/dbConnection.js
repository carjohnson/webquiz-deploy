
const mongoose = require("mongoose");
const { getRuntimeConfig } = require("../utils/runtimeConfig");

// =========================================================
async function ensureDbReady() {
  if (mongoose.connection.readyState === 1) {
    // 1 = connected
    return mongoose.connection.db;
  }

  return new Promise((resolve, reject) => {
    mongoose.connection.once('connected', () => {
      resolve(mongoose.connection.db);
    });

    mongoose.connection.once('error', (err) => {
      reject(err);
    });
  });
}

// =========================================================
async function connectToModeDb(mode) {
  const { mongoUri } = getRuntimeConfig(mode);

  if (mongoose.connection.readyState !== 1) {
    await mongoose.connect(mongoUri);
  }

  return {
    db: mongoose.connection.db,
    dbName: getDbNameFromUri(mongoUri)
  };
}

// =========================================================
function getDbNameFromUri(uri) {
  if (!uri) return null;

  // Remove query string if present
  const noQuery = uri.split('?')[0];

  // Take the last path segment
  const parts = noQuery.split('/');
  return parts[parts.length - 1] || null;
}

// =========================================================
async function ensureDatabaseExists(db) {
  // A simple ping ensures the DB is reachable
  await db.command({ ping: 1 });
  return true;
}


module.exports = { connectToModeDb, getDbNameFromUri, ensureDatabaseExists };