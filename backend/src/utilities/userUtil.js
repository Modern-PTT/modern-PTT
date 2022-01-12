import { UserModel } from "../models";
import bcrypt from "bcrypt";

const saltRounds = 10;

const hashPassword = async (password) => {
  const salt = bcrypt.genSaltSync(saltRounds);
  const hashed_password = bcrypt.hashSync(password, salt);
  return { hashed_password, salt }
}

const isValidUser = async (inputPassword, storedPassword) => {
  if(!inputPassword) {
    return false;
  }
  return bcrypt.compareSync(inputPassword, storedPassword);
}

const checkUser = async (username, errFunc, db = undefined) => {
  if(!username) {
    throw new Error("Missing username for: " + errFunc);
  }
  if(!db) {
    return await db.UserModel.findOne({username});
  }
  else {
    return await UserModel.findOne({username});
  }
}

const createUser = async (user, db = undefined) => {
  user.first_login = new Date();

  user.login_days = 1;
  user.last_login = user.first_login;
  user.last_ip = "127.0.0.1";
  user.post = 0;
  user.money = 0;
  user.password = bcrypt.hashSync(user.password, saltRounds);

  let newUser;
  if(!db) {
    newUser = new db.UserModel(user);
  }
  else {
    newUser = new UserModel(user);
  }
  await newUser.save();
}

export {
  hashPassword,
  isValidUser,
  checkUser,
  createUser,
};