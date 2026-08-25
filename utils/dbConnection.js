// const mongoose = require("mongoose");

// // =========================================================
// function getDbNameFromUri(uri) {
//   if (!uri) return null;

//   const noQuery = uri.split("?")[0];
//   const parts = noQuery.split("/");
//   return parts[parts.length - 1] || null;
// }

// // =========================================================
// async function getDbCollections(db) {

//   const collections = await db
//     .listCollections({}, { nameOnly: true })
//     .toArray();

//   return collections
//     .map((c) => c.name)
//     .filter((name) => !name.startsWith("system."));
// }

// // =========================================================
// async function connectToModeDb(envMode) {

//     const mongoUri = process.env.MONGO_URI

//   if (!mongoUri) {
//     throw new Error(
//       `Missing Mongo URI for envMode "${envMode}" : "${mongoUri}"`
//     );
//   }

//   if (mongoose.connection.readyState === 0) {
//     await mongoose.connect(mongoUri);
//   }

//   const db = mongoose.connection.db;

//   return {
//     db,
//     dbName: getDbNameFromUri(mongoUri),
//     dbCollections: await getDbCollections(db),
//   };
// }

// // =========================================================
// async function ensureDatabaseExists(db) {
//   // A simple ping ensures the DB is reachable
//   await db.command({ ping: 1 });
//   return true;
// }

// // =========================================================



// // =========================================================
// // function collectionsAreEqual(listA, listB) {
// //   const a = [...listA].sort();
// //   const b = [...listB].sort();
// //   return a.length === b.length && a.every((name, i) => name === b[i]);
// // }
 

// // =========================================================
// module.exports = {
//   connectToModeDb,
//   ensureDatabaseExists,
// };

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
// Attach listeners once so any connection drop / recovery is logged
// immediately server-side, instead of only being discovered when the
// next request happens to hit the DB.
let listenersAttached = false;
function attachConnectionListeners() {
  if (listenersAttached) return;
  listenersAttached = true;

  mongoose.connection.on('error', (err) => {
    console.error('❌ MongoDB connection error:', err.message);
  });

  mongoose.connection.on('disconnected', () => {
    console.error('❌ MongoDB disconnected');
  });

  mongoose.connection.on('reconnected', () => {
    console.log('✅ MongoDB reconnected');
  });
}

// =========================================================
async function connectToModeDb(envMode) {

    const mongoUri = process.env.MONGO_URI

  if (!mongoUri) {
    throw new Error(
      `Missing Mongo URI for envMode "${envMode}" : "${mongoUri}"`
    );
  }

  attachConnectionListeners();

  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(mongoUri, {
      // Fail fast on initial connect instead of the 30s default -
      // if Mongo isn't reachable, we want to know in ~5s, not 30.
      serverSelectionTimeoutMS: 5000,
      // Detect a mid-session drop quickly instead of the 10s default
      // heartbeat interval.
      heartbeatFrequencyMS: 2000,
    });
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



// =========================================================
// function collectionsAreEqual(listA, listB) {
//   const a = [...listA].sort();
//   const b = [...listB].sort();
//   return a.length === b.length && a.every((name, i) => name === b[i]);
// }
 

// =========================================================
// Middleware: reject immediately (503) if Mongo isn't currently connected,
// instead of letting a route attempt a query that's doomed to hang until
// serverSelectionTimeoutMS expires.
function requireDbConnection(req, res, next) {
  // 1 = connected, 0 = disconnected, 2 = connecting, 3 = disconnecting
  if (mongoose.connection.readyState !== 1) {
    console.error('❌ Blocked request - MongoDB not connected. State:', mongoose.connection.readyState);
    return res.status(503).json({ error: 'Database unavailable' });
  }
  next();
}

// =========================================================
module.exports = {
  connectToModeDb,
  ensureDatabaseExists,
  requireDbConnection,
};