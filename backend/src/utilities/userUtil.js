import { UserModel } from "../models";

const checkUser = (username, errFunc) => {
  if(!username) {
    throw new Error("Missing username for: " + errFunc);
  }
  return UserModel.findOne({username});
}

const createUser = async (user) => {
  user.realname = "測試人員";
  user.first_login = new Date();

  user.login_days = 1;
  user.last_login = user.first_login;
  user.last_ip = "8.8.8.8";
  user.post = 0;
  user.money = 0;

  const newUser = new UserModel(user);
  await newUser.save();
}

export {
  checkUser,
  createUser,
};