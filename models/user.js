const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username  : { type: String, required: true,maxlength: [8, 'Username cannot exceed 8 characters'] },
    email     : { type: String, required: true },
    password  : { type: String, required: true },
    role      : {
      type: String,
      enum: ['reader', 'admin'],
      default: 'reader',
      required: true,
    },
    authorized  : {type: Boolean, default: false }
}, {collection: 'user' } );

UserSchema.index({ username: 1 });

// Case-insensitive uniqueness on email, enforced at the database level as a
// backstop to the application-level check in usersController.register_post.
// The collation must match what register_post uses in its findOne() calls
// (locale "en", strength 2) or Mongo will treat this as a different index
// and won't apply it to those queries.
UserSchema.index(
  { email: 1 },
  { unique: true, collation: { locale: "en", strength: 2 } }
);

// Virtual for user's URL
UserSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/users/login/${this._id}`;
});
// Export model
module.exports = mongoose.model("User", UserSchema);
