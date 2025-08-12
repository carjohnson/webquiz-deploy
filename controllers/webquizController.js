const fs = require('fs');
const path = require('path');
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");


// NOTE: dicomMeta comes from dicomsegController

exports.index = asyncHandler(async (req, res, next) => {
  const lengths = req.session.lengths || [];
  const volumes = req.session.volumes || [];
  const annotationObjects = req.session.annotationObjects || [];
  const dicomMeta = req.session.dicomMeta || [];

  console.log('🧪 View render data:', { lengths, volumes: req.session.volumes });
  // connect to *.pug view
  res.render("webquiz", {
    title: "Quiz",
    lengths,
    volumes,
    dicomMeta,
    annotationObjects
  });

  // >>>>>> interim step - before save to db
  // save annotation objects to file
  if (annotationObjects.length > 0) {
    saveAnnotationsToFile(annotationObjects, 'testSavedAnnotationObjects.json');
  }

});


exports.post_lengths = handleSessionPost( {key: 'lengths', keyLabel: 'lengths'});

exports.post_volumes = handleSessionPost( {key: 'volumes', keyLabel: 'volumes'});

exports.post_annotationObjects = handleSessionPost( {key: 'annotationObjects', keyLabel: 'annotationObjects'});

function handleSessionPost( {key, keyLabel} ) {
  return (req, res, next) => {
    // console.log(`\x1b[32m🛬 Incoming ${keyLabel} POST body:\n%s\x1b[0m`, JSON.stringify(req.body, null, 2));

    const data = req.body.payload?.[key];

    if (!data) {
      console.error(`❌ No ${keyLabel} received in payload`);
      return res.status(400).json({ error: `Missing ${keyLabel}` });
    }

    req.session[key] = data;

    console.log('\x1b[32m%s', `🗃️ Saved ${keyLabel} to session:\x1b[0m`, data);

    req.session.save((err) => {
      if (err) {
        console.error(`❌ Error saving ${keyLabel} session:`, err);
        return res.status(500).json({ error: 'Session save failed' });
      }

      console.log('\x1b[32m%s', `✅ ${keyLabel} session saved successfully\x1b[0m`);
      res.json({ status: 'ok' });
    });
  }
};


exports.post_clear_session = (req, res) => {
  req.session.lengths = null;
  req.session.volumes = null;
  req.session.dicomMeta = null;
  req.session.annotationObjects = null;

  console.log("🧹 Session cleared");
  res.json({ status: "Session cleared" });
};

// >>>>>>>>>>>>> Helper functions <<<<<<<<<<<<<
function saveAnnotationsToFile(annotationObjects, filename) {
  const filePath = path.join(__dirname, '../tempTesting', filename);
  fs.writeFileSync(filePath, JSON.stringify(annotationObjects, null, 2), 'utf8');
  console.log(`📁 Saved annotations to ${filePath}`);
}