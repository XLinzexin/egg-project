"use strict";

const Controller = require("egg").Controller;

class LabelController extends Controller {
  async list() {
    let code, msg, data;
    const { ctx, app } = this;
    const { success, fail } = app.constants.code;
    const { page = 0, pageSize = 20 } = ctx.query;
    const { isArray } = ctx.helper;
    const { article } = ctx.service;
    const result = await article.getArticleList({
      page,
      pageSize
    });
    const total = await article.getArticleTotal();
    if (isArray(result)) {
      code = success;
      msg = "请求成功";
      data = {
        list: result,
        total: total[0][`COUNT(title)`]
      };
    } else {
      code = fail;
      msg = "请求失败";
    }
    ctx.body = {
      code,
      data,
      msg
    };
  }
}

module.exports = LabelController;
