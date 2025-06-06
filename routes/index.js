var express = require('express');
var router = express.Router();

// Authorize users.
router.get("/", function (req, res) {
  res.redirect("/users/login");
});


router.get('/about', function(req, res, next) {
res.send(`
    <div align="center">
      <h2>Baines Imaging - Radiology Coach</h2>
    </div>
    <br><br>
    <div align="center">
      <a href="/">Login</a>
    </div>
    <br><br>
    <div align="center">
      <a href="https://www.bainesimaging.com/">Baines Imaging Laboratories</a>
    </div>
  `);
});

module.exports = router;
