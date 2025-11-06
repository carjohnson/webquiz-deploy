var express = require('express');
var router = express.Router();

const studies_controller = require("../controllers/studiesController");

router.get("/studies/:studyUID", studies_controller.study_get);

router.get("/studies/:studyUID/validate/:seriesUID", studies_controller.study_validate_series);

router.get("/studies", studies_controller.studyUID_list_get);

router.post("/study-progress", studies_controller.study_progress_post);

router.get("/study-progress", studies_controller.study_progress_get);

module.exports = router;