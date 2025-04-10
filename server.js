const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;
const fs = require('fs');

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


// set up routes - to browser - you can set up many routes

app.get('/', (req, res) => {
//   console.log('In get');
  res.sendFile(path.join(__dirname, "src", "forms", "form3.html"));
});

app.post('/', (req, res) => {

  // use the "request" object to know everything about the request
  console.log('got request!');
  // method ('GET', 'POST', 'PUT, etc.):
  console.log('HTTP method: ' + req.method);
  // URL:
  console.log('HTTP URL: ' + req.url);
  // headers:
  console.log('HTTP headers follow:');
  console.log(req.headers);
  // client address:
  console.log('client address: ' + req.socket.address().address);

  // to send a response back to the client
  res.send("New <b>name</b> added : "  + req.body.name);
  

  function canWrite(path, callback) {
    fs.access(path, fs.W_OK, function(err) {
      callback(null, !err);
    });
  }

  canWrite(path.join(__dirname, './results/output.txt'), function(err, isWritable) {
    if (err) {
      console.log(err);
    } else {
      console.log("In POST, file: ", path.join(__dirname, './results/output.txt'), ",", " is writable: ", isWritable); // true or false
    }
  });

  // folder must exist - file will be created then appended to
  fs.writeFileSync(path.join(__dirname, './results/output.txt'), req.body.name + '\n', { flag: 'a+' }, err => {
      if (err) {
      console.log(err);
    } else {
      console.log('*** File written ***');
    }
  })
})



app.listen(port, (err) => {
  if (err) {
    console.log(`There was a problem with app.listen: ${err} `);
  }
  console.log(`Listening on port ${port}`)
});

