const { data } = require("dcmjs");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AnnotationSchema = new Schema({
    user_id         : { type: Schema.Types.ObjectId, ref: "User", required: true },
    patient_id      : { type: String, required: true },
    data            : { type: Schema.Types.Mixed },
    created_at      : { type: Date, default: Date.now }
},  { versionKey: false });


// Virtual for user's URL
AnnotationSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/webquiz/annotation/${this._id}`;
});
// Export model
module.exports = mongoose.model("Annotation", AnnotationSchema);