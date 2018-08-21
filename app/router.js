"use strict";
const constants = require("./utils/constants");
module.exports = app => {
  const { router, controller, middleware } = app;
  app.constants = constants;
  const checkLogin = middleware.checkLogin({});
  //user
  router.get("/user", checkLogin, controller.user.info);
  router.post("/user", controller.user.register);
  router.post("/user/session", controller.user.login);
  //article
  router.post("/article", checkLogin, controller.article.create);
  router.get("/article", controller.article.list);
  router.get("/article/:id", controller.article.detail);
};
