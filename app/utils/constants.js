const constants = {
  // 请求返回的code（状态码）
  code: {
    success: 1000, //接口请求成功
    fail: 1001, //请求不成功，未达到预期目标
    unlogin: 1002, //未登录
    error: 1003, //请求发生错误导致不成功
    dberror: 1004 //请求错误发生在数据库（暂定，可能不需要,或与1003合并）
  },
  // 用户角色
  role: {
    admin: "admin",
    visitor: "visitor"
  }
};
module.exports = constants;
