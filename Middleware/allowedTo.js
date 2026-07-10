const generateError = require("../Utils/generateError");
const { FAIL } = require("../Utils/responseStatus");
const asyncWrapper = require("./asyncWrapper");

module.exports = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.currentUser.role))
      throw generateError(401, FAIL, "you are not authorized");
    next(); 
  };
};
 