const asyncHandler = require("express-async-handler");
const RulerMeasurements = require('../models/rulermeasurements');
const User = require('../models/user');
const Study = require("../models/study");

const userColors = [
  '#e6194b', '#46f0f0', '#e6beff', '#4363d8', '#f58231',
  '#911eb4', '#b2b43c', '#f032e6', '#bcf60c', '#fabebe',
  '#008080', '#ffe119', '#9a6324', '#fffac8', '#800000',
  '#aaffc3', '#808000', '#ffd8b1', '#000075', '#808080'
];

const suspicionScores = [
    '1 - definitely benign',
    '2 - probably benign',
    '3 - indeterminate',
    '4 - probably metastatic',
    '5 - definitely metastatic',
];

exports.index = asyncHandler(async (req, res, next) => {
  const legend = req.session.legend || [];

  // connect to *.pug view
  res.render("webquiz", {
    title: "Quiz",
    legend,
    suspicionScores,
  });

});

exports.post_patientid = handleSessionPost( {key: 'patientid', keyLabel: 'patientid'});

exports.post_annotationObjects = handleSessionPost( {key: 'annotationObjects', keyLabel: 'annotationObjects'});

exports.post_legend = handleSessionPost( {key: 'legend', keyLabel: 'legend'});

exports.post_clear_session = (req, res) => {
  req.session.annotationObjects = null;
  req.session.legend = null;

  console.log("🧹 Session cleared");
  res.json({ status: "Session cleared" });
};

