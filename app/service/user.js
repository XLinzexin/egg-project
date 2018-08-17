const Service = require("egg").Service;

class UserService extends Service {
  async register(info) {
    const user = await this.app.mysql.query(
      "INSERT INTO `user`(`name`,`password`) VALUES(?,?)",
      [info.name, info.password]
    );
    return user;
  }
}

module.exports = UserService;
