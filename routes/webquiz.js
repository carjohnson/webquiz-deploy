const express = require("express");
const router = express.Router();

// Require controller modules.
const webquiz_controller = require("../controllers/webquizController");

/// WEBQUIZ ROUTES ///

router.get("/", webquiz_controller.index); 

router.post("/", webquiz_controller.post_lengths);

module.exports = router;