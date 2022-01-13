import { getLocation } from "../utilities/converter";

const User = {
  last_location(parent, args, { db }, info) {
    return getLocation(parent.last_ip);
  },
  
  fav_boards(parent, args, { db }, info) {
    if(!parent.fav_boards) {
        return null;
    }

    return Promise.all(
      parent.fav_boards.map(
        (b_id) => db.BoardModel.findById(b_id)
      )
    );
  },

  track_articles(parent, args, { db }, info) {
    if(!parent.track_articles) {
        return null;
    }
    
    return Promise.all(
      parent.track_articles.map(
        (a_id) => db.ArticleModel.findById(a_id)
      )
    );
  },

  fav_articles(parent, args, { db }, info) {
    if(!parent.fav_articles) {
        return null
    }

    return Promise.all(
      parent.fav_articles.map(
        (a_id) => db.ArticleModel.findById(a_id)
      )
    );
  },
};

export { User as default };
