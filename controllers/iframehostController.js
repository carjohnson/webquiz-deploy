const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");


exports.index = asyncHandler(async (req, res, next) => {
  // connect to *.pug view
  try {
    res.render("iframehost", {
      title: "",
      user: req.session.user,
    });
  } catch (error) {
    console.error("iframehostController>Error", error);
  }
});