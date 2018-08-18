module.exports = options => {
  return async function checkLogin(ctx, next) {
    console.log(ctx.session, 123);
    if (ctx.session.userId) {
      await next();
    } else {
      ctx.body = {
        code: 1002,
        msg: "请登录"
      };
    }
  };
};
