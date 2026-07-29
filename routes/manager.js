// routes/manager.js
var express = require('express');
var router = express.Router();
const managerController = require("../controllers/managerController");

router.get("/", managerController.index_get);

router.get("/backup", managerController.backup_get);
router.post("/backup", managerController.backup_post);
router.get("/backup/download/:file", managerController.backup_download);

router.get("/restore", managerController.restore_get);
router.post("/restore", managerController.restore_post);

router.get("/reset-user-password", managerController.reset_user_password_get);
router.post("/reset-user-password", managerController.reset_user_password_post);

router.post("/scrape-pacs-post", managerController.scrape_pacs_post);
router.post("/upload-db-studies-post",managerController.upload_db_studies_post);
router.post("/exit-post", managerController.exit_post);

module.exports = router;