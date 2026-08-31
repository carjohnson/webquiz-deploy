const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.index = asyncHandler(async (req, res, next) => {
  try {
    // define the user variable from the session
    const user = req.session.user;


    // console.log('session before save keys:', Object.keys(req.session));

    //  Render the view
    res.render("iframehost", {
      title: "",
      user: user, 
      serviceUrl: process.env.REACT_APP_API_BASE_URL || 'https://localhost:3000'
    });
  } catch (error) {
    console.error("iframehostController>Error", error);
    next(error); // Pass the error to Express error handler
  }
});