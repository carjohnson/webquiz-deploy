const express = require("express");
const router = express.Router();

// Require controller modules.
const webquiz_controller = require("../controllers/webquizController");

/// WEBQUIZ ROUTES ///

// GET webquiz home page.
router.get("/", webquiz_controller.index); 

router.get("/webquiz", webquiz_controller.index);

module.exports = router;