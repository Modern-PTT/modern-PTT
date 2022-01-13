import { validUser, checkUser, createUser } from '../utilities/userUtil';
import {
  createArticle as createArticleUtil,
  updateArticle as updateArticleUtil,
  deleteArticle as deleteArticleUtil,
  checkArticle
} from '../utilities/articleUtil';
import { createComment } from '../utilities/commentUtil';
import { checkBoard } from '../utilities/boardUtil';

const day_msec = 1000*60*60*24;
const timeshift = 1000*60*60*8;

const isPassedOneDay = (last_time, curr_time) => {
  const last_date = Math.floor((last_time.getTime() + timeshift) / day_msec);
  const curr_date = Math.floor((curr_time.getTime() + timeshift) / day_msec);
  
  return curr_date > last_date;
}

const Mutation = {
  async signup(parent, { input } , { db }, info) {
    // console.log(req);
    const username = input.username;
    const password = input.password;
    const salt = input.salt;
    const realname = input.realname;

    const userTaken = await checkUser(username, "signup", db);
    if(userTaken) {
      return false;
    }
    
    const user = {
      username,
      password,
      salt,
      realname,
    }
    await createUser(user, db);
    
    return true;
  },

  async login(parent, { username, password } , { db }, info) {
    const user = await validUser(username, password, "login", db);
    if(!user) {
      return false;
    }

    const current_login = new Date();
    if(isPassedOneDay(user.last_login, current_login)) {
      user.login_days += 1;
    }
    user.last_login = current_login;

    // show random ip. TODO: catch real ip.
    const randNum = Math.floor(Math.random() * 253 + 1);
    user.last_ip = `140.112.30.${randNum}`

    await user.save();

    return true;
  },

  async logout(parent, { username, password } , { db }, info) {
    const user = await validUser(username, password, "login", db);
    if(!user) {
      return false;
    }

    return true;
  },

  async createArticle(parent, { input } , { db }, info) {
    const { brdname, title, content, token } = input;
    const { username, password } = token;

    const user = await validUser(username, password, "createArticle", db);
    if(!user) {
      console.log("not valid user");
      return false;
    }

    let article = {
      brdname,
      title,
      content,
      owner: user.username,
    }

    try {
      await createArticleUtil(article, "createArticle", user, db);
    } catch (e) {
      console.log(`${e}`);
      return false;
    }
    return true;
  },

  async updateArticle(parent, { input } , { db }, info) {
    const { aid, title, content, comment_reply, token } = input;
    const { username, password } = token;

    const user = await validUser(username, password, "updateArticle", db);
    if(!user) {
      console.log("not valid user");
      return false;
    }

    try {
      await updateArticleUtil(aid, user, title, content, comment_reply, "updateArticle", db);
    } catch (e) {
      console.log(`${e}`);
      return false;
    }
    return true;
  },

  async deleteArticle(parent, { input } , { db }, info) {
    const { aid, token } = input;
    const { username, password } = token;

    const user = await validUser(username, password, "deleteArticle", db);
    if(!user) {
      console.log("not valid user");
      return false;
    }

    try {
      await deleteArticleUtil(aid, user, "deleteArticle", db);
    } catch (e) {
      console.log(`${e}`);
      return false;
    }
    return true;
  },

  async createComment(parent, { input } , { db }, info) {
    const { aid, type, content, token } = input;
    const { username, password } = token;

    const user = await validUser(username, password, "createComment", db);
    if(!user) {
      console.log("not valid user");
      return false;
    }

    if(type <= 0 || type > 3) {
      console.log("invalid comment type.");
      return false;
    }
    const comment = {
      owner: user.username,
      type,
      content,
    };

    try {
      await createComment(aid, comment, user.last_ip, db)
    } catch(e) {
      console.log(`${e}`);
      return false;
    }
    return true;
  },

  async updateFavBoards(parent, { input } , { db }, info) {
    const { brdnames, token } = input;
    const { username, password } = token;

    const user = await validUser(username, password, "updateFavBoards", db);
    if(!user) {
      console.log("not valid user");
      return false;
    }

    user.fav_boards = [];
    if(!(Array.isArray(brdnames) && brdnames.length !== 0)) {
      await user.save();
      return true;
    }

    // TODO: case insensitive
    const unique_brdnames = brdnames.filter((item, pos, self) => (
      self.indexOf(item) === pos
    ));

    for(let brdname of unique_brdnames) {
      try {
        const board = await checkBoard(brdname, "updateFavBoards", db);
        user.fav_boards.push(board);
      } catch (e) {
        console.log(`${e}`);
      }
    }

    await user.save();
    return true;
  },

  async updateFavArticles(parent, { input } , { db }, info) {
    const { aids, token } = input;
    const { username, password } = token;

    const user = await validUser(username, password, "updateFavArticles", db);
    if(!user) {
      console.log("not valid user");
      return false;
    }

    user.fav_articles = [];
    if(!(Array.isArray(aids) && aids.length !== 0)) {
      await user.save();
      return true;
    }

    const unique_aids = aids.filter((item, pos, self) => (
      self.indexOf(item) === pos
    ));

    for(let aid of unique_aids) {
      try {
        const article = await checkArticle(aid, "updateFavArticles", db);
        user.fav_articles.push(article);
      } catch (e) {
        console.log(`${e}`);
      }
    }

    await user.save();
    return true;
  },
};

export { Mutation as default };
