let path = require("path");
module.exports = (message, req, statusCode ) => {
  return {
    message: {
      msg: message,
      statusText: "SUCCESS",
      statusCode: statusCode,
    },

    request: {
      method: req?req.method:'no method',
      route: req?req.originalUrl:"no url",
    },

  };
};
