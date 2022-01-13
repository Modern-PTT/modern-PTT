import { validUser, checkUser, createUser } from '../utilities/userUtil';
import { createArticle as createArticleUtil } from '../utilities/articleUtil';

const day_msec = 1000*60*60*24;
const timeshift = 1000*60*60*8;

const isPassedOneDay = (last_time, curr_time) => {
  const last_date = Math.floor((last_time.getTime() + timeshift) / day_msec);
  const curr_date = Math.floor((curr_time.getTime() + timeshift) / day_msec);
  
  return curr_date > last_date;
}

const Mutation = {
  async signup(parent, { input } , { db, req }, info) {
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

  async login(parent, { username, password } , { db, req }, info) {
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

  async logout(parent, { username, password } , { db, req }, info) {
    const user = await validUser(username, password, "login", db);
    if(!user) {
      return false;
    }

    return true;
  },

  async createArticle(parent, { input } , { db, req }, info) {
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
};

export { Mutation as default };