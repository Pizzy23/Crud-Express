const fs = require("fs");
const path = require("path");
const chalk = require("chalk");

const package = require("../../package.json");

const status = {
  routers: `${chalk.blue("Available Routes:")}`,
  release: `${chalk.blue("Release Informations:")}`,
  node_version: process.version,
  service: `v${package.version}`,
  serviceName: package.name,
};

function loadingRouter(controllersDirectory) {
  const log = console.log;
  const routes = [];
  log(chalk.blue`\n\n\n\n Loading Routers:`);
  traverseControllerDirectory(controllersDirectory, routes);
  log("\n+-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-+");
  log(`| ${status.routers.padEnd(39, " ")} | `);
  log(`| ${"".padEnd(29, " ")} |`);
  routes.forEach((route) => {
    log(`| ${route.toLowerCase().padEnd(29, " ")} | `);
  });
  log(`| ${"".padEnd(29, " ")} |`);
  log(
    `+-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-+\n| ${status.release.padEnd(39, " ")} |`
  );
  log(`| ${"".padEnd(29, " ")} |`);
  log(`| Node Version: ${status.node_version.padEnd(15, " ")} |`);
  log(`| Service Version: ${status.service.padEnd(12, " ")} |`);
  log(`| Service Name: ${status.serviceName.padEnd(15, " ")} |`);
  log(`| ${"".padEnd(29, " ")} |`);
  log(`+-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-+`);
}

function traverseControllerDirectory(directory, routes, prefix = "") {
  const files = fs.readdirSync(directory);

  files.forEach((file) => {
    const filePath = path.join(directory, file);
    const stats = fs.statSync(filePath);

    if (stats.isDirectory()) {
      const newPrefix = path.join(prefix, file);
      traverseControllerDirectory(filePath, routes, newPrefix);
    } else if (stats.isFile() && file.endsWith(".js")) {
      const controller = require(filePath);
      const routeName = getRouteName(controller, file);
      const route = path.join(prefix, routeName).toLowerCase();
      routes.push(`/${route}`);
    }
  });
}

function getRouteName(controller, file) {
  const routeComment = controller.toString().match(/@route\s+(.+)/);
  if (routeComment && routeComment.length > 1) {
    return routeComment[1].trim();
  }
  let routeName = file.replace(".js", "");
  if (routeName.toLowerCase().endsWith("controller")) {
    routeName = routeName.slice(0, -10);
  }
  return routeName;
}

module.exports = loadingRouter;
