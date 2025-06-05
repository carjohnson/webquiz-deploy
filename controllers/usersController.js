const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

const bcrypt = require('bcrypt')
const users = require('../data').userDB;


exports.users_setup_get = asyncHandler(async (req, res, next) => {
  res.render("users_setup", {
    title: "Authorize User",
  });
});

exports.users_login_get = asyncHandler(async (req, res, next) => {
  res.render("users_login", {
    title: "Login",
  });
});

exports.users_register_get = asyncHandler(async (req, res, next) => {
  res.render("users_register", {
    title: "Register",
  });
});

exports.users_register_post = asyncHandler(async (req, res, next) => {

      try{
        console.log(__dirname);
        let foundUser = users.find((data) => req.body.email === data.email);
        if (!foundUser) {
    
            let hashPassword = await bcrypt.hash(req.body.password, 10);
    
            let newUser = {
                id: Date.now(),
                username: req.body.username,
                email: req.body.email,
                password: hashPassword,
            };
            users.push(newUser);
            console.log('User list', users);
    
            res.send("<div align ='center'><h2>Registration successful</h2></div><br><br><div align='center'><a href='/users/users_login'>login</a></div><br><br><div align='center'><a href='/users/users_register.html'>Register another user</a></div>");
          } else {
            res.send("<div align ='center'><h2>Email already used</h2></div><br><br><div align='center'><a href='/users/users_register'>Register again</a></div>");
        }
    } catch{
        res.send("Internal server error");
    }
});

exports.users_login_post = asyncHandler(async (req, res, next) => {
    try{
        let foundUser = users.find((data) => req.body.email === data.email);
        if (foundUser) {
    
            let submittedPass = req.body.password; 
            let storedPass = foundUser.password; 
    
            const passwordMatch = await bcrypt.compare(submittedPass, storedPass);
            if (passwordMatch) {
                let usrname = foundUser.username;
                // res.send(`<div align ='center'><h2>login successful</h2></div><br><br><br><div align ='center'><h3>Hello ${usrname}</h3></div><br><br><div align='center'><a href='/users/users_login'>logout</a></div>`);
                res.redirect('/webquiz');
            } else {
                res.send("<div align ='center'><h2>Invalid email or password</h2></div><br><br><div align ='center'><a href='/users/users_login'>login again</a></div>");
            }
        }
        else {
    
            let fakePass = `$2b$$10$ifgfgfgfgfgfgfggfgfgfggggfgfgfga`;
            await bcrypt.compare(req.body.password, fakePass);
    
            res.send("<div align ='center'><h2>Invalid email or password</h2></div><br><br><div align='center'><a href='/users/users_login'>login again<a><div>");
        }
    } catch{
        res.send("Internal server error");
    }
}); 