import { BoardModel } from "../models";

const checkBoard = async (brdname, errFunc, db=undefined) => {
  if(!brdname) {
    throw new Error("Missing board name for: " + errFunc);
  }
  
  if(db) {
    return await db.BoardModel.findOne({brdname});
  }
  else {
    return await BoardModel.findOne({brdname});
  }
}

const pushNewArticle = async (board, article) => {
  board.articles = [...board.articles, article];
  await board.save();
}

export {
  checkBoard,
  pushNewArticle,
};