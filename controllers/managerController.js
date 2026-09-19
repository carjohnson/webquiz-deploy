// controllers/managerController.js
const asyncHandler = require("express-async-handler");
const backupService = require("../services/manager/backupService");
const restoreService = require("../services/manager/restoreService");
const userManagementService = require("../services/manager/userManagementService");
const pacsScrapeService = require("../services/manager/pacsScrapeService");
const deletePacsService = require("../services/manager/deletePacsService");
const { connectToModeDb } = require("../utils/dbConnection");
const { getBackupCollections, cleanupWorkDir } = require("../utils/dirUtils");
const Progress = require("../models/progress");
const {
    stageUploadedBackup,
    resolveStagedUploadDir,
    cleanupStagedUpload,
} = require("../utils/restoreUpload");
const path = require("path");

// outputs dir for segmentation files 
const OUTPUTS_SEGFILES_ROOT = path.join(process.cwd(), 'outputs');

// All manager-task working directories live under this one parent so they
// don't get mixed in with the rest of the backend server's own directories.
const MANAGEMENT_WORK_ROOT = path.join(process.cwd(), 'management-work');

const BACKUP_ROOT = path.join(MANAGEMENT_WORK_ROOT, 'backups');
const RESTORE_UPLOADS_ROOT = path.join(MANAGEMENT_WORK_ROOT, 'restore-uploads');
const PACS_SCRAPE_ROOT = path.join(MANAGEMENT_WORK_ROOT, 'pacs-scrape');
// Shared run-log directory — used by restore and, now, the PACS scrape.
const LOGS_ROOT = path.join(MANAGEMENT_WORK_ROOT, 'logs');

// =========================================================
exports.index_get = asyncHandler(async (req, res, next) => {
  res.render("manager/manager", {
    title: "Management Tasks",
    message: ""
  });
});

// =========================================================
exports.backup_get = asyncHandler(async (req, res, next) => {
  // connect to *.pug view
  const envMode = process.env.NODE_ENV;
  res.render("manager/backup", {
    title: "Backup Database",
    message: `for ${envMode}`
  });
});

// =========================================================
/**
 * Backup download files are zipped and placed in the BACKUP_ROOT directory
 *  - currently at the backend server's disk in a folder name 'backups'
 */
exports.backup_download = asyncHandler(async (req, res, next) => {
    const file = req.params.file;
    if (!file) {
      return res.status(400).send("Missing file name");
    }

    const zipPath = path.join(BACKUP_ROOT, file);
    return res.download(zipPath, file);
});

// =========================================================
exports.backup_post = asyncHandler(async (req, res, next) => {
  try {

    // Opportunistic cleanup: sweep old backups every time a new one is
    // about to run, rather than needing a separate scheduled job. Best-
    // effort — a cleanup failure here should never block the backup
    // that was actually requested.
    
    //  A backup produces two sibling entries per run under outputDir: the
    //  raw timestamped folder (e.g. "2026-08-07_19-27-01/") and its zip
    //  (e.g. "2026-08-07_19-27-01.zip"). Both are removed once past


    try {
      // BACKUP_FILE_ENTRY_RE matches getStamp()'s format exactly: YYYY-MM-DD_HH-MM-SS, optionally
      // with a .zip extension. cleanupBackups only ever touches entries that
      // match this — anything else dropped into BACKUP_ROOT (by hand, or by
      // something else entirely) is left alone rather than swept up by a
      // recursive delete.

      const BACKUP_FILE_ENTRY_RE = /^\d{4}-\d{2}-\d{2}_\d{2}-\d{2}-\d{2}(\.zip)?$/;
      const removed = await cleanupWorkDir(BACKUP_ROOT, BACKUP_FILE_ENTRY_RE);
      if (removed.length > 0) {
        console.log(`*** Cleaned up ${removed.length} old backup entr${removed.length === 1 ? 'y' : 'ies'}:`, removed);
      }
    } catch (cleanupErr) {
      console.log("*** Backup cleanup sweep failed (continuing with backup anyway):", cleanupErr.message);
    }

    const result = await backupService.runBackup(BACKUP_ROOT);
    
    const status = result.failCount > 0 ? "partial" : "success";
      let zipFileName = null;

    if (status === "success") {
        const zipPath = `${result.backupDir}.zip`;
        await backupService.zipDirectory(result.backupDir, zipPath);
        zipFileName = path.basename(zipPath);
    }

    res.render("manager/backupstatus", {
      title: "Backup Status",
      status,
      backupDir: result.backupDir,
      logFile: result.logFile,
      successCount: result.successCount,
      failCount: result.failCount,
      failures: result.failures,
      zipFileName,
      error: null,
    });

  } catch (err) {
    // Render error view for user-facing status feedback
    res.render("manager/backupstatus", {
      title: "Backup Status",
      status: "error",
      error: err.message,
      failures: [],
      zipFileName: null,
    });
  }
});

