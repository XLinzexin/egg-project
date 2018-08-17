"use strict";
module.exports = app => {
  const { router, controller, middleware } = app;
  const checkLogin = middleware.checkLogin({});
  router.get("/user", checkLogin, controller.user.info);
  router.post("/user", controller.user.register);
  router.post("/user/session", controller.user.login);
};
