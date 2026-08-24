// routes/manager.js
var express = require('express');
var router = express.Router();
const multer = require("multer");
const managerController = require("../controllers/managerController");

// Buffer stays in memory only long enough to extract it — never written
// to disk as a .zip, only the extracted contents are. Adjust fileSize
// to whatever your largest realistic backup is.
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 500 * 1024 * 1024 }, // 500MB
});


router.get("/", managerController.index_get);

router.get("/backup", managerController.backup_get);
router.post("/backup", managerController.backup_post);
router.get("/backup/download/:file", managerController.backup_download);

router.get("/restore", managerController.restore_get);
router.post("/restore/upload", upload.single("backupZip"), managerController.restore_upload_backup);
router.post("/restore/upload/:uploadId/cancel", managerController.restore_cancel_upload);
router.post("/restore", managerController.restore_post);

router.get("/report-progress", managerController.report_progress_get);
router.get("/report-progress/data", managerController.report_progress_data_get);

router.get("/reset-user-password", managerController.reset_user_password_get);
router.post("/reset-user-password", managerController.reset_user_password_post);

router.post("/upload-pacs-folder-post",managerController.upload_pacs_folder_post);
router.post("/scrape-pacs-post", managerController.scrape_pacs_post);
router.post("/upload-db-studies-post",managerController.upload_db_studies_post);

router.post("/exit-post", managerController.exit_post);

module.exports = router;