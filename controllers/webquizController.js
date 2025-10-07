const asyncHandler = require("express-async-handler");
const Annotation = require('../models/annotation');
const User = require('../models/user');

const userColors = [
  '#e6194b', '#46f0f0', '#e6beff', '#4363d8', '#f58231',
  '#911eb4', '#3cb44b', '#f032e6', '#bcf60c', '#fabebe',
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

// route to send either all users' annotations or a specific user's annotations to the Viewer iframe when requested
//  This is not relayed through the parent. The request from the viewer is direct to the server
exports.list_users_annotations = asyncHandler(async (req, res, next) => {
  const sessionUser = req.session.user;
  const { username, patientid } = req.query;

  if (!sessionUser) {
    return res.status(401).json({ error: 'User not authenticated' });
  }
  if (!patientid) {
    return res.status(400).json({ error: 'Missing patient ID in session' });
  }

  try {

    let annotationsList = [];


    if (sessionUser.role === 'admin') {
      // Admin: get all annotations for the specified patient
      const patientAnnotations = await Annotation.find({ patient_id: patientid });

      // 🧮 Map user ID to index
      const uniqueUserIds = [...new Set(patientAnnotations.map(doc => doc.user_id.toString()))];
      const userIndexMap = new Map();
      uniqueUserIds.forEach((userId, idx) => {
        userIndexMap.set(userId, idx);
      });

      // build list of annotations with user id and assigned color
      annotationsList = patientAnnotations.map(doc => ({
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
      // Reader: get annotations for this user and patient
      const userid = sessionUser._id;
      const userAnnotations = await Annotation.find({
        user_id: userid,
        patient_id: patientid
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

      if (key === 'annotationObjects' && Array.isArray(data) && data.length > 0) {
        await saveAnnotationsToDB(data, req);
        console.log('✅ Annotations saved to DB');
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

  // console.log("*** USER NAME: ", username, "   PATIENT ID: ", patientid);
  if (!username || !patientid) {
    console.error("❌ Missing user or patient ID in session");
    return;
  }

  try {
    const existingAnnotation = await Annotation.findOne({
      user_id: req.session.user._id,
      patient_id: patientid
    });

    if (existingAnnotation) {
      console.log('✏️ Updating existing annotation document');
      existingAnnotation.data = annotationObjects;
      existingAnnotation.created_at = new Date(); // optional: refresh timestamp
      await existingAnnotation.save();
      console.log('✅ Annotation updated in DB');
    } else {
      console.log('🆕 Creating new annotation document');
      const newAnnotation = new Annotation({
        user_id: req.session.user._id,
        patient_id: patientid,
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
