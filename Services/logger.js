let winston = require("winston");
let path = require("path");
const { SUCCESS } = require("../Utils/responseStatus");
const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    winston.format.json(),
),
  transports: [
    new winston.transports.File({
      filename: `${__dirname}/logs/combined.json`,
    }),

    new winston.transports.File({
      filename: `${__dirname}/logs/error.json`,
      level: "error",
    }),
  ],
});

module.exports = logger;
