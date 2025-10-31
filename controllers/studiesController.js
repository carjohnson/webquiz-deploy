const asyncHandler = require("express-async-handler");
const Study = require("../models/study");

/////// FOR DEBUGGING /////
// restart server, and after logging in try to access the route:
//    https://localhost:3000/api/studies/1.2.3.4.5
//////////////////////////
// exports.study_get = asyncHandler(async (req, res, next) => {
//   res.json({
//     message: "Route is working!",
//     studyUID: req.params.studyUID
//   });
// });


// GET /api/studies/:studyUID
exports.study_get = asyncHandler(async (req, res, next) => {
  try {
    const study = await Study.findOne({ studyUID: req.params.studyUID });
    if (!study) {
      return res.status(404).json({
        error: 'Study not found',
        studyUID: req.params.studyUID,
        collection: Study.collection.name
       });
    }
    res.json(study);
  } catch (err) {
    console.error("Error fetching study:", err);
    res.status(500).json({ error: 'Server error' });
  }
});


// Ensure a series is part of the group listed in the study
// test example: //    https://localhost:3000/api/studies/1.2.3.4.5/validate/1.2.3.4.5.6.7
exports.study_validate_series = asyncHandler(async (req, res, next) => {
  const { studyUID, seriesUID } = req.params;

  const study = await Study.findOne({ studyUID });
  if (!study) {
    return res.status(404).json({ error: 'Study not found', studyUID });
  }

  const isValid = study.seriesUIDs.includes(seriesUID);
  res.json({ studyUID, seriesUID, isValid });
});