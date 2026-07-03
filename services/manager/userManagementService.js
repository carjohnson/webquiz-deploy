const bcrypt = require("bcrypt");
const User = require("../../models/user");

async function runResetPassword(userEmail, newPassword) {
  console.log("*** RUNNING RESET", userEmail);

  const userExists = await User.findOne({
    email: userEmail.toLowerCase().trim()
  })
    .collation({ locale: "en", strength: 2 })
    .exec();

  if (!userExists) {
    return false;
  }

  const hashPassword = await bcrypt.hash(newPassword, 10);
  userExists.password = hashPassword;
  await userExists.save();

  console.log("*** PASSWORD UPDATED", userEmail);
  return true;
}

module.exports = {
  runResetPassword
};