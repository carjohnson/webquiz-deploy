const express = require("express");
const router = express.Router();
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });  // Explicit memory storage


// Require controller modules.
const webquiz_controller = require("../controllers/webquizController");

/// WEBQUIZ ROUTES ///

router.get("/", webquiz_controller.index); 


router.post("/annotationObjects", upload.any(), webquiz_controller.post_annotationObjects);

router.get('/list-users-annotations', webquiz_controller.list_users_annotations);

router.post('/legend', upload.any(), webquiz_controller.post_legend);

router.post('/clear-session', upload.any(), webquiz_controller.post_clear_session);

router.post("/studyid", upload.any(), webquiz_controller.post_studyid);

router.post("/segmentationObjects", upload.any(), webquiz_controller.post_segmentationObjects);

router.get("/list-study-segmentations", webquiz_controller.list_study_segmentations);

router.get("/get-segmentation-file", webquiz_controller.get_segmentation_file);

module.exports = router;
