const { data } = require("dcmjs");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const SegmentSchema = new mongoose.Schema({
    segmentIndex: Number,
    label: String,
    location: String,
    referenceScore: String,
    color: [Number], // [R, G, B, A]
    opacity: Number,
    visibility: Boolean,
    isLocked: Boolean,
    // Add additional metadata if needed
});

const SegmentationsSchema = new Schema({
    user_id         : { type: Schema.Types.ObjectId, ref: "User", required: true },
    study_id        : { type: Schema.Types.ObjectId, ref: "Study", required: true },
    segmentationId: String,
    seriesInstanceUid: String,
    label: String,
    segments: [SegmentSchema], // Array of individual segment data
    segmentationDataRef: String, // Or reference to S3/Binary storage for large labelmaps
    created_at      : { type: Date, default: Date.now }
},  { versionKey: false,
      collection: 'segmentations',
});

// define an index to prevent duplicates
SegmentationsSchema.index(
    { user_id: 1, study_id: 1, segmentationId: 1 },
    { unique: true }
);


// Virtual for user's URL
SegmentationsSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/webquiz/segmentation/${this._id}`;
} );
// Export model
module.exports = mongoose.model("Segmentations", SegmentationsSchema);
