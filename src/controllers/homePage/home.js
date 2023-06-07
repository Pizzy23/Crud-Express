const express = require("express");
const router = express.Router();
const { Headers } = require("../../util/headersClear");
const { Prisma } = require("../../modals/registerModal");
const { BaseController } = require("../baseController/baseController");
const db = new Prisma();

class HomePageController extends BaseController {
  constructor() {
    super();
  }
  async getHome(req, res, next) {
    res.send("Funciona :) HomePage");
  }
}
module.exports = HomePageController;
