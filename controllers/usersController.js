const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

const bcrypt = require('bcrypt')
const User = require("../models/user");


exports.login_get = asyncHandler(async (req, res, next) => {
  // connect to *.pug view
  res.render("login", {
    title : "Login",
    msg   : req.query.msg,
  });
});

exports.register_get = asyncHandler(async (req, res, next) => {
  // connect to *.pug view
  res.render("register", {
    title : "Register",
    msg   : req.query.msg,
  });
});

exports.register_post = asyncHandler(async (req, res, next) => {
  
      try{
        const { username, email, password, role } = req.body;

        // Validate role
        if (!['reader', 'admin'].includes(role)) {
          return res.status(400).send('Invalid role selected');
        }

        const userExists = await User.find({username: username})
            .collation({ locale: "en", strength: 2 })
            .exec();

          if(userExists.length === 0){

            hashPassword = await bcrypt.hash(password, 10);

            const newUser = new User({
              username    : username.trim().toLowerCase(),
              password    : hashPassword,
              email       : email.trim().toLowerCase(),
              role        : role,
            });

            await newUser.save();
            res.redirect('/users/login?msg=Account created!');
            
          } else {
            res.redirect('/users/register?msg=Username Unavailable');
          }

    } catch (error) {
        console.error("Error:", error);
        res.send("usersController>register_post : Internal server error");
    }
});

exports.login_post = asyncHandler(async (req, res, next) => {
    try{
          const { email, password } = req.body;

          const userExists = await User.find({email: email.toLowerCase().trim()})
          .collation({ locale: "en", strength: 2 })
          .exec();

        if(userExists.length){

            let submittedPass = password
            let storedPass = userExists[0].password; 
    
            const passwordMatch = await bcrypt.compare(submittedPass, storedPass);
            if (passwordMatch) {
                
                res.redirect('/iframehost');

            } else {
                res.redirect('/users/login?msg=Invalid email or password');
            }
        }
        else {
    
            let fakePass = `$2b$$10$ifgfgfgfgfgfgfggfgfgfggggfgfgfga`;
            await bcrypt.compare(password, fakePass);
    
            res.redirect('/users/login?msg=Invalid email or password');
        }
    } catch (error) {
        console.error("Error:", error);
        res.send("usersController>login_post : Internal server error");
    }
}); 