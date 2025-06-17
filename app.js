// app.js
const express = require('express');
const mongoose = require('mongoose');
require("dotenv").config();
const app = express();
var path = require('path');
var logger = require('morgan');


const port = process.env.PORT || 3000;
process.env.PUBLIC_URL = process.env.PUBLIC_URL || `http://localhost:${port}`;

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

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/webquiz', webquizRouter);
app.use('/iframehost', iframehostRouter);

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));


app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
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
