"use strict";

const Controller = require("egg").Controller;

class UserController extends Controller {
  async info() {
    const ctx = this.ctx;
    let response;
    if (ctx.isLogin) {
      response = {
        code: 1000,
        msg: "登录成功！"
      };
      ctx.body = response;
    } else {
      response = {
        code: 1002,
        msg: "未登录！"
      };
      ctx.body = response;
    }
  }
  async register() {
    // await this.app.mysql.query('update posts set hits = (hits + ?) where id = ?', [1, postId]);
    const ctx = this.ctx;
    const requsetBody = ctx.request.body;
    console.log(requsetBody, 123);
    const status = await ctx.service.user.register(requsetBody);
    if (status) {
      ctx.body = {
        code: 1000,
        data: status,
        msg: "登录成功"
      };
    } else {
      ctx.body = {
        code: 1001,
        data: status,
        msg: "登录失败"
      };
    }
  }
  async login() {
    this.ctx.body = "hi, egg";
  }
}

module.exports = UserController;
