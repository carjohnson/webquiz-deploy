'use strict';

const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const fs = require('fs');
const readline = require('readline');

// for cross origin requests - different ports on http requests
const cors = require('cors');
app.use(cors());


// const ReactDOMServer = require('react-dom/server');
// const App = require('./react-app/src/App').default;

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(express.json());


app.use(express.static(path.join(__dirname, 'react-app/build')));
// app.use((req, res) => {
//   res.status(200).send('Hello from Baines Imaging Lab!');
// })

//>>>>>>>>>>>>>>>>>>>>>>>>>>

// Get contents of results file - to confirm it is being updated when deployed
var lsOptions = [];
function addToOptions(sOption) {
  lsOptions.push(sOption);
};

// Creating a readable stream from file
// readline module reads line by line 
// but from a readable stream only.
const resultsFile = readline.createInterface({
    input: fs.createReadStream('./results/output.txt'),
    output: process.stdout,
    terminal: false
});

// Printing the content of file line by
//  line to console by listening on the
// line event which will triggered
// whenever a new line is read from
// the stream
resultsFile.on('line', (line) => {
    addToOptions(line);
    console.log(lsOptions);
});
console.log(lsOptions);

//>>>>>>>>>>>>>>>>>>>>>>>>>>


// endpoint to provide frontend with the API URL
const apiUrl = process.env.API_URL || `http://localhost:${port}`;
app.get('/config', (req, res) => {
  console.log('Received request for config'); // Debugging log
  res.json({ apiUrl });
});


app.post('/', (req, res) => {

  // use the "request" object to know everything about the request
  console.log('got request ...' + req.body.option);

  console.log('HTTP method: ' + req.method);
  console.log('HTTP URL: ' + req.url);
  console.log('HTTP headers follow:');
  console.log(req.headers);
  console.log('client address: ' + req.socket.address().address);

  // to send a response back to the client
  res.json({message: "New option added : ", option: req.body.option, options: lsOptions});
  // res.send("New option added: " + req.body.option);  // sending text

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

  // NOTE: folder must exist - file will be created then appended to
  fs.writeFileSync(path.join(__dirname, './results/output.txt'), req.body.option + '\n', { flag: 'a+' }, err => {
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
  console.log(`Listening on port ${port}`);
  console.log('Press Ctrl+C to quit');
});

