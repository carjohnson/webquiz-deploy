const asyncHandler = require("express-async-handler");
const backupService = require("../services/manager/backupService");
const userManagementService = require("../services/manager/userManagementService");

// =========================================================
exports.index_get = asyncHandler(async (req, res, next) => {
  res.render("manager/manager", {
    title: "Management Functions",
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
exports.backup_post = asyncHandler(async (req, res, next) => {
  try {
    const { outputDir } = req.body;

    const result = await backupService.runBackup(outputDir);

    const status =
      result.failCount > 0 ? "partial" : "success";

    res.render("manager/backupstatus", {
      title: "Backup Status",
      status,
      outputDir,
      backupDir: result.backupDir,
      logFile: result.logFile,
      successCount: result.successCount,
      failCount: result.failCount,
      failures: result.failures
    });

  } catch (err) {
    res.render("manager/backupstatus", {
      title: "Backup Status",
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