var express = require('express');
var router = express.Router();

const study_controller = require("../controllers/studyController");
const { requireLogin } = require("../middleware/auth");

// Every /api/study route requires an authenticated session. Controllers
// derive the acting user from req.session.user rather than trusting any
// client-supplied username.
router.use(requireLogin);

router.get("/study/:studyUID", study_controller.study_get);

router.get("/study/:studyUID/validate/:seriesUID", study_controller.study_validate_series);

router.get("/study", study_controller.studyUID_list_get);

router.post("/series-progress", study_controller.series_progress_post);

router.get("/study-progress", study_controller.study_progress_get);

router.post("/study-complete", study_controller.study_complete_post);

router.post("/timed-event", study_controller.timed_event_post);


module.exports = router;