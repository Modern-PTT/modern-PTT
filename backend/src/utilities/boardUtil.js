import { BoardModel } from "../models";

const checkBoard = (brdname, errFunc) => {
  if(!brdname) {
    throw new Error("Missing board name for: " + errFunc);
  }
  return BoardModel.findOne({brdname});
}

const pushNewArticle = async (board, article) => {
  board.articles = [...board.articles, article];
  await board.save();
}

export {
  checkBoard,
  pushNewArticle,
};