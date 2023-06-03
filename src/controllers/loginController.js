const express = require("express");
const login = express.Router();

login.get("/", (req, res) => {
  res.send("Funciona :)   Login");
});

module.exports = login;
