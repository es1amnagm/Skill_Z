const JWT = require("jsonwebtoken");
const asyncWrapper = require("./asyncWrapper");

module.exports = async (payload) => {
  const token = await JWT.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: "1d",
  });
  return token;
};
