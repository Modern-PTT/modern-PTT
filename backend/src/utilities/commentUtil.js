import { CommentModel } from "../models";
import { checkArticle, pushNewComment } from "./articleUtil";
import { v4 as uuidv4 } from "uuid";

const createComment = async(aid, comment) => {
  const article = await checkArticle(aid, "createComment");
  if(!article) {
    throw new Error(`article ${aid} not found for createComment`);
  }

  comment.cid = uuidv4();
  comment.deleted = ("deleted" in comment)? comment.deleted : false;
  comment.ip = (comment.ip)? comment.ip : "140.112.172.11";
  comment.create_time = (comment.create_time)? comment.create_time : new Date();

  const newComment = new CommentModel(comment);
  await newComment.save();
  await pushNewComment(article, newComment);
}

export {
  createComment,
};