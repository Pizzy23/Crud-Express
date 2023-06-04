const express = require("express");
const router = express.Router();

exports.get = function (req, res, next) {
  res.send("Funciona :)  finances");
};