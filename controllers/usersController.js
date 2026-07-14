const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const Progress = require('../models/progress');
const Study = require("../models/study");


const bcrypt = require('bcrypt')
const User = require("../models/user");


//=========================================================
exports.login_get = asyncHandler(async (req, res, next) => {
  // connect to *.pug view
  res.render("login", {
    title : "Login",
    msg   : req.query.msg,
  });
});

//=========================================================
exports.register_get = asyncHandler(async (req, res, next) => {
  // connect to *.pug view
  res.render("register", {
    title : "Register",
    msg   : req.query.msg,
  });
});

//=========================================================
exports.register_post = asyncHandler(async (req, res, next) => {
  
      try{
        const { username, email, password } = req.body;

        const userExists = await User.find({username: username})
            .collation({ locale: "en", strength: 2 })
            .exec();

          if(userExists.length === 0){

            hashPassword = await bcrypt.hash(password, 10);

            const newUser = new User({
              username    : username.trim().toLowerCase(),
              password    : hashPassword,
              email       : email.trim().toLowerCase(),
              authorized  : false,
            });

            await newUser.save();
            res.redirect('/users/login?msg=Account created! Please contact the administrator for authorization.');
            
          } else {
            res.redirect('/users/register?msg=Username Unavailable');
          }
    } catch (error) {
      if (error.name === 'ValidationError') {
        const errors = Object.values(error.errors).map(err => err.message).join(', ');
        return res.render('register', { msg: errors, formData: req.body });
      }
      error.message = `usersController>register_post: ${error.message}`;
      throw error; 
    }
  });

//=========================================================
exports.login_post = asyncHandler(async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const userExists = await User.find({ email: email.toLowerCase().trim() })
      .collation({ locale: "en", strength: 2 })
      .exec();

    if (userExists.length) {
      const user = userExists[0];
      const storedPass = user.password;

      const passwordMatch = await bcrypt.compare(password, storedPass);

      if (passwordMatch) {
        if (!user.authorized) {
          return res.redirect(
            "/users/login?msg=Your account is not authorized. Please contact your administrator for authorization."
          );
        }

        req.session.user = user;

        return req.session.save((err) => {
          if (err) return next(err);
          if (user.role !== 'manager') {
          console.log("session saved, redirecting to iframehost");
          res.redirect("/iframehost");
          } else {
          console.log("session saved, redirecting to manager dashboard");
          res.redirect("/manager");
          }
        });
      }
    } else {
      const fakePass = "$2b$$10$ifgfgfgfgfgfgfggfgfgfggggfgfgfga";
      await bcrypt.compare(password, fakePass);
      return res.redirect("/users/login?msg=Invalid email or password");
    }

    return res.redirect("/users/login?msg=Invalid email or password");
  } catch (error) {
    error.message = `usersController>login_post: ${error.message}`;
    throw error;
  }
});


//=========================================================
exports.logout_get = asyncHandler(async (req,res,next) => {
  try {
    // log the date/time that the user is logging out
    const userId = req.session?.userId || req.session?.user?._id;
    const studyUID = req.session?.studyUID;
    const study = await Study.findOne({ studyUID });
    

    if (userId && studyUID) {
      await Progress.findOneAndUpdate(
        { user_id: userId, study_id: study._id },
        {
          $push: {
            closed_events: {
              closed_at: new Date(),
              close_method: 'logout',
            },
          },
          $set: {
            updated_at: new Date(),
          },
        },
        { new: true }
      );
    }

    req.session.destroy(() => {
      res.render('logout', {message: "Thank you for participating!"});
    });

  } catch (error) {
    error.message = `usersController>logout_get: ${error.message}`;
    throw error; 
  }

});

//=========================================================
exports.about_get = asyncHandler(async (req,res,next) => {
  try {
    res.render('about');
  } catch (error) {
    error.message = `usersController>about_get: ${error.message}`;
    throw error; 
  }

});



//=========================================================
exports.sessioninfo_get = asyncHandler(async (req, res, next) => {
  try {
    if (req.session && req.session.user) {
      res.json(req.session.user);
    } else {
      res.status(401).json({ error: 'Not logged in' });
    }
  } catch (error) {
    error.message = `usersController>sessioninfo_get: ${error.message}`;
    throw error; // asyncHandler will pass this to your global error handler (catch 500 in app.js)
  }
});

//=========================================================
// add the studyUID to the session
exports.sessionstudy_post = asyncHandler(async (req, res, next) => {
  try {
    const { studyUID } = req.body;

    if (!studyUID) {
      return res.status(400).json({ error: 'studyUID is required' });
    }

    req.session.studyUID = studyUID;

    return res.status(200).json({
      ok: true,
      studyUID: req.session.studyUID,
    });
  } catch (error) {
    error.message = `usersController>sessionstudy_post: ${error.message}`;
    throw error;
  }
});