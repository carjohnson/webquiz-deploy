const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");


exports.index = asyncHandler(async (req, res, next) => {
  // connect to *.pug view
  try {
    console.log('saving session for user:', user.email);
    console.log('session before save keys:', Object.keys(req.session));

    res.render("iframehost", {
      title: "",
      user: req.session.user,
      serviceUrl: process.env.RENDER_SERVICE_URL || 'localhost'
    });
  } catch (error) {
    console.error("iframehostController>Error", error);
  }
});