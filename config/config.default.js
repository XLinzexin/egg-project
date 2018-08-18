"use strict";

module.exports = appInfo => {
  const config = {
    keys: appInfo.name + "_1534411544439_230",
    // config.middleware : ["checkLogin"],
    security: {
      csrf: {
        enable: false,
        ignore: ctx => isInnerIp(ctx.ip)
      }
    },
    mysql: {
      // 单数据库信息配置
      client: {
        // host
        host: "127.0.0.1",
        // 端口号
        port: "3306",
        // 用户名
        user: "root",
        // 密码
        password: "599bufushu",
        // 数据库名
        database: "dsf"
      },
      // 是否加载到 app 上，默认开启
      app: true,
      // 是否加载到 agent 上，默认关闭
      agent: false
    }
  };

  return config;
};
