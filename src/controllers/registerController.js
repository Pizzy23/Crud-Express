const express = require("express");
const reg = express.Router();

reg.get("/", (req, res) => {
  res.send("Funciona :)  Reg");
});

module.exports = reg;
