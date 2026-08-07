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
async function connectToModeDb(envMode) {

    const mongoUri = process.env.MONGO_URI

  if (!mongoUri) {
    throw new Error(
      `Missing Mongo URI for envMode "${envMode}" : "${mongoUri}"`
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
async function ensureDatabaseExists(db) {
  // A simple ping ensures the DB is reachable
  await db.command({ ping: 1 });
  return true;
}

// =========================================================
// function collectionsAreEqual(listA, listB) {
//   const a = [...listA].sort();
//   const b = [...listB].sort();
//   return a.length === b.length && a.every((name, i) => name === b[i]);
// }
 

// =========================================================
module.exports = {
  connectToModeDb,
  ensureDatabaseExists,
};