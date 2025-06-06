var express = require('express');
var router = express.Router();

const users_controller = require("../controllers/usersController");


router.get("/", users_controller.authorize_get);

router.get("/login", users_controller.login_get);

router.post('/login', users_controller.login_post);

router.get("/register", users_controller.register_get);

router.post('/register', users_controller.register_post);


module.exports = router;