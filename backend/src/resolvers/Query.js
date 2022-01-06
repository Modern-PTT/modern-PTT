import { getHotBrdnameList } from "../utilities/creater";

const Query = {
  async board(parent, { brdname }, { db }, info) {
    return await db.BoardModel.findOne({brdname});
  },

  async article(parent, { aid }, { db }, info) {
    return await db.ArticleModel.findOne({aid});
  },

  async allBoards(parent, args, { db }, info) {
    return await db.BoardModel.find();
  },

  async hotBoards(parent, args, { db }, info) {
    const hot_brdname_list = getHotBrdnameList();
    return Promise.all(
      hot_brdname_list.map(
        (brdname) => db.BoardModel.findOne({brdname})
      )
    );
  },

  async newestArticles(parent, { limit }, { db }, info) {
    let queryNum = 50;
    if(limit !== null && limit > 0 && limit <= queryNum) {
      queryNum = limit;
    }
    return await db.ArticleModel.find({})
                                .sort({create_time: -1})
                                .limit(queryNum);;
  }
};

export { Query as default };
