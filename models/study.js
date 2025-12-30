const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const StudySchema = new Schema({
  studyUID: { type: String, required: true, unique: true },
  seriesUIDsToBeAnnotated: [{ type: String, required: true }],

}, {collection: 'study' } );

// Export model
module.exports = mongoose.model("Study", StudySchema);