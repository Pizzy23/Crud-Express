const http = require("http");
const app = require("./app");
const port = process.env.PORT || 8080;
const server = http.createServer(app);
const chalk = require("chalk");
const hex = chalk.hex("#1338BE");
const hex2 = chalk.hex("59788E");
server.listen(port);
console.log(`\n\n`);
console.log(hex("Server starter in port:" + hex2(` ${port}`)));
