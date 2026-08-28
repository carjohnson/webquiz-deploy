// app.js
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const mongoose = require('mongoose');
require("dotenv").config();
const app = express();
var path = require('path');
var logger = require('morgan');
const createError = require('http-errors');
const crypto = require('crypto');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var webquizRouter = require("./routes/webquiz");
var iframehostRouter = require("./routes/iframehost");
var studyRoutes = require("./routes/study");
var managerRoutes = require("./routes/manager");
const { connectToModeDb } = require('./utils/dbConnection');


// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
/**
 * For development:
 * Express will forward WebSocket upgrade requests (handshakes)
 * -  to Webpack Dev Server at https://localhost:3000/ws
 */
const { createProxyMiddleware } = require('http-proxy-middleware');
console.log(' *** NODE_ENV, BASE_URL', process.env.NODE_ENV, process.env.REACT_APP_API_BASE_URL);
if (process.env.NODE_ENV !== 'production') {
  const wsProxy = createProxyMiddleware({
    target: 'https://localhost:3000',
    changeOrigin: true,
    ws: true,
    secure: false,
  });
}

// app sees NODE_ENV from the environment (Docker (highest priority or local)
const environment = process.env.NODE_ENV || 'development';

const allowedOrigins = ['https://localhost:3000', 'https://localhost', process.env.REACT_APP_API_BASE_URL];
// for production (deployed app)
if (process.env.REACT_APP_API_BASE_URL) {
  allowedOrigins.push(process.env.REACT_APP_API_BASE_URL);
}

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// View engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");


// import mongoose module
mongoose.set("strictQuery", 'throw');  // error if querying something missing from db

const mongoUri = process.env.MONGO_URI


if (!mongoUri) {
  console.error(`MongoDB URI not set for ${process.env.NODE_ENV || 'development'} environment`);
  return;
}

const sessionSecretKey = process.env.NODE_ENV === 'production'
  ? process.env.SESSION_SECRET_PROD
  : process.env.SESSION_SECRET_DEV;
if (!sessionSecretKey) {
  console.error(`SESSION_SECRET key for cookies not set for ${process.env.NODE_ENV || 'development'} environment`);
  return;
}

// Wait for database to connect, logging an error if there is a problem.
main().catch((err) => console.error("MongoDB connection error", err));
async function main() {
  const { dbName, dbCollections } = await connectToModeDb(environment);
  console.log(`Connected to MongoDB (db: ${dbName}, ${dbCollections.length} collections)`);
}

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// =================================================
// set up session ID to store info that both client and server
//  can access through req.session
app.use(session({
  secret: sessionSecretKey,
  resave: false,
  saveUninitialized: false,
  rolling: true,          // resets maxAge on every request — active users stay logged in
  cookie: {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    maxAge: 50 * 60 * 1000  // 50 min of *inactivity* logs them out
  }
}));
app.set('trust proxy', 1);

// log incoming requests
app.use((req, res, next) => {
  // console.log(`📮 [${req.method}] ${req.originalUrl}`);
  // console.log('🧠 Session:', req.session);
  // console.log('📮 req', req.body);
  next();
});
// app.use((req, res, next) => {
//   console.log('--- AFTER SESSION ---');
//   console.log('url:', req.originalUrl);
//   console.log('cookie:', req.headers.cookie);
//   console.log('session exists:', req.session !== undefined);
//   console.log('session keys:', req.session ? Object.keys(req.session) : null);
//   console.log('session user:', req.session?.user);
//   next();
// });


// =================================================
// lock down all routes
app.use((req, res, next) => {
  // // 1. DEBUG LOGS
  //   console.log("--- MIDDLEWARE DEBUG ---");
  //   console.log("Original URL:", req.originalUrl);
  //   console.log("User in session:", !!req.session?.user);

  // 2. IMMEDIATE BYPASS (for ohif and auth)
  if (req.originalUrl.startsWith('/ohif')) {
    // console.log("Bypassing auth for /ohif");
    return next();
  }

  // 3. IF LOGGED IN, PROCEED
  if (req.session && req.session.user) {
    return next();
  }

  // 4. PUBLIC PATHS / ASSETS
  const publicPaths = ['/users/login', '/users/register', '/about'];
  const isPublicAsset = req.originalUrl.startsWith('/stylesheets/') || 
                        req.originalUrl.startsWith('/assets/');
  const isPublicPath = publicPaths.some(path => req.originalUrl.startsWith(path));

  if (isPublicPath || isPublicAsset) {
    return next();
  } 

  // 5. OTHERWISE REDIRECT
  console.log("Redirecting to login for:", req.originalUrl);
  return res.redirect('/users/login?msg=Please log in');
});

// =================================================
// Mount routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/webquiz', webquizRouter);
app.use('/iframehost', iframehostRouter);
app.use('/api', studyRoutes);  // endpoint accessible at GET /api/study/:studyUID
app.use('/manager', managerRoutes);

// =================================================
// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));


// =================================================
// 404 handler (unmatched routes - no throwing)
// =================================================
app.use((req, res, next) => {
  res.status(404).json({ error: 'Not Found' });
});

// =================================================
// Global Error handler (handles real errors)
// =================================================
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);

  const status = err.status || 500;
  res.status(status).json({ error: err.message });
});

module.exports = app;

///////////// for debugging - list files ////////////
// app.get('/debug-ohif', (req, res) => {
//   const fs = require('fs');
//   const dir = path.join(__dirname, 'public/ohif');
//   try {
//     const files = fs.readdirSync(dir);
//     res.json({ exists: true, dir, files });
//   } catch (err) {
//     res.json({ exists: false, dir, error: err.message });
//   }
// });