const express = require("express");
const router = express.Router();

exports.post = function (req, res, next) {
  res.send("Funciona :)  register");
};
