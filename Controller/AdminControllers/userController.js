const bcrypt = require("bcrypt");

const User = require("../../Models/userModel");
const asyncWrapper = require("../../Middleware/asyncWrapper");
const handleResponse = require("../../Middleware/handleResponse");

const generateError = require("../../Utils/generateError");
const { SUCCESS, FAIL } = require("../../Utils/responseStatus");
const { findObjAndCheckExists } = require("../../Utils/findObjAndCheckExists");
const logger = require("../../Services/logger");
const setLoggerInfo = require("../../Utils/setLoggerInfo");

let getAllUsers = asyncWrapper(async (req, res, next) => {
  let { role } = req.query;
  let users;
  let filter = role || { $ne: "ADMIN" };
  users = await User.find({ role: filter }, { password: 0, __v: 0 });

  if (users.length === 0)
    return next(generateError(404, FAIL, "no users to show"));
  logger.info(setLoggerInfo("get users data", req, 200));

  return handleResponse(res, 200, SUCCESS, users);
});

let getSingleUser = asyncWrapper(async (req, res, next) => {
  let userId = req.params.userId;

  let user = await findObjAndCheckExists(User, userId);
  logger.info(setLoggerInfo(`get user data ${user}`, req, 200));

  return handleResponse(res, 200, SUCCESS, user);
});

let updateUser = asyncWrapper(async (req, res, next) => {
  let body = req.body;
  console.log(body)
  let userId = req.params.userId;
  let user = await findObjAndCheckExists(User, userId);
  Object.assign(user, body);
  await user.save();

  return handleResponse(res, 200, SUCCESS, "user updated successfully");
});

let deleteUser = asyncWrapper(async (req, res, next) => {
  let userId = req.params.userId;

  await findObjAndCheckExists(User, userId);

  let updatedUser = await User.deleteOne({ _id: userId });

  return handleResponse(res, 200, SUCCESS, "user deleted successfully");
});

module.exports = {
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};
