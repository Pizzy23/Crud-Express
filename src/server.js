const http = require("http");
const app = require("./app");
const port = process.env.PORT || 8080;
const server = http.createServer(app);
server.listen(port);
console.log("Finanças foi iniciado na porta " + port);
