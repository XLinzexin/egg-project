module.exports = options => {
  return async function checkLogin(ctx, next) {
    await next();
    if (ctx.session.userId) {
      ctx.isLogin = true;
    }
  };
};
