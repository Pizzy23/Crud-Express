const fs = require("fs");
const path = require("path");

function magicController(req, res, next, controllersDirectory) {
  const routes = {};
  traverseControllerDirectory(controllersDirectory, routes);

  const route = req.path;
  const controller = routes[route];
  if (!controller) {
    res.status(404).send("Route not found");
    return;
  }

  try {
    const method = req.method.toLowerCase();
    if (controller[method]) {
      controller[method](req, res, next);
    } else {
      res.status(405).send("Method not allowed");
    }
  } catch (error) {
    res.status(500).send("Error processing the route");
  }
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
      routes[`/${route}`] = controller;
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

module.exports = magicController;
