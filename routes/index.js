// var express = require('express');
// var router = express.Router();

// // Authorize users.
// router.get("/", function (req, res) {
//   res.redirect("/users/login");
// });


// module.exports = router;


// routes/index.js


var express = require('express');
var router = express.Router();

router.get("/", function (req, res) {
  // Check session directly in the route
  if (req.session && req.session.user) {
    // Redirect to your main app (e.g., iframehost or webquiz)
    return res.redirect("/iframehost"); 
  } else {
    // Only redirect to login if NOT authenticated
    return res.redirect("/users/login");
  }
});

module.exports = router;