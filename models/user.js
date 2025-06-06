const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username  : String,
    email     : String,
    password  : String,
});


// Virtual for genre's URL
UserSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/users/login/${this._id}`;
});
// Export model
module.exports = mongoose.model("User", UserSchema);