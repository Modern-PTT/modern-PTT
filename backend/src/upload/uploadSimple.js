import { ArticleModel, BoardModel, CommentModel, UserModel } from '../models';
import { createArticle } from '../utilities/articleUtil';
import { createUser } from '../utilities/userUtil';
import { hashPassword } from '../utilities/userUtil';

const defaultUsers = [
  {
    username: "SYSOP",
    password: "passSYSOP",
  },
  {
    username: "test123",
    password: "passWrong",
  },
  {
    username: "test456",
    password: "passWrong",
  },
  {
    username: "test789",
    password: "passWrong",
  },
];

const defaultBoards = [
  {
    brdname: "Test",
    type: "board",
    class: "測試",
    moderators: [
      "SYSOP",
      "test456"
    ],
    title: "[測試] 測試板開張～",
    post_limit_logins: 0,
  },
  {
    brdname: "Gossiping",
    type: "board",
    class: "綜合",
    title: "[八卦] 聖誕夜活動得獎名單",
    post_limit_logins: 1000,
  },
];

const defaultArticles = [
  {
    brdname: "Test",
    title: "[測試] 第一篇測試",
    content: "xxxxxtestxxxxx",
    owner: "test123",
    plainComments: [
      {
        owner: "test456",
        type: "推",
        content: "Hello?",
      },
      {
        owner: "test789",
        type: "→",
        content: "Hi~~~",
      },
    ],
  },
  {
    brdname: "Gossiping",
    title: "[問卦] 今天會不會下雨？",
    content: "^^",
    owner: "test123",
    plainComments: [
      {
        owner: "test789",
        type: "噓",
        content: "紅的喜氣",
      },
    ],
  },
  {
    brdname: "Test",
    title: "[測試] 第二篇測試",
    content: "222xxxxxtestxxxxx",
    owner: "test456",
  },
];

const userInit = async () => {
  await UserModel.deleteMany({});
  for(let user of defaultUsers) {
    let { hashed_password, salt } = await hashPassword(user.password)
    user.password = hashed_password;
    user.salt = salt;
    await createUser(user);
  }
  console.log("Database: users initialized!");

}

const boardInit = async () => {
  await BoardModel.deleteMany({});
  await BoardModel.insertMany(defaultBoards);
  console.log("Database: boards initialized!");
}

const articleInit = async () => {
  await CommentModel.deleteMany({});
  await ArticleModel.deleteMany({});
  for(let article of defaultArticles) {
    try {
      await createArticle(article, "article init");
    } catch (e) {
      console.log(`articleInit error with ${article}: ${e}`);
    }
  }
  console.log("Database: articles and comments initialized!");
}

const dataInit = async () => {
  await userInit();
  await boardInit();
  await articleInit();
}

export default dataInit;