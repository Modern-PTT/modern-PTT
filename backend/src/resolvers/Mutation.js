import { checkUser, createUser } from '../utilities/userUtil';

const Mutation = {
  async signup(parent, { input } , { db }, info) {
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
};

export { Mutation as default };
