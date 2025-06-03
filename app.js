// app.js
const express = require('express');
const mongoose = require('mongoose');
const app = express();
var path = require('path');
const port = 3001;

// var indexRouter = require('./routes/index');
// var catalogRouter = require('./routes/catalog');

// View engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");


// // import mongoose module
// const mongoDB = require('./mongouri');
// mongoose.set("strictQuery", 'throw');  // error if querying something missing from db

// // Wait for database to connect, logging an error if there is a problem
// main().catch((err) => console.log(err));
// async function main() {
//   await mongoose.connect(mongoDB);
// }

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
// app.use('/', indexRouter);
// app.use('/catalog', catalogRouter);

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
