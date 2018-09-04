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
      data = result.insertId;
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
    const articleContent = await article.getArticleContent(id);
    const comment = await article.getArticleCommentList({
      articleId: id,
      page: 1,
      pageSize: 4,
      dialogueCount: 3
    });
    if (isArray(articleContent) && isArray(comment)) {
      code = success;
      msg = "请求成功";
      data = articleContent[0];
      data.comment = comment;
      if (ctx.user.id === data.userId) {
        data.isOwner = true;
      }
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
  async delete() {
    let code, msg, data;
    const { ctx, app } = this;
    const { success, fail } = app.constants.code;
    const { id } = ctx.params;
    const { isArray } = ctx.helper;
    const { article } = ctx.service;
    const articleContent = await article.getArticleContent(id);
    if (isArray(articleContent)) {
      const userId = ctx.user.id;
      if (userId === articleContent[0].userId) {
        const result = await article.deleteArticle(id);
        if (result.affectedRows) {
          code = success;
          msg = "修改成功";
        }
      } else {
        code = fail;
        msg = "不是文章的发布者！";
      }
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
  async createComment() {
    let code, msg, data;
    const { ctx, app } = this;
    const { success, fail } = app.constants.code;
    const { id } = ctx.params;
    const { article } = ctx.service;
    const userId = ctx.user.id;
    const { comment } = ctx.request.body;
    const result = await article.createComment({
      userId,
      comment,
      id
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
  async deleteComment() {
    let code, msg, data;
    const { ctx, app } = this;
    const { success, fail } = app.constants.code;
    const { id, commentId } = ctx.params;
    const { article } = ctx.service;
    const result = await article.deleteComment({
      id,
      commentId
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
  async commentList() {
    let code, msg, data;
    const { ctx, app } = this;
    const { success, fail } = app.constants.code;
    const { id } = ctx.params;
    const { page = 0, pageSize = 20, dialogueCount = 0 } = ctx.query;
    const { isArray } = ctx.helper;
    const { article } = ctx.service;
    const comment = await article.getArticleCommentList({
      articleId: id,
      page,
      pageSize,
      dialogueCount
    });
    if (isArray(comment)) {
      code = success;
      msg = "请求成功";
      data = {
        list: comment
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
  async content() {
    let code, msg, data;
    const { ctx, app } = this;
    const { success, fail } = app.constants.code;
    const { id } = ctx.params;
    const { isArray } = ctx.helper;
    const { article } = ctx.service;
    const articleContent = await article.getArticleContent(id);
    if (isArray(articleContent)) {
      code = success;
      msg = "请求成功";
      data = articleContent[0];
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
  async modifyContent() {
    let code, msg, data;
    const { ctx, app } = this;
    const { success, fail } = app.constants.code;
    const { id } = ctx.params;
    const { isArray } = ctx.helper;
    const { article } = ctx.service;
    const { title, content } = ctx.request.body;
    const articleContent = await article.getArticleContent(id);
    if (isArray(articleContent)) {
      const userId = ctx.user.id;
      if (userId === articleContent[0].userId) {
        const result = await article.modifyArticleContent({
          content,
          title,
          id
        });
        if (result.affectedRows) {
          code = success;
          msg = "修改成功";
        }
      } else {
        code = fail;
        msg = "不是文章的发布者！";
      }
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
