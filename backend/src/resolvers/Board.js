const Board = {
  articles(parent, args, { db }, info) {
    return Promise.all(
      parent.articles.map(
        (a_id) => db.ArticleModel.findById(a_id)
      )
    );
  },
  boards(parent, args, { db }, info) {
    return Promise.all(
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
