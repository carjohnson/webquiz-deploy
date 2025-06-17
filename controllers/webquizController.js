const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");


exports.index = asyncHandler(async (req, res, next) => {
  res.render("index", {
    title: "Web Quiz Home",
  });
  // console.log(path.join(__dirname, '../public/index.html'))
  // res.sendFile(path.join(__dirname, '../public/index.html'));
});