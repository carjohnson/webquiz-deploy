const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");


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