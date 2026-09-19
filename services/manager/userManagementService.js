// services/manager/userManagementService.js
const bcrypt = require("bcrypt");
const User = require("../../models/user");
const Manager = require('../../models/manager');

// =========================================================
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

// =========================================================
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

// =========================================================
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

// =========================================================
async function runAssignToAdmin(userName) {
  const userExists = await User.findOne({
    username: userName.trim()
  })
    .collation({ locale: "en", strength: 2 })
    .exec();

  if (!userExists) {
    return false;
  }

  userExists.role = "admin";
  await userExists.save();

  return true;
}

// =========================================================
async function runTransferToManager(userName) {
  const cleanUsername = userName.trim();

  // Start a transaction session for atomic execution
  const session = await User.startSession();
  session.startTransaction();

  try {
    // 1. Check if user exists
    const userDoc = await User.findOne({ username: cleanUsername })
      .collation({ locale: "en", strength: 2 })
      .session(session)
      .exec();

    if (!userDoc) {
      await session.abortTransaction();
      return false;
    }

    // 2. Check if manager already exists
    const managerExists = await Manager.findOne({ username: cleanUsername })
      .collation({ locale: "en", strength: 2 })
      .session(session)
      .exec();

    if (managerExists) {
      await session.abortTransaction();
      return false;
    }

    // 3. Create Manager document
    const newManager = new Manager({
      username: userDoc.username,
      password: userDoc.password,
      email: userDoc.email,
      role: "manager",
      authorized: true,
    });
    await newManager.save({ session });

    // 4. Delete original User document by unique ID
    await User.deleteOne({ _id: userDoc._id }).session(session);

    // Commit both operations
    await session.commitTransaction();
    return true;

  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
}

// =========================================================
module.exports = {
  getAllUsersFormatted,
  runResetPasswordByUsername,
  runAuthorizeUser,
  runTransferToManager,
  runAssignToAdmin,
};