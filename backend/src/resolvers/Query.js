const Query = {
  async allBoards(parent, args, { db }, info) {
    return await db.BoardModel.find();
  },

  async board(parent, { brdname }, { db }, info) {
    return await db.BoardModel.findOne({brdname});
  },

  async article(parent, { aid }, { db }, info) {
    return await db.ArticleModel.findOne({aid});
  },
};

export { Query as default };
