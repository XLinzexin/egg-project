module.exports = options => {
  return async function getUserInfo(ctx, next) {
    const userId = ctx.session.userId;
    if (userId) {
      const result = await ctx.service.user.selectUserFromId(userId);
      if (result) {
        const user = result[0];
        user.id = userId;
        ctx.user = user;
      }
    }
    await next();
  };
};
