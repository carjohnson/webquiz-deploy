const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username  : { type: String, required: true },
    email     : { type: String, required: true },
    password  : { type: String, required: true },
    role      : {
      type: String,
      enum: ['reader', 'admin'],
      default: 'reader',
      required: true,
    }
});


// Virtual for user's URL
UserSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/users/login/${this._id}`;
});
// Export model
module.exports = mongoose.model("User", UserSchema);