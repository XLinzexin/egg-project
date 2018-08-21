const Service = require("egg").Service;

class ArticleService extends Service {
  async createArticle(info) {
    return await this.app.mysql.query(
      "INSERT INTO `article`(`userId`,`title`,`content`) VALUES(?,?,?)",
      [info.userId, info.title, info.content]
    );
  }
  async getArticleTotal() {
    return await this.app.mysql.query("SELECT COUNT(title) FROM `article`");
  }
  async getArticleList(info) {
    return await this.app.mysql.query(
      "SELECT title,content,id FROM `article` LIMIT ?,? ",
      [
        (info.page > 0 ? info.page - 1 : 0) * info.pageSize,
        Number(info.pageSize)
      ]
    );
  }
  async getArticleDetail(id) {
    return await this.app.mysql.query(
      "SELECT id,title,content,userId FROM `article` WHERE id = ?",
      id
    );
  }
  async createComment(info) {
    return await this.app.mysql.query(
      "INSERT INTO `article_comment`(`userId`,`comment`,`articleId`) VALUES(?,?,?)",
      [info.userId, info.comment, info.id]
    );
  }
  async getArticleCommentList(info) {
    return await this.app.mysql.query(
      "SELECT id,comment,userId,articleId,targetId FROM `article_comment` WHERE articleId = ? LIMIT ?,?"
    );
  }
}

module.exports = ArticleService;
