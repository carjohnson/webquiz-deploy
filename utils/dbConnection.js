const mongoose = require("mongoose");

// =========================================================
function getDbNameFromUri(uri) {
  if (!uri) return null;

  const noQuery = uri.split("?")[0];
  const parts = noQuery.split("/");
  return parts[parts.length - 1] || null;
}

// =========================================================
async function getDbCollections(db) {
  const collections = await db
    .listCollections({}, { nameOnly: true })
    .toArray();

  return collections
    .map((c) => c.name)
    .filter((name) => !name.startsWith("system."));
}

// =========================================================
async function connectToModeDb(mode) {
  const mongoUri =
    mode === "production"
      ? process.env.MONGO_URI
      : process.env.MONGO_URI_DEV;

  if (!mongoUri) {
    throw new Error(
      `Missing Mongo URI for mode "${mode}" (${mode === "production" ? "MONGO_URI" : "MONGO_URI_DEV"})`
    );
  }

  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(mongoUri);
  }

  const db = mongoose.connection.db;

  return {
    db,
    dbName: getDbNameFromUri(mongoUri),
    dbCollections: await getDbCollections(db),
  };
}

// =========================================================
module.exports = {
  connectToModeDb,
  getDbNameFromUri,
  getDbCollections,
};