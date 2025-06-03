var express = require('express');
var router = express.Router();

// GET home page.
router.get("/", function (req, res) {
  res.redirect("/webquiz");
});


router.get('/about', function(req, res, next) {
  res.send("Baines Imaging Lab");
});

module.exports = router;
