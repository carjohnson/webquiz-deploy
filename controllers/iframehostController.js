const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");


exports.index = asyncHandler(async (req, res, next) => {
  res.render("iframehost", {
    title: "iFrame Host : WebQuiz + OHIF",
  });
});