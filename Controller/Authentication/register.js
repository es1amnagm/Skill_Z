const generateJWT = require("../../Middleware/generateJWT");
const asyncWrapper = require("../../Middleware/asyncWrapper");
const { SUCCESS, FAIL } = require("../../Utils/responseStatus");
const bcrypt = require("bcrypt");
const User = require("../../Models/userModel");
const generateError = require("../../Utils/generateError");
const setLoggerInfo = require("../../Utils/setLoggerInfo");
// const auditService = require("../../Services/auditService");
// const createAudit = require("../../Services/auditService");
const logger = require("../../Services/logger");

module.exports = asyncWrapper(async (req, res, next) => {
  let {
    firstName,
    lastName,
    email,
    password,
    gender,
    birthDate,
    phone,
    role = "Student",
    avatar = req.file.filename,
    balance,
  } = req.body;
  let user = await User.findOne({ email });
  if (user !== null)
    throw generateError(
      400,
      FAIL,
      "this email are in use",
      __dirname,
      __filename,
    );
     if (!avatar) 
       avatar = gender == "Male" ? "uploads/man.jpg" : "uploads/woman.jpg";
    

  let salt = await bcrypt.genSalt(10);

  let hashedPassword = await bcrypt.hash(password, salt);

  let newUser = new User({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    gender,
    birthDate,
    role,
    phone,
    avatar,
    balance,
  });

  let token = await generateJWT({
    id: newUser.id,
    email,
    role,
  });

  logger.info(setLoggerInfo("user register successfully", req, 200));

  await newUser.save();

  return res.status(200).json({
    status: SUCCESS,
    data: `${role} created successfully`,
    token,
  });
});
