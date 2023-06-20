const winston = require("winston");
// require winston-mongodb
require("winston-mongodb");

//
const BookLogger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      level: "info",
      format: winston.format.json(),
    }),
    new winston.transports.Console({
      level: "warn",
      format: winston.format.json(),
    }),

    // MongoDB transport
    new winston.transports.MongoDB({
      level: "error",
      //mongo database connection link
      db: "mongodb://127.0.0.1:27017/BookStore",
      options: {
        useUnifiedTopology: true,
      },
      // A collection to save json formatted logs
      collection: "items",
      // Convert logs to a json format
      format: winston.format.json(),
    }),
  ],
});

module.exports = { BookLogger };
