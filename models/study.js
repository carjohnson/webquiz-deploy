const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const StudySchema = new Schema({
  studyUID: { type: String, required: true, unique: true },
  studyName: { type: String, default: 'unknown', trim: true },
  seriesUIDsToBeAnnotated: [{ type: String, required: true }],
  protocol: { 
    type: String, 
    required: true,
    enum: ['full', 'abbreviated']
  }

}, {collection: 'study' } );

// Export model
module.exports = mongoose.model("Study", StudySchema);