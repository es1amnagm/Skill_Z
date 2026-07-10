const bcrypt = require("bcrypt");

const asyncWrapper = require("../../Middleware/asyncWrapper");
const User = require("../../Models/userModel");
const generateError = require("../../Utils/generateError");
const { FAIL, SUCCESS } = require("../../Utils/responseStatus");
const generateJWT = require("../../Middleware/generateJWT");
const logger = require("../../Services/logger");
const setLoggerInfo = require("../../Utils/setLoggerInfo");

module.exports = asyncWrapper(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
 
    throw generateError(
      400,
      FAIL,
      "email and password are required",
 
    );
  }
  console.log(email)
  const user = await User.findOne({ email });
   if (!user) {
 
    throw generateError(
      400,
      FAIL,
      "Invalid email or password",
    );
  }
  const isMatch = await bcrypt.compare(password, user.password);
   if (!isMatch) {
 
    throw generateError(
      400,
      FAIL,
      "Invalid email or password",
      __dirname,
      __filename,
    );
  }

  let token = await generateJWT({
    id: user["_id"],
    email,
    role: user.role,
  });

  logger.info(setLoggerInfo("user logged in successfully", req, 200));
 
  return res.status(200).json({
    status: SUCCESS,
    data: "Congratulations!!! You are logged in",
    token,
  });
});
