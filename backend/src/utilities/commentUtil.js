import { CommentModel } from "../models";
import { checkArticle, pushNewComment } from "./articleUtil";
import { v4 as uuidv4 } from "uuid";

const createComment = async(aid, comment, ip=undefined, db=undefined) => {
  const article = await checkArticle(aid, "createComment", db);

  comment.cid = uuidv4();
  comment.deleted = ("deleted" in comment)? comment.deleted : false;

  let commentIP = "140.112.172.11";
  if(ip) {
    commentIP = ip;
  }
  comment.ip = (comment.ip)? comment.ip : commentIP;
  comment.create_time = (comment.create_time)? comment.create_time : new Date();

  let newComment;
  if(db) {
    newComment = new db.CommentModel(comment);
  } else {
    newComment = new CommentModel(comment);
  }
  await newComment.save();
  await pushNewComment(article, newComment);
}

export {
  createComment,
};