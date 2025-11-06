const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserStudyProgressSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  study_id: { type: Schema.Types.ObjectId, ref: 'Study', required: true },
  series_progress: [{
    SeriesUID: { type: String, required: true },
    status: {
      type: String,
      enum: ['new', 'wip', 'done'],
      default: 'new',
    }
  }],
  study_status: {
    type: String,
    enum:  ['new', 'wip', 'done'],
    default: 'new',
  },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model("UserStudyProgress", UserStudyProgressSchema);
