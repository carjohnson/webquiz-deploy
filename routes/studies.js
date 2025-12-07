var express = require('express');
var router = express.Router();

const studies_controller = require("../controllers/studiesController");

router.get("/studies/:studyUID", studies_controller.study_get);

router.get("/studies/:studyUID/validate/:seriesUID", studies_controller.study_validate_series);

router.get("/studies", studies_controller.studyUID_list_get);

router.post("/series-progress", studies_controller.series_progress_post);

router.get("/study-progress", studies_controller.study_progress_get);

router.post("/study-complete", studies_controller.study_complete_post);

module.exports = router;