var express = require('express');
var router = express.Router();

const studies_controller = require("../controllers/studiesController");

router.get("/studies/:studyUID", studies_controller.study_get);

router.get("/studies/:studyUID/validate/:seriesUID", studies_controller.study_validate_series);

module.exports = router;