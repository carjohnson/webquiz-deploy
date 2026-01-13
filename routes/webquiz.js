const express = require("express");
const router = express.Router();

// Require controller modules.
const webquiz_controller = require("../controllers/webquizController");

/// WEBQUIZ ROUTES ///

router.get("/", webquiz_controller.index); 


router.post("/annotationObjects", webquiz_controller.post_annotationObjects);

router.get('/list-users-annotations', webquiz_controller.list_users_annotations);

router.post("/patientid", webquiz_controller.post_patientid);

router.post('/legend', webquiz_controller.post_legend);

router.post('/clear-session', webquiz_controller.post_clear_session);

router.post("/studyid", webquiz_controller.post_studyid);

module.exports = router;
