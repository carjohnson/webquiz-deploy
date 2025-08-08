// app.js
const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
require("dotenv").config();
const app = express();
var path = require('path');
var logger = require('morgan');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var webquizRouter = require("./routes/webquiz");
var iframehostRouter = require("./routes/iframehost");

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
app.use(session({
  secret: process.env.SESSION_SECRET || 'fallbackSecretKey',
  resave: false,
  saveUninitialized: true,
}));




// lock down all other routes unless logged in 
//    (expose style and assets prior to the guard)
app.use('/style.css', express.static(path.join(__dirname, 'public', 'stylesheets', 'style.css')));
app.use('/baineslogo.png', express.static(path.join(__dirname, 'public','assets','baineslogo.png')))

app.use((req, res, next) => {
  const publicPaths = ['/users/login', '/users/register', '/about', '/stylesheets/style.css', '/assets/baineslogo.png'];
  if (publicPaths.includes(req.path) || req.session.user) {
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
  next();
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
