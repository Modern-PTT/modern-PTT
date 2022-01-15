const Board = {
  async articles(parent, args, { db }, info) {
    let articlesResult = await Promise.all(
      parent.articles.map(
        (a_id) => db.ArticleModel.findById(a_id)
      )
    );

    return articlesResult.sort((a, b) => {
      return b.create_time - a.create_time;
    });
  },

  async boards(parent, args, { db }, info) {
    return await Promise.all(
      parent.boards.map(
        (b_id) => db.BoardModel.findById(b_id)
      )
    );
  },
  nuser(parent, args, { db }, info) {
    return 0;
  }
};

export default Board;
