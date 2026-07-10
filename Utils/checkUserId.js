const generateError = require("./generateError");
const { FAIL } = require("./responseStatus");

module.exports = (JWTUserId, userId) => {
  console.log("JWTUserId", JWTUserId);
  console.log("userId", userId);
  if (JWTUserId != userId)
    throw generateError(
      401,
      FAIL,
      "unauthorized!!! please use your id not another one",
    );
};
