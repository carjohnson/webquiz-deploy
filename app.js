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


const allowedOrigins = ['https://localhost:3000', 'https://localhost'];

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
    secure: true,           // ✅ Must be true for HTTPS
    sameSite: 'none',       // ✅ Required for cross-origin iframe access
    maxAge: 60 * 60 * 1000  // 1 hour
  }
}));

// lock down all other routes unless logged in 

app.use((req, res, next) => {
  const publicPaths = [
    '/users/login',
    '/users/register',
    '/about'
  ];

  const isPublicAsset =
    req.originalUrl.startsWith('/stylesheets/') ||
    req.originalUrl.startsWith('/assets/');

  const isPublicPath = publicPaths.some(path => req.originalUrl.startsWith(path));

  if (isPublicPath || req.session.user || isPublicAsset) {
    return next();
  } else {
    return res.redirect('/users/login?msg=Please log in');
  }
});

// Mount routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/webquiz', webquizRouter);
app.use('/iframehost', iframehostRouter);

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// log incoming requests
app.use((req, res, next) => {
  console.log(`📮 [${req.method}] ${req.originalUrl}`);
  console.log('🧠 Session:', req.session);
  next();
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// catch 500
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).send('Internal Server Error');
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
