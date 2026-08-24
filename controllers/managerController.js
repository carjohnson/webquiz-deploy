// controllers/managerController.js
const asyncHandler = require("express-async-handler");
const backupService = require("../services/manager/backupService");
const restoreService = require("../services/manager/restoreService");
const userManagementService = require("../services/manager/userManagementService");
const { connectToModeDb } = require("../utils/dbConnection");
const { getBackupCollections } = require("../utils/backupDirUtils");
const Progress = require("../models/progress");
const {
    stageUploadedBackup,
    resolveStagedUploadDir,
    cleanupStagedUpload,
    } = require("../utils/restoreUpload");
const path = require("path");
const BACKUP_ROOT = path.join(process.cwd(),'backups');
const RESTORE_UPLOADS_ROOT = path.join(process.cwd(), 'restore-uploads');
const OUTPUTS_ROOT =  path.join(process.cwd(), 'outputs');
const RESTORE_LOGS_ROOT = path.join(process.cwd(), 'restoreLogs');

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
  try {
    const file = req.params.file;
    if (!file) {
      return res.status(400).send("Missing file name");
    }

    const zipPath = path.join(BACKUP_ROOT, file);

    return res.download(zipPath, file);
  } catch (err) {
    next(err);
  }
});

// =========================================================
exports.backup_post = asyncHandler(async (req, res, next) => {
  try {

    // Opportunistic cleanup: sweep old backups every time a new one is
    // about to run, rather than needing a separate scheduled job. Best-
    // effort — a cleanup failure here should never block the backup
    // that was actually requested.
    try {
      const removed = await backupService.cleanupBackups(BACKUP_ROOT);
      if (removed.length > 0) {
        console.log(`*** Cleaned up ${removed.length} old backup entr${removed.length === 1 ? 'y' : 'ies'}:`, removed);
      }
    } catch (cleanupErr) {
      console.log("*** Backup cleanup sweep failed (continuing with backup anyway):", cleanupErr.message);
    }

    const result = await backupService.runBackup(BACKUP_ROOT);
    
    const status =
      result.failCount > 0 ? "partial" : "success";
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
  // connect to *.pug view
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
 
  // uploadId is server-generated (see utils/restoreUpload.js) — never a
  // raw client-supplied path — so resolving it here is safe.
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
 
    const result = await restoreService.runRestore(stagingDir, envMode, OUTPUTS_ROOT, RESTORE_LOGS_ROOT);
 
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
// GET User Management (Combined Authorize & Reset Password)
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
// POST User Management Action Handler
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

    // Refresh user list so updated states (like authorized status) display immediately
    const updatedUsers = await userManagementService.getAllUsersFormatted();

    return res.render("manager/usermanagement", {
      title: "User Management",
      message: "Authorize users or reset user passwords.",
      users: updatedUsers,
      statusmessage: statusMsg,
      errmessage: null
    });

  } catch (err) {
    const allUsers = await userManagementService.getAllUsersFormatted();
    return res.render("manager/usermanagement", {
      title: "User Management",
      message: "Authorize users or reset user passwords.",
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
exports.scrape_pacs_post = asyncHandler(async (req, res, next) => {
    res.render("manager/manager", {
      title: "Management Functions",
      message: "Scrape PACS to get list of Dicom studies and series."
    });
});

// =========================================================
exports.upload_db_studies_post = asyncHandler(async (req, res, next) => {
    res.render("manager/manager", {
      title: "Management Functions",
      message: "Upload studies and series to be annotated to database."
    });
});

// =========================================================
exports.exit_post = asyncHandler(async (req, res, next) => {
  try {
    if (!req.session) {
      return res.redirect("/users/login");
    }

    req.session.destroy((err) => {
      if (err) return next(err);
      res.clearCookie("connect.sid");
      return res.redirect("/users/login");
    });
  } catch (error) {
    error.message = `managerController>exit_post: ${error.message}`;
    throw error;
  }
});