// services/manager/userManagementService.js
const bcrypt = require("bcrypt");
const User = require("../../models/user");

// Fetch all users formatted for monospace tabular display
async function getAllUsersFormatted() {
  const users = await User.find({})
    .select("username email role authorized")
    .sort({ username: 1 })
    .exec();

  return users.map(user => {
    const formattedUsername = user.username.padEnd(10, "\u00A0");
    const formattedRole = user.role.padEnd(8, "\u00A0");
    const formattedAuth = String(user.authorized).padEnd(5, "\u00A0");
    const formattedEmail = user.email.padEnd(40, "\u00A0");

    return {
      username: user.username,
      displayText: `${formattedUsername} │ ${formattedRole} │ Auth: ${formattedAuth} │ ${formattedEmail}`
    };
  });
}

// Reset password by username (updated from email lookup to fit unified form)
async function runResetPasswordByUsername(userName, newPassword) {
  const userExists = await User.findOne({
    username: userName.trim()
  })
    .collation({ locale: "en", strength: 2 })
    .exec();

  if (!userExists) {
    return false;
  }

  const hashPassword = await bcrypt.hash(newPassword, 10);
  userExists.password = hashPassword;
  await userExists.save();

  return true;
}

async function runAuthorizeUser(userName) {
  const userExists = await User.findOne({
    username: userName.trim()
  })
    .collation({ locale: "en", strength: 2 })
    .exec();

  if (!userExists) {
    return false;
  }

  userExists.authorized = true;
  await userExists.save();

  return true;
}

module.exports = {
  getAllUsersFormatted,
  runResetPasswordByUsername,
  runAuthorizeUser,
};