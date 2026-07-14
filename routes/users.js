var express = require('express');
var router = express.Router();

const users_controller = require("../controllers/usersController");


router.get("/login", users_controller.login_get);

router.post('/login', users_controller.login_post);

router.get("/register", users_controller.register_get);

router.post('/register', users_controller.register_post);

router.get("/logout", users_controller.logout_get);

router.get("/about", users_controller.about_get);

router.get("/session-info", users_controller.sessioninfo_get);

router.post("/session-study", users_controller.sessionstudy_post);


module.exports = router;