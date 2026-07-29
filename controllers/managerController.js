const asyncHandler = require("express-async-handler");
const backupService = require("../services/manager/backupService");
const userManagementService = require("../services/manager/userManagementService");
const path = require("path");
const BACKUP_ROOT = path.join(process.cwd(),'backups');



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
  res.render("manager/backup", {
    title: "Backup Database",
    message: ""
  });

});

// =========================================================
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
  const mode = req.app.locals.envMode;
  const config = getRuntimeConfig(mode);
  res.render('manager/restore', {
    title: 'Restore Database',
    message: `for ${mode}`,
    errmessage: null,
    dbCollections: config.dbCollections,
  });

});

// =========================================================
exports.restore_post = asyncHandler(async (req, res, next) => {
  try {
    const mode = req.app.locals.envMode;
    const { backupDir, restoreActions } = req.body;

    let collections = req.body.collections || [];

    if (!Array.isArray(collections)) {
    collections = [collections];
    }

    const result = await restoreController.runRestore(backupDir, mode, collections, restoreActions);

    const status = result.failCount > 0 ? "partial" : "success";

    res.render("manager/restorestatus", {
      title: "Restore Status",
      status,
      backupDir: result.backupDir,
      logFile: result.logFile,
      successCountSegFiles: result.successCountSegFiles,
      successCountDBCollections: result.successCountDBCollections,
      totalDBCollections: result.totalDBCollections,
      failCount: result.failCount,
      failures: result.failures
    });

  } catch (err) {
      res.render("manager/restorestatus", {
        title: "Restore Status",
        status: "error",
        error: err.message
      });
    }
  });

// =========================================================
exports.reset_user_password_get = asyncHandler(async (req, res, next) => {
    // connect to *.pug view
    res.render("manager/resetpassword", {
      title: "User Management",
      message: "Reset password for user."
    });
});

// =========================================================
exports.reset_user_password_post = asyncHandler(async (req, res, next) => {
  try {
    const { userEmail, newPassword } = req.body;
    const result = await userManagementService.runResetPassword(userEmail, newPassword);

    if (!result) {
      return res.render("manager/resetpassword", {
        title: "User Management",
        message: "Reset password for user.",
        errmessage: "User not found."
      });
    }

    return res.render("manager/manager", {
      title: "Management Functions",
      message: "Reset password complete."
    });
  } catch (err) {
    next(err);
  }
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