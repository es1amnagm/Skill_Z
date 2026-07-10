const JWT = require("jsonwebtoken");
const generateError = require("../Utils/generateError");
const { FAIL } = require("../Utils/responseStatus");

module.exports = async (req, res, next) => {
   if (!req.headers.authorization)
    throw generateError(401, FAIL, "token required");
  let token = req.headers.authorization.split(" ")[1];
  let currentUser = await JWT.verify(token, process.env.JWT_SECRET_KEY);
   if (!currentUser) throw generateError(401, FAIL, "not authorized");

  req.currentUser = currentUser;
  next();
};
