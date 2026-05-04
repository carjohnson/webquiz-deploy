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

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var webquizRouter = require("./routes/webquiz");
var iframehostRouter = require("./routes/iframehost");
var studyRoutes = require("./routes/study");

// // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// /**
//  * Place proxy at top - intercept traffic before app.use and auth middleware is activated
//  *    This is to allow for access to /ohif/ in production.
//  * 
//  * For development:
//  * Express will forward WebSocket upgrade requests (handshakes)
//  * -  to Webpack Dev Server at https://localhost:3000/ws
//  */


const { createProxyMiddleware } = require('http-proxy-middleware');

if (process.env.NODE_ENV !== 'production') {
  const wsProxy = createProxyMiddleware({
    target: 'https://localhost:3000',
    changeOrigin: true,
    ws: true,
    secure: false,
  });
}
// } else {
//     // This intercepts /ohif traffic BEFORE it hits the auth or 404 handlers
//     app.use('/ohif', createProxyMiddleware({
//       target: process.env.OHIF_TARGET || 'http://ohif_viewer:80',
//       changeOrigin: true,
//       pathRewrite: { '^/ohif': '' }, 
//     }));
// }





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

// Wait for database to connect, logging an error if there is a problem
main().catch((err) =>  console.log(err));
async function main() {
  await mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch ((err) => {
    console.error("MongoDB connection error", err);
  });
}

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// set up session ID to store info that both client and server
//  can access through req.session
const isDev = process.env.NODE_ENV !== 'production';


app.use(session({
  secret: process.env.SESSION_SECRET || 'fallbackSecretKey',
  resave: false,
  saveUninitialized: false, // 🔐 Better for security
  cookie: {
    httpOnly: true,
    // secure: process.env.RENDER === 'true' ? false : true,  // HTTP on Render   ✅ Must be true for HTTPS
    secure: true,
    // sameSite: process.env.RENDER === 'true' ? 'lax' : 'none',  // lax for HTTP ✅ Required for cross-origin iframe access
    sameSite:  'lax',  // lax for HTTP ✅ Required for cross-origin iframe access
    maxAge: 60 * 60 * 1000  // 1 hour
  }
}));
app.set('trust proxy', 1);

// log incoming requests
app.use((req, res, next) => {
  console.log(`📮 [${req.method}] ${req.originalUrl}`);
  console.log('🧠 Session:', req.session);
  console.log('📮 req', req.body);
  next();
});
app.use((req, res, next) => {
  console.log('--- AFTER SESSION ---');
  console.log('url:', req.originalUrl);
  console.log('cookie:', req.headers.cookie);
  console.log('session exists:', req.session !== undefined);
  console.log('session keys:', req.session ? Object.keys(req.session) : null);
  console.log('session user:', req.session?.user);
  next();
});


// // lock down all other routes unless logged in 
// app.use((req, res, next) => {
//   // DEBUG LOGS
//   console.log("--- MIDDLEWARE DEBUG ---");
//   console.log("Original URL:", req.originalUrl);
//   console.log('has session:', !!req.session);
//   console.log("User in session:", !!req.session.user);
  
//   if (req.originalUrl.startsWith('/ohif')) {
//     console.log("Bypassing auth for /ohif");
//     return next(); 
//   }

//   const publicPaths = [
//     '/users/login',
//     '/users/register',
//     '/about',
//     '/ohif'
//   ];

//   const isPublicAsset =
//     req.originalUrl.startsWith('/stylesheets/') ||
//     req.originalUrl.startsWith('/assets/');

//   const isPublicPath = publicPaths.some(path => req.originalUrl.startsWith(path));

//   if (isPublicPath || req.session.user || isPublicAsset) {
//     return next();
//   } else {
//     return res.redirect('/users/login?msg=Please log in');
//   }
// });



// lock down all routes
app.use((req, res, next) => {
  // 1. DEBUG LOGS
  console.log("--- MIDDLEWARE DEBUG ---");
  console.log("Original URL:", req.originalUrl);
  console.log("User in session:", !!req.session?.user);

  // 2. IMMEDIATE BYPASS (for ohif and auth)
  if (req.originalUrl.startsWith('/ohif')) {
    console.log("Bypassing auth for /ohif");
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

const fs = require('fs');
app.get('/debug-files', (req, res) => {
  const targetDir = '/usr/share/nginx/html';
  try {
    const files = fs.readdirSync(targetDir, { recursive: true });
    res.json({ directory: targetDir, files: files });
  } catch (err) {
    res.json({ error: err.message, path: targetDir });
  }
});


// Mount routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/webquiz', webquizRouter);
app.use('/iframehost', iframehostRouter);
app.use('/api', studyRoutes);  // endpoint accessible at GET /api/study/:studyUID

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// log incoming requests
app.use((req, res, next) => {
  console.log(`📮 [${req.method}] ${req.originalUrl}`);
  // console.log('🧠 Session:', req.session);
  // console.log('📮 req', req.body);
  next();
});

// // 404 handler (no throwing)
// app.use((req, res, next) => {
//   res.status(404).json({ error: 'Not Found' });
// });

// Error handler (handles real errors)
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);

  const status = err.status || 500;
  res.status(status).json({ error: err.message });
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
