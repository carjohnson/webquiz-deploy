const fs = require('fs');
const path = require('path');
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const Annotation = require('../models/annotation');

// NOTE: dicomMeta comes from dicomsegController

exports.index = asyncHandler(async (req, res, next) => {
  const lengths = req.session.lengths || [];
  const volumes = req.session.volumes || [];
  const dicomMeta = req.session.dicomMeta || [];

  console.log('🧪 View render data:', { lengths, volumes: req.session.volumes });
  
  // connect to *.pug view
  res.render("webquiz", {
    title: "Quiz",
    lengths,
    volumes,
    dicomMeta,
  });

});

exports.post_lengths = handleSessionPost( {key: 'lengths', keyLabel: 'lengths'});

exports.post_volumes = handleSessionPost( {key: 'volumes', keyLabel: 'volumes'});

exports.post_patientid = handleSessionPost( {key: 'patientid', keyLabel: 'patientid'});

exports.post_annotationObjects = handleSessionPost( {key: 'annotationObjects', keyLabel: 'annotationObjects'});

exports.post_clear_session = (req, res) => {
  req.session.lengths = null;
  req.session.volumes = null;
  req.session.dicomMeta = null;
  req.session.annotationObjects = null;

  console.log("🧹 Session cleared");
  res.json({ status: "Session cleared" });
};

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

  console.log("*** USER NAME: ", username, "   PATIENT ID: ", patientid);
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
