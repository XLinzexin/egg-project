"use strict";

const Controller = require("egg").Controller;

class UserController extends Controller {
  async info() {
    let code, msg, data;
    const ctx = this.ctx;
    const userId = ctx.session.userId;
    const result = await ctx.service.user.selectUserFromId(userId);
    if (result) {
      const user = result[0];
      if (user) {
        (code = 1000), (msg = "登录成功"), (data = user);
      } else {
        (code = 1002), (msg = "请登录"), (data = user);
      }
    }
    ctx.body = {
      code,
      data,
      msg
    };
  }
  async register() {
    let code, msg, data;
    const ctx = this.ctx;
    const requsetBody = ctx.request.body;
    const hasUser = await ctx.service.user.selectUserFromName(requsetBody.name);
    if (hasUser) {
      (code = 1004), (msg = "该用户已注册");
    } else {
      const status = await ctx.service.user.register(requsetBody);
      if (status) {
        (code = 1000), (msg = "注册成功");
      } else {
        (code = 1001), (msg = "注册失败"), (data = status);
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
    const ctx = this.ctx;
    const requsetBody = ctx.request.body;
    const result = await ctx.service.user.authUser(requsetBody);
    if (result) {
      const user = result[0];
      if (user) {
        (code = 1000), (msg = "登录成功"), (data = user);
        ctx.session.userId = user.id;
      } else {
        (code = 1001), (msg = "用户名或密码错误"), (data = user);
      }
    } else {
      (code = 1001), (msg = "登录失败"), (data = result);
    }
    ctx.body = {
      code,
      data,
      msg
    };
  }
}

module.exports = UserController;
