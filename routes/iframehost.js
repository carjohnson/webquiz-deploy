var express = require('express');
var router = express.Router();

const iframehost_controller = require("../controllers/iframehostController");


router.get("/", iframehost_controller.index);

router.get("/iframehost", iframehost_controller.index);


module.exports = router;