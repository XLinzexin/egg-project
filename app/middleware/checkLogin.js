const unlogin = require("../utils/constants").code.unlogin;
module.exports = options => {
  return async function checkLogin(ctx, next) {
    let code, msg, data;
    const userId = ctx.session.userId;
    if (userId) {
      const result = await ctx.service.user.selectUserFromId(userId);
      if (result) {
        const user = result[0];
        if (user) {
          user.id = userId;
          ctx.user = user;
          await next();
        } else {
          (code = unlogin), (msg = "请登录"), (data = user);
        }
      }
    } else {
      (code = unlogin), (msg = "请登录");
    }
    if (code == unlogin) {
      ctx.body = {
        code,
        data,
        msg
      };
    }
  };
};
