const express = require("express");
const router = express.Router();
const { Headers } = require("../../util/headersClear");
const { Prisma } = require("../../modals/registerModal");
const { BaseController } = require("../baseController/baseController");

const db = new Prisma();

class RegisterController extends BaseController {
  constructor() {
    super();
  }
  async postRegister(req, res, next) {
    try {
      const registerUser = await db.registerUser(this.clear.clear(req.headers));
      res.send(registerUser).status(200);
    } catch (e) {
      res.send(e).status(500);
    }
  }
}
module.exports = RegisterController;
