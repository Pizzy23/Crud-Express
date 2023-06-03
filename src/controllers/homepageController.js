const express = require("express");
const hm = express.Router();

hm.get("/", (req, res) => {
  res.send("Funciona :) HomePage");
});

module.exports = hm;
