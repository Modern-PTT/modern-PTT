import {
  toArticleURL,
  toAIDc,
  getLocation
} from "../utilities/converter";

const Article = {
  aidc(parent, args, { db }, info) {
    const aidu = parent.aid;
    const brdname = parent.brdname;
    return toAIDc(aidu, brdname);
  },

  async comments(parent, args, { db }, info) {
    return await Promise.all(
      parent.comments.map(
        (c_id) => db.CommentModel.findById(c_id)
      )
    );
  },
  
  location(parent, args, { db }, info) {
    return getLocation(parent.ip);
  },

  URL(parent, args, { db }, info) {
    const aidu = parent.aid;
    const brdname = parent.brdname;
    return toArticleURL(brdname, aidu);
  }
};

export default Article;
