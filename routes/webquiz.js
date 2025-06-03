const express = require("express");
const router = express.Router();

// Require controller modules.
const webquiz_controller = require("../controllers/webquizController");

/// WEBQUIZ ROUTES ///

// GET webquiz home page.
router.get("/", webquiz_controller.index); // this actually maps to /webquiz/ (see routes/index.js)
// router.get("/",(req,res) => {
//     res.render("webquiz",{title: "Web Quiz Home"})
// });
router.get("/webquiz", webquiz_controller.index);

module.exports = router;