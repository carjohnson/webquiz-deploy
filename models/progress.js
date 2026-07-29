const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const EventSchema = new Schema(
  {
    event: {
      type: String,
      enum: ['open', 'close', 'case_completed', 'unknown'],
      default: 'unknown',
    },
    occurred_at: { type: Date, default: Date.now },
    method: {
      type: String,
      enum: ['logout', 'browser_close', 'tab_close', 'visibility_lost', 'visibility_regained', 'exit_extension', 'enter_extension', 'user_marked_complete', 'unknown'],
      default: 'unknown',
    },
  },
  { _id: false }
);

const ProgressSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  study_id: { type: Schema.Types.ObjectId, ref: 'Study', required: true },

  timed_events: [EventSchema],

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
