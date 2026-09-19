const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ManagerSchema = new Schema({
    username  : { type: String, required: true,maxlength: [8, 'Username cannot exceed 8 characters'] },
    email     : { type: String, required: true },
    password  : { type: String, required: true },
    role      : {
      type: String,
      enum: [ 'manager'],
      default: 'manager',
      required: true,
    },
    authorized  : {type: Boolean, default: false }
}, {collection: 'manager' } );

ManagerSchema.index({ username: 1 });

// Case-insensitive uniqueness on email within this collection. Note this
// only guards against duplicates among managers — it can't stop a manager
// and a user from sharing an email, since Mongo indexes are per-collection.
// The cross-collection check for that still lives in
// usersController.register_post.
ManagerSchema.index(
  { email: 1 },
  { unique: true, collation: { locale: "en", strength: 2 } }
);

// Virtual for user's URL
ManagerSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/users/login/${this._id}`;
});
// Export model
module.exports = mongoose.model("Manager", ManagerSchema);
