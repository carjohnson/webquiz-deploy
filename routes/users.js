var express = require('express');
var router = express.Router();

const users_controller = require("../controllers/usersController");


router.get("/", users_controller.users_setup_get);

router.get("/users_login", users_controller.users_login_get);

router.get("/users_register", users_controller.users_register_get);

// router.post('/register', users_controller.register_post);

// router.post('/login', users_controller.login_post);

module.exports = router;