// =========================================================
exports.restore_get = asyncHandler(async (req, res, next) => {
  const envMode = process.env.NODE_ENV;
 
  res.render('manager/restore', {
    title: 'Restore Database',
    message: `for ${envMode}`,
    errmessage: null,
  });
});

// =========================================================

// Handles the uploaded backup zip (multer middleware puts the file on
// req.file as a buffer — see router wiring). Extracts it into a fresh
// server-side staging directory under RESTORE_UPLOADS_ROOT and returns
// the collections found (from *-collection.json filenames), along with
// an uploadId the client echoes back on Run.
// POST /manager/restore/upload  (multipart/form-data, field "backupZip")
exports.restore_upload_backup = asyncHandler(async (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({ ok: false, error: "No file uploaded." });
  }
  if (!req.file.originalname.toLowerCase().endsWith(".zip")) {
    return res.status(400).json({ ok: false, error: "Please upload a .zip file." });
  }
 
  let uploadId;
  try {
    const staged = stageUploadedBackup(req.file.buffer, RESTORE_UPLOADS_ROOT);
    uploadId = staged.uploadId;
 
    const backupCollections = getBackupCollections(staged.stagingDir);
 
    if (backupCollections.length === 0) {
      cleanupStagedUpload(uploadId, RESTORE_UPLOADS_ROOT);
      return res.status(400).json({ ok: false, error: "No collections found in that backup. (Files cannot be in a subfolder.)" });
    }
 
    res.json({ ok: true, uploadId, backupCollections });
  } catch (err) {
    if (uploadId) cleanupStagedUpload(uploadId, RESTORE_UPLOADS_ROOT);
    res.status(400).json({ ok: false, error: err.message });
  }
});
 
// ============================================================
// Called when a staged upload is abandoned — either the user clicks
// Return without running the restore, or they pick a different file
// before running it (superseding the first one). uploadId is validated
// by cleanupStagedUpload itself (via resolveStagedUploadDir's UUID
// check), so an invalid/unknown/already-removed id is just a safe
// no-op — the client fires this best-effort via navigator.sendBeacon
// on navigation, so there's no meaningful error to report back anyway.
//
// POST /manager/restore/upload/:uploadId/cancel
exports.restore_cancel_upload = asyncHandler(async (req, res, next) => {
  const { uploadId } = req.params;
  cleanupStagedUpload(uploadId, RESTORE_UPLOADS_ROOT);
  res.status(204).end();
});
 
// =========================================================
exports.restore_post = asyncHandler(async (req, res, next) => {
  const { uploadId } = req.body;
  const stagingDir = resolveStagedUploadDir(uploadId, RESTORE_UPLOADS_ROOT);
 
  if (!stagingDir) {
    return res.render("manager/restorestatus", {
      title: "Restore Status",
      status: "error",
      error: "Backup upload not found or expired. Please upload it again.",
    });
  }
 
  try {
    const envMode = process.env.NODE_ENV;
    const result = await restoreService.runRestore(stagingDir, envMode, OUTPUTS_SEGFILES_ROOT, LOGS_ROOT);
    const status = result.failCount > 0 ? "partial" : "success";
 
    res.render("manager/restorestatus", {
      title: "Restore Status",
      status,
      stagingDir: result.stagingDir,
      logFile: result.logFile,
      successCountSegFiles: result.successCountSegFiles,
      successCountDBCollections: result.successCountDBCollections,
      totalDBCollections: result.totalDBCollections,
      totalSegFiles: result.totalSegFiles,
      failCount: result.failCount,
      failures: result.failures
    });
 
  } catch (err) {
      res.render("manager/restorestatus", {
        title: "Restore Status",
        status: "error",
        error: err.message
      });
    } finally {
      // Staged upload is single-use: clean it up whether the restore
      // succeeded or failed.
      cleanupStagedUpload(uploadId, RESTORE_UPLOADS_ROOT);
    }
});

