const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.index = asyncHandler(async (req, res, next) => {
  const user = req.session.user;
  // console.log('session before save keys:', Object.keys(req.session));

  res.render("iframehost", {
    title: "",
    user: user, 
    serviceUrl: process.env.REACT_APP_API_BASE_URL || 'https://localhost:3000'
  });
});