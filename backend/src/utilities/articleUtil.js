import { ArticleModel } from "../models";
import { createRandom, makeAIDu } from "./creater";
import { checkBoard, pushNewArticle } from "./boardUtil";
import { checkUser } from "./userUtil";
import { createComment } from "./commentUtil";

const checkArticle = async (aid, errFunc, db=undefined) => {
  if(!aid) {
    throw new Error("Missing aid for: " + errFunc);
  }

  let article;
  if(db) {
    article = await db.ArticleModel.findOne({aid});
  }
  else {
    article = await ArticleModel.findOne({aid});
  }

  if(!article) {
    throw new Error(`aid ${aid} not found for ${errFunc}`);
  }

  if(article.deleted) {
    throw new Error(`aid ${aid} has been deleted.`);
  }

  return article;
}

const pushNewComment = async (article, comment) => {
  article.comments = [...article.comments, comment];
  switch(comment.type) {
    case 1:
      ++article.push;
      break;
    case 2:
      ++article.boo;
      break;
    case 3:
      ++article.neutral;
      break;
    default:
      break;
  }
  article.modified_time = comment.create_time;
  await article.save();
}

const createArticle = async (article, errFunc, user=undefined, db=undefined) => {
  const board = await checkBoard(article.brdname, errFunc, db);
  if(!board) {
    throw new Error(`board named ${article.brdname} not found for ${errFunc}`);
  }  

  if(!user) {
    user = await checkUser(article.owner, errFunc, db);
  }

  let defaultIP = "140.112.172.11";
  if(user) {
    ++user.post;  
    defaultIP = user.last_ip;
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

  article.ip = (article.ip)? article.ip : defaultIP,
  article.modified_time = article.create_time;

  let plainComments = null;
  if(article.plainComments && article.plainComments.length !== 0) {
    plainComments = JSON.parse(JSON.stringify(article.plainComments));
    delete article.plainComments;
  }

  let newArticle;
  if(db) {
    newArticle = new db.ArticleModel(article);
  }  
  else {
    newArticle = new ArticleModel(article);
  }
  await newArticle.save();
  await pushNewArticle(board, newArticle);

  // create comments
  if(plainComments) {
    for(let comment of plainComments) {
      await createComment(article.aid, comment, db);
    }
  }
}

const deleteArticle = async (aid, user, errFunc, db) => {
  const article = await checkArticle(aid, errFunc, db);

  if(user.username !== article.owner) {
    throw new Error(`permission denied for delete article.`);
  }

  article.deleted = true;
  user.post -= 1;

  console.log(article.deleted);
  console.log(user.post);

  article.save();
  user.save();
}

export {
  checkArticle,
  pushNewComment,
  createArticle,
  deleteArticle,
};