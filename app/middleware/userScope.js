const { code, role } = require("../utils/constants");
const { admin } = role;
const { fail } = code;

module.exports = options => {
  return async function userScope(ctx, next) {
    let code, msg, data;
    const { role } = ctx.user;
    if (role === admin) {
      await next();
    } else {
      (code = fail), (msg = "暂无权限");
      ctx.body = {
        code,
        data,
        msg
      };
    }
  };
};
