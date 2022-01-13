import { CommentModel } from "../models";
import { checkArticle, pushNewComment } from "./articleUtil";
import { v4 as uuidv4 } from "uuid";

const createComment = async (aid, comment, ip=undefined, db=undefined) => {
  const article = await checkArticle(aid, "createComment", db);

  comment.aid = aid;
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

const updateCommentReply = async (aid, comment_reply, db) => {
  if(!(Array.isArray(comment_reply) && comment_reply.length !== 0)) {
    return;
  }

  // return Promise.all(
  //   parent.comments.map(
  //     (c_id) => db.CommentModel.findById(c_id)
  //   )
  // );

  // comment_reply.forEach(e => {
    
  // });
  return;
}

export {
  createComment,
  updateCommentReply,
};