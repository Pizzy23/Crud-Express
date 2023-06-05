const express = require("express");
const router = express.Router();
const { Headers } = require("../util/headersClear");
const { Prisma } = require("../modals/registerModal");
const db = new Prisma();
const clear = new Headers();

exports.post = async function (req, res, next) {
  try {
    const registerUser = await db.registerUser(clear.clear(req.headers));
    res.send(registerUser).status(200);
  } catch (e) {
    console.log(e);
    res.send(e).status(500);
  }
};
