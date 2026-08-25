// const express = require("express");
// const router = express.Router();
// const multer = require('multer');
// const upload = multer({ storage: multer.memoryStorage() });  // Explicit memory storage

// const webquiz_controller = require("../controllers/webquizController");
// const { requireDbConnection } = require('../utils/dbConnection');


// /// WEBQUIZ ROUTES ///

// router.get("/", webquiz_controller.index); 


// router.post("/annotationObjects", upload.any(), requireDbConnection, webquiz_controller.post_annotationObjects);

// router.get('/list-users-annotations', webquiz_controller.list_users_annotations);

// router.post('/legend', upload.any(), requireDbConnection, webquiz_controller.post_legend);

// router.post('/clear-session', upload.any(), webquiz_controller.post_clear_session);

// router.post("/studyid", upload.any(), requireDbConnection, webquiz_controller.post_studyid);

// router.get('/list-study-seriesToBeAnnotated', webquiz_controller.list_study_seriesToBeAnnotated);

// router.post("/segmentationObjects", upload.any(), requireDbConnection, webquiz_controller.post_segmentationObjects);

// router.get("/list-study-segmentations", webquiz_controller.list_study_segmentations);

// router.get("/get-segmentation-file", webquiz_controller.get_segmentation_file);

// module.exports = router;


const express = require("express");
const router = express.Router();
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });  // Explicit memory storage

const webquiz_controller = require("../controllers/webquizController");
const { requireDbConnection } = require('../utils/dbConnection');


/// WEBQUIZ ROUTES ///

router.get("/", webquiz_controller.index); 


router.post("/annotationObjects", upload.any(), requireDbConnection, webquiz_controller.post_annotationObjects);

router.get('/list-users-annotations', requireDbConnection, webquiz_controller.list_users_annotations);

router.post('/legend', upload.any(), requireDbConnection, webquiz_controller.post_legend);

router.post('/clear-session', upload.any(), webquiz_controller.post_clear_session);

router.post("/studyid", upload.any(), requireDbConnection, webquiz_controller.post_studyid);

router.get('/list-study-seriesToBeAnnotated', requireDbConnection, webquiz_controller.list_study_seriesToBeAnnotated);

router.post("/segmentationObjects", upload.any(), requireDbConnection, webquiz_controller.post_segmentationObjects);

router.get("/list-study-segmentations", requireDbConnection, webquiz_controller.list_study_segmentations);

router.get("/get-segmentation-file", requireDbConnection, webquiz_controller.get_segmentation_file);

module.exports = router;