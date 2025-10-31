const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const StudySchema = new Schema({
  studyUID: { type: String, required: true, unique: true },
  seriesUIDs: [{ type: String, required: true }],

});

// Export model
module.exports = mongoose.model("Study", StudySchema);