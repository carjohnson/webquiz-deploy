/***
 *  Get the seg files from the server - download 
 */
const path = require("path");
const asyncHandler = require("express-async-handler");

exports.segfile_get = asyncHandler(async (req, res, next) => {
  try {
    const filePath = req.query.path;
    if (!filePath) return res.status(400).send("Missing path");

    res.download(filePath, path.basename(filePath));
  } catch (err) {
    next(err);
  }
});