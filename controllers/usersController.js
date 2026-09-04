const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const Progress = require('../models/progress');
const Study = require("../models/study");
const bcrypt = require('bcrypt');
const User = require("../models/user");

//=========================================================
exports.login_get = asyncHandler(async (req, res, next) => {
  // connect to *.pug view
  res.render("login", {
    title: "Login",
    msg: req.query.msg,
  });
});

//=========================================================
exports.register_get = asyncHandler(async (req, res, next) => {
  // connect to *.pug view
  res.render("register", {
    title: "Register",
    msg: req.query.msg,
  });
});

//=========================================================
exports.register_post = asyncHandler(async (req, res, next) => {
        const { username, email, password } = req.body;

  const userExists = await User.find({ username: username })
            .collation({ locale: "en", strength: 2 })
            .exec();

  if (userExists.length === 0) {
    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username: username.trim().toLowerCase(),
      password: hashPassword,
      email: email.trim().toLowerCase(),
      authorized: false,
      });

    await newUser.save();
        res.redirect('/users/login?msg=Account created! Please contact the administrator for authorization.');
      } else {
        res.redirect('/users/register?msg=Username unavailable');
      }
});

//=========================================================
exports.login_post = asyncHandler(async (req, res, next) => {
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
            res.redirect("/iframehost");
          } else {
            res.redirect("/manager");
          }
        });
      }
    } else {
      const fakePass = "$2b$10$C/7y1VOyBQfMeQiSykkAvOPWZ8kVJ3fP1CfSktBw2CFseuziGGpuS";
      await bcrypt.compare(password, fakePass);
      return res.redirect("/users/login?msg=Invalid email or password");
    }

    return res.redirect("/users/login?msg=Invalid email or password");
});

//=========================================================
exports.logout_get = asyncHandler(async (req, res, next) => {
  const userId = req.session?.userId || req.session?.user?._id;
  const studyUID = req.session?.studyUID;

  let studyErrorOccurred = false;

  if (userId && studyUID) {
    const studyInDB = await Study.findOne({ studyUID });
    const userInDB = await User.findOne({ _id: userId });

    if (userInDB && studyInDB) {
      // Record standard 'close' event in Progress document
      await Progress.findOneAndUpdate(
        { user_id: userInDB._id, study_id: studyInDB._id },
        {
          $push: {
            timed_events: {
              event: 'close',
              occurred_at: new Date(),
              method: 'logout',
            },
          },
          $set: { updated_at: new Date() },
        },
        { new: true }
      );
    } else {
      // Flag that study or user record was missing/invalid
      studyErrorOccurred = true;
    }
  } else if (studyUID && !userId) {
    // Flag if session had a studyUID but no user session context
    studyErrorOccurred = true;
  }

  // Define user-facing feedback messages
  const message = "Thank you for participating!";
  const errorMessage = studyErrorOccurred
    ? "An issue was detected with your session study record during logout. If you were working on a study, please notify your administrator."
    : null;

  // Always tear down session and clear cookie
  if (req.session) {
    req.session.destroy((err) => {
      if (err) return next(err);

      res.clearCookie('connect.sid');
      return res.render('logout', { 
        message, 
        errorMessage, 
        hasError: studyErrorOccurred 
      });
    });
  } else {
    res.clearCookie('connect.sid');
    return res.render('logout', { 
      message, 
      errorMessage, 
      hasError: studyErrorOccurred 
    });
  }
});

//=========================================================
exports.about_get = asyncHandler(async (req, res, next) => {
    res.render('about');
});

//=========================================================
exports.sessioninfo_get = asyncHandler(async (req, res, next) => {
    if (req.session && req.session.user) {
      const sessionUser = req.session.user;

      const safeUserInfo = {
        username: sessionUser.username,
        role: sessionUser.role,
    };
      res.json(safeUserInfo);
    } else {
      res.status(401).json({ error: 'Not logged in' });
    }
});

//=========================================================
// add the studyUID to the session
exports.sessionstudy_post = asyncHandler(async (req, res, next) => {
    const { studyUID } = req.body;

    if (!studyUID) {
      return res.status(400).json({ error: 'studyUID is required' });
    }

    req.session.studyUID = studyUID;

    return res.status(200).json({
      ok: true,
      studyUID: req.session.studyUID,
    });
});