"use strict";

const Controller = require("egg").Controller;

class ArticleController extends Controller {
  async create() {
    let code, msg, data;
    const { ctx, app } = this;
    const { success, fail } = app.constants.code;
    const userId = ctx.user.id;
    const { title, content } = ctx.request.body;
    const result = await ctx.service.article.createArticle({
      userId,
      title,
      content
    });
    if (result.insertId) {
      (code = success), (msg = "请求成功");
    } else {
      (code = fail), (msg = "请求失败");
    }
    ctx.body = {
      code,
      data,
      msg
    };
  }
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
  async detail() {
    let code, msg, data;
    const { ctx, app } = this;
    const { success, fail } = app.constants.code;
    const { id } = ctx.params;
    const { isArray } = ctx.helper;
    const { article } = ctx.service;
    const articleDetail = await article.getArticleDetail(id);
    if (isArray(articleDetail)) {
      code = success;
      msg = "请求成功";
      data = articleDetail[0];
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

module.exports = ArticleController;
