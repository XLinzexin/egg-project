"use strict";

const Controller = require("egg").Controller;

class UserController extends Controller {
  async info() {
    let code, msg, data;
    const { ctx, app } = this;
    const { success } = app.constants.code;
    const user = ctx.user;
    if (user) {
      (code = success), (msg = "登录成功"), (data = user);
    }
    ctx.body = {
      code,
      data,
      msg
    };
  }
  async register() {
    let code, msg, data;
    const { ctx, app } = this;
    const { success, fail, error } = app.constants.code;
    const { isArray } = ctx.helper;
    const { visitor } = app.constants.role;
    const requsetBody = ctx.request.body;
    const user = await ctx.service.user.selectUserFromName(requsetBody.name);
    if (isArray(user) && user.length) {
      (code = fail), (msg = "该用户已注册");
    } else {
      requsetBody.role = visitor;
      const result = await ctx.service.user.register(requsetBody);
      if (result) {
        (code = success), (msg = "注册成功");
      } else {
        (code = error), (msg = "注册失败"), (data = result);
      }
    }
    ctx.body = {
      code,
      data,
      msg
    };
  }
  async login() {
    let code, msg, data;
    const { ctx, app } = this;
    const { success, fail } = app.constants.code;
    const requsetBody = ctx.request.body;
    const result = await ctx.service.user.authUser(requsetBody);
    if (result) {
      const user = result[0];
      if (user) {
        (code = success), (msg = "登录成功"), (data = user);
        ctx.session.userId = user.id;
      } else {
        (code = fail), (msg = "用户名或密码错误"), (data = user);
      }
    } else {
      (code = fail), (msg = "登录失败"), (data = result);
    }
    ctx.body = {
      code,
      data,
      msg
    };
  }
}

module.exports = UserController;
