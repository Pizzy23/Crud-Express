const express = require("express");
const router = express.Router();
const { Headers } = require("../../util/headersClear");
const { Prisma } = require("../../modals/registerModal");
const { BaseController } = require("../baseController/baseController");
const db = new Prisma();

class LoginController extends BaseController {
  constructor() {
    super();
  }
  async getLogin(req, res, next) {
    try {
      const loginUser = await db.loginUser(super.validateInput(req.headers));
      if (!loginUser) {
        res.send("Usuario não encontrado").status(404);
      } else {
        res.send(loginUser).status(200);
      }
    } catch (e) {
      res.send(e).status(500);
    }
  }
}
module.exports = LoginController;
