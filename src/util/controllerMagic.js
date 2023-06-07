const fs = require("fs");
const path = require("path");

function magicController(req, res, next, controllersDirectory) {
  const routes = {};
  traverseControllerDirectory(controllersDirectory, routes);

  const route = req.path;
  const ControllerClass = routes[route];
  if (!ControllerClass) {
    res.status(404).send("Route not found");
    return;
  }

  const controller = new ControllerClass();
  try {
    const http = req.method.toLowerCase();
    const methodName = findRouterClass(http, route, controller);
    if (methodName) {
      controller[methodName](req, res, next);
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
      if (file === "baseController") {
        return;
      }
      const newPrefix = path.join(prefix, file);
      traverseControllerDirectory(filePath, routes, newPrefix);
    } else if (stats.isFile() && file.endsWith(".js")) {
      const ControllerClass = require(filePath);
      const routeName = getRouteName(ControllerClass, file);
      const route = path.join(prefix, routeName).toLowerCase();
      routes[`/${routeName}`] = ControllerClass;
    }
  });
}

function getRouteName(ControllerClass, file) {
  const routeComment = ControllerClass.toString().match(/@route\s+(.+)/);
  if (routeComment && routeComment.length > 1) {
    return routeComment[1].trim();
  }
  let routeName = file.replace(".js", "");
  if (routeName.toLowerCase().endsWith("controller")) {
    routeName = routeName.slice(0, -10);
  }
  return routeName;
}

function findRouterClass(http, route, controller) {
  const methods = Object.getOwnPropertyNames(
    Object.getPrototypeOf(controller)
  ).filter((name) => name !== "constructor");

  const methodName = methods.find((method) => {
    const parts = method.split(/(?=[A-Z])/);
    const methodHttp = parts[0].toLowerCase();
    const methodName = parts.slice(1).join("").toLowerCase();
    return methodHttp === http && route.includes(methodName);
  });
  return methodName
}

module.exports = magicController;
