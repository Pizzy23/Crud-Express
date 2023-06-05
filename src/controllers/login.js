const express = require("express");
const router = express.Router();
const { Headers } = require("../util/headersClear");
const { Prisma } = require("../modals/loginModal");
const db = new Prisma();
const clear = new Headers();

exports.get = async function (req, res, next) {
  try {
    const loginUser = await db.loginUser(clear.clear(req.headers));
    if (!loginUser) {
      res.send("Usuario não encontrado").status(404);
    } else {
      res.send(loginUser).status(200);
    }
  } catch (e) {
    console.log(e);
    res.send(e).status(500);
  }
};
