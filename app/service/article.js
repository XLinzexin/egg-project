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
  //文章列表
  async getArticleList(info) {
    return await this.app.mysql.query(
      "SELECT title,content,id FROM `article` WHERE deleted = 0 LIMIT ?,? ",
      [
        (info.page > 0 ? info.page - 1 : 0) * info.pageSize,
        Number(info.pageSize)
      ]
    );
  }
  // 文章内容
  async getArticleContent(id) {
    return await this.app.mysql.query(
      "SELECT id,title,content,userId FROM `article` WHERE id = ?",
      id
    );
  }
  // 修改文章内容
  async modifyArticleContent(info) {
    return await this.app.mysql.query(
      "UPDATE `article` SET title = ?, content = ? WHERE id = ?",
      [info.title, info.content, info.id]
    );
  }
  //删除文章（逻辑删除）
  async deleteArticle(id) {
    return await this.app.mysql.query(
      "UPDATE `article` SET deleted = 1 WHERE id =?",
      id
    );
  }
  // 创建评论
  async createComment(info) {
    return await this.app.mysql.query(
      "INSERT INTO `article_comment`(`userId`,`comment`,`articleId`) VALUES(?,?,?)",
      [info.userId, info.comment, info.id]
    );
  }
  // 获取评论列表
  async getArticleCommentList(info) {
    const comment = await this.app.mysql.query(
      "SELECT id,comment,userId,articleId FROM `article_comment` WHERE articleId = ? LIMIT ?,?",
      [
        Number(info.articleId),
        (info.page > 0 ? info.page - 1 : 0) * info.pageSize,
        Number(info.pageSize)
      ]
    );
    if (info.dialogueCount) {
      const { isArray } = this.ctx.helper;
      if (!isArray(comment)) return comment;
      const dialogueFun = [];
      for (let item of comment) {
        dialogueFun.push(
          new Promise((resolve, reject) => {
            this.getArticleDialogueList({
              targetId: item.id,
              page: 0,
              pageSize: info.dialogueCount
            }).then(res => {
              item.dialogue = res;
              resolve("success");
            });
          })
        );
      }
      await Promise.all(dialogueFun);
    }
    return comment;
  }
  // 获取评论对话列表
  async getArticleDialogueList(info) {
    return await this.app.mysql.query(
      "SELECT id,userId,targetUserId,dialogue FROM `article_dialogue` WHERE targetId = ? LIMIT ?,?",
      [
        Number(info.targetId),
        (info.page > 0 ? info.page - 1 : 0) * info.pageSize,
        Number(info.pageSize)
      ]
    );
  }
}

module.exports = ArticleService;
