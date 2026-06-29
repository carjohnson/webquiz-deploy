var express = require('express');
var router = express.Router();

const backup_controller = require("../controllers/backupController");


router.get("/", backup_controller.segfile_get);


module.exports = router;