import { isValidUser, checkUser, createUser } from '../utilities/userUtil';

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
    const user = await checkUser(username, "login", db);
    if(!user) {
      return false;
    }

    const isValid = await isValidUser(password, user.password);
    if(!isValid) {
      return false;
    }

    const current_login = new Date();
    if(isPassedOneDay(user.last_login, current_login)) {
      user.login_days += 1;
    }
    user.last_login = current_login;

    await user.save();

    return true;
  }
};

export { Mutation as default };
