const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

// NOTE: dicomMeta comes from dicomsegController

exports.index = asyncHandler(async (req, res, next) => {
  const lengths = req.session.lengths || [];
  const volumes = req.session.volumes || [];
  const dicomMeta = req.session.dicomMeta || [];

  console.log('🧪 View render data:', { lengths, volumes: req.session.volumes });
  // connect to *.pug view
  res.render("webquiz", {
    title: "WebQuiz Panel",
    lengths,
    volumes,
    dicomMeta
  });
  // clear after rendering
  req.session.lengths = null;
  req.session.volumes = null;
  req.session.dicomMeta = null;
});


exports.post_lengths = handleSessionPost( {key: 'lengths', keyLabel: 'lengths'});

exports.post_volumes = handleSessionPost( {key: 'volumes', keyLabel: 'volumes'});


function handleSessionPost( {key, keyLabel}) {
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