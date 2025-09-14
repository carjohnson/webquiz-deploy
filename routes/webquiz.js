const express = require("express");
const router = express.Router();
const dicomsegController = require('../controllers/dicomsegController');

// Require controller modules.
const webquiz_controller = require("../controllers/webquizController");

/// WEBQUIZ ROUTES ///

router.get("/", webquiz_controller.index); 

router.post("/lengths", webquiz_controller.post_lengths);

router.post("/volumes", webquiz_controller.post_volumes);

router.post("/annotationObjects", webquiz_controller.post_annotationObjects);

router.get('/list-users-annotations', webquiz_controller.list_users_annotations);

router.post("/patientid", webquiz_controller.post_patientid);

router.post('/legend', webquiz_controller.post_legend);

router.post('/dicomsegdata', express.raw({ type: 'application/octet-stream', limit: '25mb' }), dicomsegController.uploadSegmentation);

router.post('/clear-session', webquiz_controller.post_clear_session);


module.exports = router;
