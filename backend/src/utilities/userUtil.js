import { UserModel } from "../models";
import bcrypt from "bcrypt";

const saltRounds = 10;

const checkUser = (username, errFunc) => {
  if(!username) {
    throw new Error("Missing username for: " + errFunc);
  }
  return UserModel.findOne({username});
}

const createUser = async (user) => {
  user.realname = "XXX";
  user.first_login = new Date();

  user.login_days = 1;
  user.last_login = user.first_login;
  user.last_ip = "127.0.0.1";
  user.post = 0;
  user.money = 0;
  user.password = bcrypt.hashSync(user.password, saltRounds);

  const newUser = new UserModel(user);
  await newUser.save();
}

export {
  checkUser,
  createUser,
};