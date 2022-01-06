import { toArticleURL, toAIDc } from "../utilities/converter";
import geoip from "geoip-lite";

const Article = {
  aidc(parent, args, { db }, info) {
    const aidu = parent.aid;
    const brdname = parent.brdname;
    return toAIDc(aidu, brdname);
  },

  comments(parent, args, { db }, info) {
    return Promise.all(
      parent.comments.map(
        (c_id) => db.CommentModel.findById(c_id)
      )
    );
  },
  
  location(parent, args, { db }, info) {
    const ip = parent.ip;
    const geo = geoip.lookup(ip);
    if(geo !== null) {
      return {
        ip,
        country: `${geo.country}, ${geo.city}`,
      }
    }
    else {
      return {
        ip,
        country: "private",
      }
    }
  },

  URL(parent, args, { db }, info) {
    const aidu = parent.aid;
    const brdname = parent.brdname;
    return toArticleURL(brdname, aidu);
  }
};

export default Article;
