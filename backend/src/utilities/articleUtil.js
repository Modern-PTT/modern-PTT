import { ArticleModel } from "../models";
import { createRandom, makeAIDu } from "./creater";
import { checkBoard, pushNewArticle } from "./boardUtil";
import { checkUser } from "./userUtil";
import { createComment } from "./commentUtil";

const checkArticle = async (aid, errFunc) => {
  if(!aid) {
    throw new Error("Missing aid for: " + errFunc);
  }
  return ArticleModel.findOne({aid});
}

const pushNewComment = async (article, comment) => {
  article.comments = [...article.comments, comment];
  switch(comment.type) {
    case "推":
      ++article.push;
      break;
    case "噓":
      ++article.boo;
      break;
    case "→":
      ++article.neutral;
      break;
    default:
      break;
  }
  article.modified_time = comment.create_time;
  await article.save();
}

const createArticle = async (article) => {
  const board = await checkBoard(article.brdname, "createArticle");
  if(!board) {
    throw new Error(`board named ${article.brdname} not found for createArticle`);
  }  

  const user = await checkUser(article.owner, "createArticle");
  if(user) {
    ++user.post;  
    await user.save();  
  }

  if(!article.create_time) {
    article.create_time = new Date();

    const random_16_base = createRandom();
    article.aid = makeAIDu(article.create_time, random_16_base);
  }

  article.type = "normal";
  article.deleted = ("deleted" in article)? article.deleted : false;
  article.push = 0;
  article.neutral = 0;
  article.boo = 0;

  article.ip = (article.ip)? article.ip : "140.112.172.11",
  article.modified_time = article.create_time;

  let plainComments = null;
  if(article.plainComments && article.plainComments.length !== 0) {
    plainComments = JSON.parse(JSON.stringify(article.plainComments));
    delete article.plainComments;
  }

  const newArticle = new ArticleModel(article);
  await newArticle.save();
  await pushNewArticle(board, newArticle);

  // create comments
  if(plainComments) {
    for(let comment of plainComments) {
      await createComment(article.aid, comment);
    }
  }
}

export {
  checkArticle,
  pushNewComment,
  createArticle,
};