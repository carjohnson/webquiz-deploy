var express = require('express');
var router = express.Router();

// Authorize users.
router.get("/", function (req, res) {
  res.redirect("/users");
});


router.get('/about', function(req, res, next) {
  res.send("Baines Imaging Lab");
});

module.exports = router;
