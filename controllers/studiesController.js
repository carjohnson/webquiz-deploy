const asyncHandler = require("express-async-handler");
const Study = require("../models/study");
const User = require('../models/user');
const Progress = require('../models/progress');
const { computeStudyStatus } = require('../utils/studyStatus');



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


//=========================================================
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

//=========================================================
// get all studies from the database
exports.studyUID_list_get = asyncHandler(async (req, res, next) => {
  try {
    const studyUIDList = await Study.find({}, 'studyUID');
    if (!studyUIDList || studyUIDList.length === 0) {
      return res.status(404).json({
      error: 'No studies found',
      collection: Study.collection.name
    });
  }
  res.status(200).json(studyUIDList);
  } catch (err) {
    console.error("Error fetching study list:", err);
    res.status(500).json({
      error: 'studiesController>>studyUID_list_get>Server error' 
    });
  }
});


//=========================================================
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

//=========================================================
// Mark entire study as complete
exports.study_complete_post = asyncHandler(async (req, res, next) => {
  const { username, studyUID } = req.body;

  if (!username || !studyUID) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // Find user and study references
    const user = await User.findOne({ username });
    const study = await Study.findOne({ studyUID });

    if (!user || !study) {
      return res.status(404).json({ error: 'User or Study not found' });
    }

    // Check if progress already exists
    let progress = await Progress.findOne({
      user_id: user._id,
      study_id: study._id,
    });

    // Build series_progress array with all series marked done
    const completedSeries = study.seriesUIDs.map(seriesUID => ({
      seriesUID,
      status: 'done',
    }));

    if (!progress) {
      // Create new progress document
      progress = new Progress({
        user_id: user._id,
        study_id: study._id,
        series_progress: completedSeries,
        study_status: 'done',
      });
    } else {
      // Update existing progress
      progress.series_progress = completedSeries;
      progress.study_status = 'done';
      progress.updated_at = Date.now();
    }

    await progress.save();

    res.status(200).json({ message: 'Study marked as complete', progress });
  } catch (err) {
    console.error('Error completing study:', err);
    res.status(500).json({ error: 'studiesController>>study_complete_post>Internal server error' });
  }
});

//=========================================================
// Update the user-study-progress documents for the specified series
exports.series_progress_post = asyncHandler(async (req, res, next) => {

  const { username, studyUID, seriesUID, status } = req.body;

  if (!username || !studyUID || !seriesUID || !status) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const validStatuses = ['new', 'wip', 'done'];
  const normalizedStatus = status.trim().toLowerCase();
  if (!validStatuses.includes(normalizedStatus)) {
    return res.status(400).json({ error: 'Invalid status value' });
  }

  try {
    // Find user and study references
    const user = await User.findOne({ username });
    const study = await Study.findOne({ studyUID: studyUID });

    if (!user || !study) {
      return res.status(404).json({ error: 'User or Study not found' });
    }

    // Check if progress already exists
    let progress = await Progress.findOne({
      user_id: user._id,
      study_id: study._id,
    });

    if (!progress) {
      // Create new progress document
      progress = new Progress({
        user_id: user._id,
        study_id: study._id,
        series_progress: [{ seriesUID, status }],
        study_status: status,
      });
    } else {
      // Update existing progress
      const existingSeries = progress.series_progress.find(sp => sp.seriesUID === seriesUID);
      if (existingSeries) {
        existingSeries.status = status;
      } else {
        progress.series_progress.push({ seriesUID, status });
      }


    // Recalculate study_status based on actual series count
    const totalSeries = study.seriesUIDs.length;
    progress.study_status = computeStudyStatus(progress.series_progress, totalSeries);

  }

    await progress.save();
    res.status(200).json({ message: 'Progress updated', progress });

  } catch (err) {
    console.error('Error updating study progress:', err);
    res.status(500).json({ error: 'studiesController>>study_progress_post>Internal server error' });
  }
});


//=========================================================
exports.study_progress_get = asyncHandler(async (req, res, next) => {
  const { username, studyUID } = req.query;

  if (!username || !studyUID) {
    return res.status(400).json({ error: 'Missing username or studyUID' });
  }

  try {
    const user = await User.findOne({ username });
    const study = await Study.findOne({ studyUID });

    if (!user || !study) {
      return res.status(404).json({ error: 'User or Study not found' });
    }

    const progress = await Progress.findOne({
      user_id: user._id,
      study_id: study._id,
    });

    if (!progress) {
      return res.status(200).json({ study_status: 'new', series_progress: [] });
    }

    // Recalculate study_status based on actual series count
    const totalSeries = study.seriesUIDs.length;
    const computedStatus = computeStudyStatus(progress.series_progress, totalSeries);


    return res.status(200).json({
      study_status: computedStatus,
      series_progress: progress.series_progress,
      updated_at: progress.updated_at,
    });

  } catch (err) {
    console.error('Error fetching study progress:', err);
    return res.status(500).json({ error: 'studiesController>>study_progress_get>Internal server error' });
  }
});

