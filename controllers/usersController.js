const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

const bcrypt = require('bcrypt')
const User = require("../models/user");


// exports.authorize_get = asyncHandler(async (req, res, next) => {
//   res.render("authorize", {
//     title: "Authorize User",
//   });
// });

exports.login_get = asyncHandler(async (req, res, next) => {
  res.render("login", {
    title : "Login",
    msg   : req.query.msg,
  });
});

exports.register_get = asyncHandler(async (req, res, next) => {
  res.render("register", {
    title : "Register",
    msg   : req.query.msg,
  });
});

exports.register_post = asyncHandler(async (req, res, next) => {
  
      try{

        const userExists = await User.find({username: req.body.username})
            .collation({ locale: "en", strength: 2 })
            .exec();

          if(userExists.length === 0){

            hashPassword = await bcrypt.hash(req.body.password, 10);

            const newUser = new User({
              username    : req.body.username.trim().toLowerCase(),
              password    : hashPassword,
              email       : req.body.email.trim().toLowerCase(),
            });

            await newUser.save();
            res.redirect('/users/login?msg=Account created!');
            // res.send("<div align ='center'><h2>Registration successful</h2></div><br><br><div align='center'><a href='/users/login'>login</a></div><br><br><div align='center'><a href='/users/register'>Register another user</a></div>");
            
          } else {
            res.redirect('/users/register?msg=Username Unavailable');
            //res.send("<div align ='center'><h2>Username already used</h2></div><br><br><div align='center'><a href='/users/register'>Register again</a></div>");
          }

    } catch (error) {
        console.error("Error:", error);
        res.send("Internal server error");
    }
});

exports.login_post = asyncHandler(async (req, res, next) => {
    try{
          const userExists = await User.find({email: req.body.email.toLowerCase().trim()})
          .collation({ locale: "en", strength: 2 })
          .exec();

        if(userExists.length){

            let submittedPass = req.body.password
            let storedPass = userExists[0].password; 
    
            const passwordMatch = await bcrypt.compare(submittedPass, storedPass);
            if (passwordMatch) {
                // let usrname = foundUser.username;
                // res.send(`<div align ='center'><h2>login successful</h2></div><br><br><br><div align ='center'><h3>Hello ${usrname}</h3></div><br><br><div align='center'><a href='/users/login'>logout</a></div>`);
                res.redirect('/webquiz');
            } else {
                res.redirect('/users/login?msg=Invalid email or password');
                // res.send("<div align ='center'><h2>Invalid email or password</h2></div><br><br><div align ='center'><a href='/users/login'>login again</a></div>");
            }
        }
        else {
    
            let fakePass = `$2b$$10$ifgfgfgfgfgfgfggfgfgfggggfgfgfga`;
            await bcrypt.compare(req.body.password, fakePass);
    
            res.redirect('/users/login?msg=Invalid email or password');
            // res.send("<div align ='center'><h2>Invalid email or password</h2></div><br><br><div align='center'><a href='/users/login'>login again<a><div>");
        }
    } catch (error) {
        console.error("Error:", error);
        res.send("Internal server error");
    }
}); 