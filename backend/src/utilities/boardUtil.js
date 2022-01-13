import { BoardModel } from "../models";

const checkBoard = async (brdname, errFunc, db=undefined) => {
  if(!brdname) {
    throw new Error("Missing board name for: " + errFunc);
  }
  
  let board;
  if(db) {
    board = await db.BoardModel.findOne({
      brdname: { "$regex": `^${brdname}$`, "$options": "i" }
    });
  }
  else {
    board = await BoardModel.findOne({
      brdname: { "$regex": `^${brdname}$`, "$options": "i" }
    });
  }

  if(!board) {
    throw new Error(`board named ${article.brdname} not found for ${errFunc}`);
  }
  
  return board;
}

const pushNewArticle = async (board, article) => {
  board.articles = [...board.articles, article];
  await board.save();
}

export {
  checkBoard,
  pushNewArticle,
};