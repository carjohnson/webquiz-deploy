const asyncHandler = require("express-async-handler");
const Study = require("../models/study");
const User = require('../models/user');
const Progress = require('../models/progress');
const { computeStudyStatus } = require('../utils/studyStatus');

//=========================================================
// GET /api/study/:studyUID
exports.study_get = asyncHandler(async (req, res, next) => {
    const study = await Study.findOne({ studyUID: req.params.studyUID });
    if (!study) {
      return res.status(404).json({
        error: `Study not found ${study}`,
        studyUID: req.params.studyUID,
        collection: Study.collection.name
       });
    }
    res.json(study);
});

//=========================================================
// get all studies from the database
exports.studyUID_list_get = asyncHandler(async (req, res, next) => {
    const studyUIDList = await Study.find({}, 'studyUID');
    if (!studyUIDList || studyUIDList.length === 0) {
      return res.status(404).json({
      error: 'No studies found',
      collection: Study.collection.name
    });
  }
  res.status(200).json(studyUIDList);
});

//=========================================================
// Ensure a series is part of the group listed in the study
exports.study_validate_series = asyncHandler(async (req, res, next) => {
  const { studyUID, seriesUID } = req.params;

  const study = await Study.findOne({ studyUID });
  if (!study) {
    return res.status(404).json({ error: 'Study not found', studyUID });
  }

  const isValid = study.seriesUIDsToBeAnnotated.includes(seriesUID);
  res.json({ studyUID, seriesUID, isValid });
});

//=========================================================
// Mark entire study as complete
exports.study_complete_post = asyncHandler(async (req, res, next) => {
  const username = req.session?.user?.username;
  const { studyUID } = req.body;

  if (!username || !studyUID) {
    return res.status(400).json({ error: 'Missing required fields in session: user or study' });
  }

    const user = await User.findOne({ username });
    const study = await Study.findOne({ studyUID });

    if (!user || !study) {
      return res.status(404).json({ error: 'User or Study not found' });
    }

    let progress = await Progress.findOne({
      user_id: user._id,
      study_id: study._id,
    });

    const completedSeries = study.seriesUIDsToBeAnnotated.map(seriesUID => ({
      seriesUID,
      status: 'done',
    }));

    if (!progress) {
      progress = new Progress({
        user_id: user._id,
        study_id: study._id,
        series_progress: completedSeries,
        study_status: 'done',
      });
    } else {
      progress.series_progress = completedSeries;
      progress.study_status = 'done';
      progress.updated_at = Date.now();
    }

    await progress.save();
    res.status(200).json({ message: 'Study marked as complete', progress });
});

//=========================================================
// Update the user-study-progress documents for the specified series
exports.series_progress_post = asyncHandler(async (req, res, next) => {
  const username = req.session?.user?.username;
  const { studyUID, seriesUID, status } = req.body;

  if (!username || !studyUID || !seriesUID || !status) {
    return res.status(400).json({ error: 'Missing required fields for progress' });
  }

  const validStatuses = ['new', 'wip', 'done'];
  const normalizedStatus = status.trim().toLowerCase();
  if (!validStatuses.includes(normalizedStatus)) {
    return res.status(400).json({ error: 'Invalid status value' });
  }

  const user = await User.findOne({ username });
  const study = await Study.findOne({ studyUID });

    if (!user || !study) {
      return res.status(404).json({ error: 'User or Study not found for progress' });
    }

    let progress = await Progress.findOne({
      user_id: user._id,
      study_id: study._id,
    });

    if (!progress) {
      progress = new Progress({
        user_id: user._id,
        study_id: study._id,
      series_progress: [{ seriesUID, status: normalizedStatus }],
      study_status: normalizedStatus,
      });
    } else {
      const existingSeries = progress.series_progress.find(sp => sp.seriesUID === seriesUID);
      if (existingSeries) {
      existingSeries.status = normalizedStatus;
      } else {
      progress.series_progress.push({ seriesUID, status: normalizedStatus });
      }


    // Recalculate study_status based on actual series count
    const totalSeries = study.seriesUIDsToBeAnnotated.length;
    progress.study_status = computeStudyStatus(progress.series_progress, totalSeries);
  }

    await progress.save();
    res.status(200).json({ message: 'Progress updated', progress });
});

//=========================================================
exports.study_progress_get = asyncHandler(async (req, res, next) => {
  const username = req.session?.user?.username;
  const { studyUID } = req.query;

  if (!username || !studyUID) {
    return res.status(400).json({ error: 'Missing username or studyUID for progress' });
  }

    const user = await User.findOne({ username });
    const study = await Study.findOne({ studyUID });

    if (!user || !study) {
      return res.status(404).json({ error: 'User or Study not found for progress' });
    }

    const progress = await Progress.findOne({
      user_id: user._id,
      study_id: study._id,
    });

    if (!progress) {
      return res.status(200).json({ study_status: 'new', series_progress: [] });
    }

    // Recalculate study_status based on actual series count
    const totalSeries = study.seriesUIDsToBeAnnotated.length;
    const computedStatus = computeStudyStatus(progress.series_progress, totalSeries);

  res.status(200).json({
      study_status: computedStatus,
      series_progress: progress.series_progress,
      updated_at: progress.updated_at,
    });
});

//=========================================================
exports.timed_event_post = asyncHandler(async (req, res, next) => {
  const username = req.session?.user?.username;
    const { studyUID, event, method } = req.body;

    if (!username || !studyUID || !event) {
      return res.status(400).json({ error: 'username, studyUID, and event are required for timing event' });
    }

    const user = await User.findOne({ username });
    const study = await Study.findOne({ studyUID });

    if (!user || !study) {
      return res.status(404).json({ error: 'User or Study not found for timing event' });
    }

    let progress = await Progress.findOne({
      user_id: user._id,
      study_id: study._id,
    });

    const event_item = {
      event,
      occurred_at: new Date(),
      method: method || 'unknown',
    };

    if (!progress) {
      progress = new Progress({
        user_id: user._id,
        study_id: study._id,
        timed_events: [event_item],
      });
    } else {
      progress.timed_events.push(event_item);
    }

    progress.updated_at = new Date();
    await progress.save();

  res.status(200).json({ ok: true, message: `Study ${event} event recorded`, progress });
});