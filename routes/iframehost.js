var express = require('express');
var router = express.Router();

const iframehost_controller = require("../controllers/iframehostController");
const { requireLogin, requireRole } = require('../middleware/auth');

// Every /iframehost route requires an authenticated user with the
// 'admin' or 'reader' role. Managers are handled entirely under /manager.
router.use(requireLogin, requireRole("admin", "reader"));

router.get('/', iframehost_controller.index);

module.exports = router;
