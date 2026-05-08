const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");


// exports.index = asyncHandler(async (req, res, next) => {
//   // connect to *.pug view
//   try {
//     res.render("iframehost", {
//       title: "",
//       user: req.session.user,
//       serviceUrl: process.env.RENDER_SERVICE_URL || 'localhost'
//     });
//   } catch (error) {
//     console.error("iframehostController>Error", error);
//   }
// });


exports.index = asyncHandler(async (req, res, next) => {
  try {
    // 1. Properly define the user variable from the session
    const user = req.session.user;

    // 2. Safely log the email only if the user exists
    if (user) {
      console.log('saving session for user:', user.email);
    }
    console.log('session before save keys:', Object.keys(req.session));

    // 3. Render the view
    res.render("iframehost", {
      title: "",
      user: user, // Pass the defined variable here
      serviceUrl: process.env.RENDER_SERVICE_URL || 'https://localhost:3000'
    });
  } catch (error) {
    console.error("iframehostController>Error", error);
    next(error); // Pass the error to Express error handler
  }
});