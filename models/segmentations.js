const { data } = require("dcmjs");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const SegmentSchema = new mongoose.Schema({
    segmentIndex: Number,
    label: String,
    lesionLocation: [String],
    lesionReferenceScore: String,
});

const SegmentationEntrySchema = new mongoose.Schema({
  segmentationId: { type: String, required: true },   // OHIF segmentation UUID
  seriesInstanceUid: String,
  label: String,
  segments: [SegmentSchema],  
  segmentationDataRef: String,                        // S3 / binary storage pointer
  created_at: { type: Date, default: Date.now }
});

const SegmentationsSchema = new Schema({
    user_id         : { type: Schema.Types.ObjectId, ref: "User", required: true },
    study_id        : { type: Schema.Types.ObjectId, ref: "Study", required: true },
    segmentationIds: [SegmentationEntrySchema],
    created_at      : { type: Date, default: Date.now }
},  { versionKey: false,
      collection: 'segmentations',
});

// define an index to prevent duplicates
SegmentationsSchema.index(
    { user_id: 1, study_id: 1, "segmentationIds.segmentationId": 1 },
    { unique: true }
);


// Virtual for user's URL
SegmentationsSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/webquiz/segmentation/${this._id}`;
} );
// Export model
module.exports = mongoose.model("Segmentations", SegmentationsSchema);
