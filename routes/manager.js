// routes/manager.js
var express = require('express');
var router = express.Router();
const managerController = require("../controllers/managerController");

router.get("/", managerController.index_get);
router.post("/backup", managerController.backup_post);
router.get("/reset-user-password", managerController.reset_user_password_get);
router.post("/scrape-pacs-post", managerController.scrape_pacs_post);
router.post("/upload-db-studies-post",managerController.upload_db_studies_post);
router.post("/exit-post", managerController.exit_post);

module.exports = router;