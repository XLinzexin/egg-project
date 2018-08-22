"use strict";
const constants = require("./utils/constants");
module.exports = app => {
  const { router, controller, middleware } = app;
  app.constants = constants;
  const checkLogin = middleware.checkLogin({}); //检查是否登录，并保存用户信息到ctx.user
  const getUserInfo = middleware.getUserInfo({}); //保存用户信息到ctx.user
  //user
  router.get("/user", checkLogin, controller.user.info);
  router.post("/user", controller.user.register);
  router.post("/user/session", controller.user.login);
  //article
  router.post("/article", checkLogin, controller.article.create);
  router.get("/article", controller.article.list);
  router.get("/article/:id", getUserInfo, controller.article.detail);
  router.post(
    "/article/:id/comment",
    checkLogin,
    controller.article.createComment
  );
  router.get("article/:id/comment", controller.article.commentList);
};
