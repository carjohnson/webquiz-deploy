const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");


exports.index = asyncHandler(async (req, res, next) => {
  // Get details of webquiz
  res.render("index", {
    title: "Web Quiz Home",
  });
});