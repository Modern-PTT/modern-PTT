import { CommentModel } from "../models";
import { checkArticle, pushNewComment } from "./articleUtil";
import { checkUser } from "./userUtil";
import { v4 as uuidv4 } from "uuid";

const createComment = async(aid, comment) => {
  const article = await checkArticle(aid, "createComment");
  if(!article) {
    throw new Error(`article ${aid} not found for createComment`);
  }

  const owner = await checkUser(comment.username, "createComment");
  if(!owner) {
    throw new Error(`user named ${comment.username} not found for createComment`);
  }

  comment.cid = uuidv4();
  comment.article = article;
  comment.owner = owner;
  comment.deleted = false;
  comment.ip = "8.8.8.8";
  comment.create_time = new Date();

  delete comment.username;

  const newComment = new CommentModel(comment);
  await newComment.save();
  await pushNewComment(article, newComment);

}

export {
  createComment,
};