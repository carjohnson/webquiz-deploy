var express = require('express');
var router = express.Router();

const iframehost_controller = require("../controllers/iframehostController");
const { requireLogin } = require('../middleware/auth');

router.get('/', requireLogin, iframehost_controller.index);

module.exports = router;