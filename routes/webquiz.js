const express = require("express");
const router = express.Router();
const dicomsegController = require('../controllers/dicomsegController');

// Require controller modules.
const webquiz_controller = require("../controllers/webquizController");

/// WEBQUIZ ROUTES ///

router.get("/", webquiz_controller.index); 

router.post("/lengths", webquiz_controller.post_lengths);

router.post("/volumes", webquiz_controller.post_volumes);

router.post('/dicomsegdata', express.raw({ type: 'application/octet-stream', limit: '25mb' }), dicomsegController.uploadSegmentation);

module.exports = router;
