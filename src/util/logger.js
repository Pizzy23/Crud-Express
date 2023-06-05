const fs = require("fs");
const chalk = require("chalk");

const notFound = chalk.hex("630436");
const sucess = chalk.hex("03AC13");
const error = chalk.hex("DC143C");

function logRequest(req, res, next) {
  const timestamp = new Date().toISOString();
  const method = req.method;
  const url = req.originalUrl;

  res.on("finish", () => {
    const statusCode = res.statusCode;
    var logMessage;
    if (statusCode === 200) {
      logMessage = sucess(`[ ${url} -> ${method} - ${statusCode} ]\n`);
    } else if (statusCode === 404) {
      logMessage = notFound(`[ ${url} -> ${method} - ${statusCode} ]\n`);
    } else if (statusCode === 500) {
      logMessage = error(`[ ${url} -> ${method} - ${statusCode} ]\n`);
    } else if (statusCode === 405) {
      logMessage = error(`[${url} -> Method not allowed - (${method}) ]\n`);
    }
    console.log(logMessage);
  });

  next();
}

module.exports = logRequest;
