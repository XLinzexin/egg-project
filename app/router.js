"use strict";
const constants = require("./utils/constants");
module.exports = app => {
  const { router, controller, middleware } = app;
  app.constants = constants; //把常用的变量挂载到app上
  const checkLogin = middleware.checkLogin({}); //检查是否登录，并保存用户信息到ctx.user
  const getUserInfo = middleware.getUserInfo({}); //保存用户信息到ctx.user
  //user
  router.get("/user", checkLogin, controller.user.info); //获取用户信息
  router.post("/user", controller.user.register); //生成用户
  router.post("/user/session", controller.user.login); //生成用户登录的session
  //article
  router.post("/article", checkLogin, controller.article.create); //创建文章
  router.get("/article", controller.article.list); //文章列表
  router.get("/article/:id", getUserInfo, controller.article.detail); //文章详情
  router.delete("/article/:id", checkLogin, controller.article.delete);
  router.post(
    "/article/:id/comment",
    checkLogin,
    controller.article.createComment
  ); //生成文章评论
  router.get("/article/:id/comment", controller.article.commentList); //文章评论
  router.delete(
    "/article/:id/comment/:commentId",
    controller.article.deleteComment
  );
  router.get("/article/:id/content", controller.article.content); //文章内容
  router.put(
    "/article/:id/content",
    checkLogin,
    controller.article.modifyContent
  ); // 修改文章内容
  router.get("/articleLable", controller.articleLable.list); //和文章相关的标签
};
