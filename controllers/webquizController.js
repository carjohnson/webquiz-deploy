const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");


exports.index = asyncHandler(async (req, res, next) => {
  const lengths = req.session.lengths || [];
  console.log('>>>>>>>>>> Sending lengths to pug:', lengths);
  // connect to *.pug view
  res.render("webquiz", {
    title: "WebQuiz Panel",
    lengths,
  });
  req.session.lengths = null;
});

exports.post_lengths = (req, res, next) => {
  console.log('🛬 Incoming POST body:', req.body);
  if (!req.body || !req.body.lengths) {
    console.error('❌ No lengths received in body');
    return res.status(400).json({ error: 'Missing lengths' });
  }

  req.session.lengths = req.body.lengths;
  console.log('🗃️ Saved lengths to session:', req.session.lengths);

  req.session.save((err) => {
    if (err) {
      console.error('❌ Error saving session:', err);
      return res.status(500).json({ error: 'Session save failed' });
    }

    console.log('✅ Session saved successfully');
    res.json({ status: 'ok' });
  });
};
