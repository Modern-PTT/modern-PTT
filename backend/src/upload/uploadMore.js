import { ArticleModel, BoardModel, CommentModel, UserModel } from '../models';
import { createArticle } from '../utilities/articleUtil';
import { createUser } from '../utilities/userUtil';
import { getInitUserList, getInitBoardList } from './dataMore';

const userInit = async () => {
  await UserModel.deleteMany({});
  const defaultUsers = getInitUserList();
  for(let user of defaultUsers) {
    await createUser(user);
  }
  console.log("Database: users initialized!");

}

const boardInit = async () => {
  await BoardModel.deleteMany({});
  const defaultBoards = await getInitBoardList();
  await BoardModel.insertMany(defaultBoards);
  console.log("Database: boards initialized!");
}

// const articleInit = async () => {
//   await CommentModel.deleteMany({});
//   await ArticleModel.deleteMany({});
//   for(let article of defaultArticles) {
//     await createArticle(article);
//   }
//   console.log("Database: articles and comments initialized!");
// }

const dataInit = async () => {
  await userInit();
  await boardInit();
  //await articleInit();
}

export default dataInit;