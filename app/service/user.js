const Service = require("egg").Service;

class UserService extends Service {
  async register(info) {
    return await this.app.mysql.query(
      "INSERT INTO `user`(`name`,`password`,`role`) VALUES(?,?,?)",
      [info.name, info.password, info.role]
    );
  }
  async selectUserFromName(name) {
    return await this.app.mysql.query(
      "SELECT name FROM `user` WHERE name = ?",
      name
    );
  }
  async selectUserFromId(id) {
    return await this.app.mysql.query(
      "SELECT name,role FROM `user` WHERE id = ?",
      id
    );
  }
  async authUser(info) {
    return await this.app.mysql.query(
      "SELECT id,name FROM `user` WHERE name = ? AND password = ? ",
      [info.name, info.password]
    );
  }
}

module.exports = UserService;