// =========================================================
exports.manage_user_get = asyncHandler(async (req, res, next) => {
  const allUsers = await userManagementService.getAllUsersFormatted();

  res.render("manager/usermanagement", {
    title: "User Management",
    message: "Authorize users or reset user passwords.",
    users: allUsers,
    errmessage: null,
    statusmessage: null
  });
});

// =========================================================
exports.manage_user_post = asyncHandler(async (req, res, next) => {
  try {
    const { userName, newPassword, action } = req.body;
    let statusMsg = "";

    if (action === "authorize") {
      const result = await userManagementService.runAuthorizeUser(userName);
      if (!result) throw new Error(`Failed to authorize user '${userName}'.`);
      statusMsg = `User '${userName}' was successfully authorized.`;
    } 
    else if (action === "reset_password") {
      if (!newPassword || !newPassword.trim()) {
        const allUsers = await userManagementService.getAllUsersFormatted();
        return res.render("manager/usermanagement", {
          title: "User Management",
          message: "Authorize users or reset user passwords.",
          errmessage: "Please provide a new password before clicking Reset Password.",
          statusmessage: null,
          users: allUsers
        });
      }

      const result = await userManagementService.runResetPasswordByUsername(userName, newPassword);
      if (!result) throw new Error(`Failed to reset password for user '${userName}'.`);
      statusMsg = `Password for user '${userName}' was reset successfully.`;
    }
    else if (action === "transfer_to_manager") {
      const result = await userManagementService.runTransferToManager(userName);
      if (!result) throw new Error(`Failed to transfer user to manager role '${userName}'.`);
      statusMsg = `User '${userName}' was successfully transfered to manager role.`;
    }
    else if (action === "assign_to_admin") {
      const result = await userManagementService.runAssignToAdmin(userName);
      if (!result) throw new Error(`Failed to assign user to admin role '${userName}'.`);
      statusMsg = `User '${userName}' was successfully assigned to admin role.`;
    }

    const updatedUsers = await userManagementService.getAllUsersFormatted();

    return res.render("manager/usermanagement", {
      title: "User Management",
      message: "Authorize users, reset user password or transfer to Manager role.",
      users: updatedUsers,
      statusmessage: statusMsg,
      errmessage: null
    });

  } catch (err) {
    const allUsers = await userManagementService.getAllUsersFormatted();
    return res.render("manager/usermanagement", {
      title: "User Management",
      message: "Authorize users, reset user password or transfer to Manager role.",
      errmessage: err.message,
      statusmessage: null,
      users: allUsers
    });
  }
});

// =========================================================
exports.report_progress_get = asyncHandler(async (req, res, next) => {
  const rows = await Progress.aggregate([
    // Join user
    {
      $lookup: {
        from: "user",
        localField: "user_id",
        foreignField: "_id",
        as: "user"
      }
    },
    { $unwind: "$user" },

    // Join study
    {
      $lookup: {
        from: "study",
        localField: "study_id",
        foreignField: "_id",
        as: "study"
      }
    },
    { $unwind: "$study" },

    // Group by study, pivot users
    {
      $group: {
        _id: "$study._id",
        studyUID: { $first: "$study.studyUID" },
        studyName: { $first: "$study.studyName" },
        statuses: {
          $push: {
            username: "$user.username",
            studyStatus: "$study_status"
          }
        }
      }
    },

    // Sort by study name
    { $sort: { studyName: 1 } }
  ]);

  const allUsers = [
    ...new Set(
      rows.flatMap(r => r.statuses.map(s => s.username))
    )
  ].sort();

  res.render("manager/reportprogress", {
    title: "Management Functions",
    message: "Report user/study progress",
    rows,
    allUsers
  });
});

// =========================================================
exports.upload_pacs_folder_post = asyncHandler(async (req, res, next) => {
    res.render("manager/manager", {
      title: "Management Functions",
      message: "Upload folder to Orthanc PACS."
    });
});

// =========================================================
exports.scrape_pacs_get = asyncHandler(async (req, res, next) => {
  // connect to *.pug view
  const envMode = process.env.NODE_ENV;
  res.render("manager/scrapepacs", {
    title: "Scrape PACS for dicom metadata",
    message: `for ${envMode}`
  });
});