exports.post_studyid = async (req, res) => {
  console.log("📥 Incoming POST for studyid");
  console.log("🔍 Body:", req.body);
  console.log("🧪 Session BEFORE lookup:", req.session);

  try {
    const studyuid = req.body.payload?.studyuid;

    const study = await Study.findOne({ studyUID: studyuid });

    if (!study) {
      console.log("❌ Study not found for UID:", studyuid);
      return res.status(404).json({ error: "Study not found" });
    }

    req.session.study_id = study._id;

    console.log("💾 Session AFTER saving study_id:", req.session);

    res.json({ success: true, study_id: study._id });
  } catch (err) {
    console.error("❌ Error in post_studyid:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// route to send either all users' annotations or a specific user's annotations to the Viewer iframe when requested
//  This is not relayed through the parent. The request from the viewer is direct to the server
exports.list_users_annotations = asyncHandler(async (req, res, next) => {
  const sessionUser = req.session.user;
  const { username, studyUID } = req.query;
  const study = await Study.findOne({ studyUID });
  const study_id = study._id;

  if (!sessionUser) {
    return res.status(401).json({ error: 'User not authenticated' });
  }

  if (!study_id) {
    return res.status(400).json({ error: 'Missing study ID in session' });
  }

  try {

    let annotationsList = [];


    if (sessionUser.role === 'admin') {
      // Admin: get all annotations for the specified study
      // const patientAnnotations = await RulerMeasurements.find({ patient_id: patientid });
      const studyAnnotations = await RulerMeasurements.find({study_id});

      // 🧮 Map user ID to index
      // const uniqueUserIds = [...new Set(patientAnnotations.map(doc => doc.user_id.toString()))];
      const uniqueUserIds = [...new Set(studyAnnotations.map(doc => doc.user_id.toString()))];
      const userIndexMap = new Map();
      uniqueUserIds.forEach((userId, idx) => {
        userIndexMap.set(userId, idx);
      });

      // build list of annotations with user id and assigned color
      // annotationsList = patientAnnotations.map(doc => ({
      annotationsList = studyAnnotations.map(doc => ({
        data: doc.data,
        user_id: doc.user_id,
        color: userColors[userIndexMap.get(doc.user_id.toString()) % userColors.length]
      }));

      // get user name for legend
      const users = await User.find({
        _id: { $in: uniqueUserIds}
      });
      const userNameMap = new Map();
      users.forEach(user => {
        userNameMap.set(user._id.toString(), user.username);
      })

      var legend = uniqueUserIds.map(userId => ({
        user_id: userId,
        user_name: userNameMap.get(userId),
        color: userColors[userIndexMap.get(userId) % userColors.length],
        index: userIndexMap.get(userId)
      }));

    } else {
      // Reader: get annotations for this user and study
      const userid = sessionUser._id;
      const userAnnotations = await RulerMeasurements.find({
        user_id: userid,
        // patient_id: patientid
        study_id,
      });

      const user = await(User.findOne({
        _id: userid
      }));
      const username = user?.username ?? 'Unknown';

      annotationsList = userAnnotations.map(doc => ({
        data: doc.data,
        user_id: doc.user_id,
        color: userColors[1]
      }));

      var legend = [{
        user_id: userid.toString(),
        user_name: username,
        color: userColors[1],
        index: 1
      }];

    }

    // console.log('🧮 Annotations list with colours', annotationsList);
    res.json({ type: 'list-users-annotations', payload: annotationsList, legend });
  } catch (err) {
    console.error('❌ Error retrieving annotations:', err);
    next(err);
  }
});


// >>>>>>>>>>>>> Helper functions <<<<<<<<<<<<<
function handleSessionPost({ key, keyLabel }) {
  return async (req, res, next) => {
    const data = req.body.payload?.[key];

    // 🔎 Log the raw payload and the extracted data - for debug
    // console.log(`📥 Incoming POST for ${keyLabel}`);
    // console.log('Full req.body:', JSON.stringify(req.body, null, 2));
    // console.log(`Extracted data for key "${key}":`, JSON.stringify(data, null, 2));

    if (!data) return res.status(400).json({ error: `Missing ${keyLabel}` });

    req.session[key] = data;

    try {
      await new Promise((resolve, reject) => {
        req.session.save((err) => {
          if (err) reject(err);
          else resolve();
        });
      });

      console.log(`✅ ${keyLabel} session saved`);
      if (key === 'legend') {
      }

      if (key === 'annotationObjects' && Array.isArray(data)) {
        if (data.length > 0) {
          await saveAnnotationsToDB(data, req);
          console.log('✅ Annotations saved to DB');
        } else {
          // last annotation for this userid/patientid has been deleted
          //  clear all entries from the database
          const userid = req.session.user._id
          const patientid = req.session.patientid;
          const study_id = req.session.study_id;

          if (!userid || !patientid || !study_id) {
            console.warn('⚠️ Missing userid/studyid, skipping delete');
          } else {
            // await RulerMeasurements.deleteMany({ patient_id: patientid, user_id: userid });
            await RulerMeasurements.deleteMany({ study_id, user_id: userid });
            console.log('🗑️ All annotations deleted from DB for study',study_id,'patient', patientid, 'user', userid);
          }
        }
      }

      res.json({ status: 'ok' });
    } catch (err) {
      console.error(`❌ Error in webquizController>handleSessionPost:`, err);
      next(err);
    }
  };
}


async function saveAnnotationsToDB(annotationObjects, req) {
  // first get user id based on user name
  const username = req.session.user.username;
  const patientid = req.session.patientid;
  const study_id = req.session.study_id;

  console.log("*** USER NAME: ", username, "   PATIENT ID: ", patientid, "  STUDY:", study_id);
  if (!username || !study_id) {
    console.error("❌ Missing user or study ID in session");
    return;
  }

  try {
    const existingAnnotation = await RulerMeasurements.findOne({
      user_id: req.session.user._id,
      study_id: req.session.study_id,
      // patient_id: patientid,
    });

    if (existingAnnotation) {
      console.log('✏️ Updating existing annotation document');
      existingAnnotation.data = annotationObjects;
      existingAnnotation.created_at = new Date(); // optional: refresh timestamp
      await existingAnnotation.save();
      console.log('✅ Annotation updated in DB');
    } else {
      console.log('🆕 Creating new annotation document');
      const newAnnotation = new RulerMeasurements({
        user_id: req.session.user._id,
        patient_id: patientid,
        study_id,
        data: annotationObjects
      });
      await newAnnotation.save();
      console.log('✅ Annotation saved to DB');
    }
  } catch (error) {
      console.error("❌ DB error trying to save annotation objects:", error);
      throw error;
  }
}
