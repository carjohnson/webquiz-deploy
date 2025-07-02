const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");


exports.index = asyncHandler(async (req, res, next) => {
  const lengths = req.session.lengths || [];
  console.log('\x1b[32m%s', '>>>>>>>>>> Sending lengths to pug:\x1b[0m', lengths);
  // connect to *.pug view
  res.render("webquiz", {
    title: "WebQuiz Panel",
    lengths,
  });
  req.session.lengths = null;
});


exports.post_lengths = (req, res, next) => {
  console.log('\x1b[32m🛬 Incoming POST body:\n%s\x1b[0m', JSON.stringify(req.body, null, 2));

  if (!req.body || !req.body.payload?.lengths) {
    console.error('❌ No lengths received in payload');
    return res.status(400).json({ error: 'Missing lengths' });
  }

  req.session.lengths = req.body.payload.lengths;
  console.log('\x1b[32m%s', '🗃️ Saved lengths to session:\x1b[0m', req.session.lengths);

  req.session.save((err) => {
    if (err) {
      console.error('❌ Error saving session:', err);
      return res.status(500).json({ error: 'Session save failed' });
    }

    console.log('\x1b[32m%s', '✅ Session saved successfully\x1b[0m');
    res.json({ status: 'ok' });
  });
};

exports.post_volumes = (req, res, next) => {
  res.send('Post Volumes - not yet implemented')
};