// =========================================================
/**
 * The extracted .xlsx (dicom_index_<timestamp>.xlsx) is written to
 * PACS_SCRAPE_ROOT, same disk-based download pattern as backup_download.
 */
exports.scrape_download = asyncHandler(async (req, res, next) => {
    const file = req.params.file;
    if (!file) {
      return res.status(400).send("Missing file name");
    }

    const filePath = path.join(PACS_SCRAPE_ROOT, file);
    return res.download(filePath, file);
});

// =========================================================
exports.scrape_pacs_post = asyncHandler(async (req, res, next) => {
  try {

    // Opportunistic cleanup: sweep old backups every time a new one is
    // about to run, rather than needing a separate scheduled job. Best-
    // effort — a cleanup failure here should never block the backup
    // that was actually requested.
    try {
      const SCRAPE_ENTRY_RE = /^dicom_index_\d{4}-\d{2}-\d{2}_\d{2}-\d{2}-\d{2}\.xlsx$/;
      const removed = await cleanupWorkDir(PACS_SCRAPE_ROOT, SCRAPE_ENTRY_RE);
      if (removed.length > 0) {
        console.log(`*** Cleaned up ${removed.length} old scraped PACS file entr${removed.length === 1 ? 'y' : 'ies'}:`, removed);
      }
    } catch (cleanupErr) {
      console.log("*** Scrape PACS files cleanup sweep failed (continuing with scrape PACS anyway):", cleanupErr.message);
    }


    const result = await pacsScrapeService.scrapePacs(PACS_SCRAPE_ROOT, LOGS_ROOT);
    const status = result.failCount > 0 ? "partial" : "success";

    res.render("manager/scrapestatus", {
      title: "PACS Scrape Status",
      status,
      studyCount: result.studyCount,
      successCount: result.successCount,
      failCount: result.failCount,
      failures: result.failures,
      outputFileName: result.outputFileName,
      logFile: result.logFile,
      error: null,
    });

  } catch (err) {
    res.render("manager/scrapestatus", {
      title: "PACS Scrape Status",
      status: "error",
      error: err.message,
      failures: [],
      outputFileName: null,
    });
  }
});

// =========================================================
exports.upload_db_studies_post = asyncHandler(async (req, res, next) => {
    res.render("manager/manager", {
      title: "Management Functions",
      message: "Upload studies and series to be annotated to database."
    });
});

// =========================================================
exports.delete_pacs_get = asyncHandler(async (req, res, next) => {
  // connect to *.pug view
  const envMode = process.env.NODE_ENV;
  res.render("manager/deletepacs", {
    title: "Delete all studies in PACS",
    message: `for ${envMode}`,
    errmessage: null,
  });
});

// =========================================================
exports.delete_pacs_post = asyncHandler(async (req, res, next) => {
  // Checkboxes only appear in req.body when checked (value "on"); anything
  // else (missing, "off", etc.) is treated as false. Never trust the
  // client's disabled-button gate alone — re-validate here.
  const confirm = req.body.confirm === "on";
  const dryRun = req.body.dryRun === "on";

  if (!confirm) {
    return res.render("manager/deletepacs", {
      title: "Delete all studies in PACS",
      message: null,
      errmessage: "You must check the confirmation box before running this operation.",
    });
  }

  try {
    const result = await deletePacsService.deleteAllStudies(LOGS_ROOT, { confirm, dryRun });
    const status = result.failCount > 0 ? "partial" : "success";

    res.render("manager/deletepacsstatus", {
      title: "PACS Delete Status",
      status,
      dryRun: result.dryRun,
      studyCount: result.studyCount,
      successCount: result.successCount,
      failCount: result.failCount,
      failures: result.failures,
      logFile: result.logFile,
      error: null,
    });

  } catch (err) {
    res.render("manager/deletepacsstatus", {
      title: "PACS Delete Status",
      status: "error",
      dryRun,
      error: err.message,
      failures: [],
      studyCount: null,
      successCount: null,
      failCount: null,
      logFile: null,
    });
  }
});

// =========================================================
exports.exit_post = asyncHandler(async (req, res, next) => {
    if (!req.session) {
      return res.redirect("/users/login");
    }

    req.session.destroy((err) => {
      if (err) return next(err);
      res.clearCookie("connect.sid");
      return res.redirect("/users/login");
    });
});