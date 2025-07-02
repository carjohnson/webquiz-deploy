const express = require("express");
const router = express.Router();

// Require controller modules.
const webquiz_controller = require("../controllers/webquizController");

/// WEBQUIZ ROUTES ///

router.get("/", webquiz_controller.index); 

router.post("/lengths", webquiz_controller.post_lengths);

router.post("/volumes", webquiz_controller.post_volumes);

module.exports = router;