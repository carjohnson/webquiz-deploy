const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const StudyCloseSchema = new Schema(
  {
    closed_at: { type: Date, default: Date.now },
    close_method: {
      type: String,
      enum: ['logout', 'browser', 'tab_close', 'study_browser', 'route_change', 'unknown'],
      default: 'unknown',
    },
  },
  { _id: false }
);

const ProgressSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  study_id: { type: Schema.Types.ObjectId, ref: 'Study', required: true },

  opened_events: [{ type: Date }],

  closed_events: [StudyCloseSchema],

  series_progress: [{
    seriesUID: { type: String, required: true },
    status: {
      type: String,
      enum: ['new', 'wip', 'done'],
      default: 'new',
    }
  }],

  study_status: {
    type: String,
    enum: ['new', 'wip', 'done'],
    default: 'new',
  },

  updated_at: { type: Date, default: Date.now }
}, { collection: 'progress' });


module.exports = mongoose.model("Progress", ProgressSchema);
