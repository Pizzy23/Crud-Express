const { Headers } = require("../../util/headersClear");

class BaseController {
  constructor(clear) {
    this.clear = new Headers();
  }

  validateInput(data) {
    try {
      const header = this.clear.clear(data);
      return header
    } catch (e) {
      res.send(e).status(500);
    }
  }
}

module.exports = { BaseController };
