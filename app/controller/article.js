"use strict";

const Controller = require("egg").Controller;

class articleController extends Controller {
  async list() {
    let code, msg, data;
    ctx.body = {
      code,
      data,
      msg
    };
  }
  async create() {
    let code, msg, data;

    ctx.body = {
      code,
      data,
      msg
    };
  }
}

module.exports = articleController;
