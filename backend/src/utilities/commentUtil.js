import { CommentModel } from "../models";
import { checkArticle, pushNewComment } from "./articleUtil";
import { v4 as uuidv4 } from "uuid";

const checkComment = async (cid, db) => {
  if(!cid) {
    throw new Error("Missing cid");
  }

  const comment = await db.CommentModel.findOne({cid});
  if(!comment) {
    throw new Error(`comment cid ${cid} not found.`);
  }
  return comment;
}

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

const filterSameComment = (comment_reply) => {
  return comment_reply.filter( (element, index, self) => (
    index === self.findIndex((element2) => (
      element.cid === element2.cid
    ))
  ));
}

const updateCommentReply = async (aid, comment_reply, db) => {
  if(!(Array.isArray(comment_reply) && comment_reply.length !== 0)) {
    return;
  }

  const unique_comment_reply = filterSameComment(comment_reply);

  await Promise.all(
    unique_comment_reply.map(async (setting) => {
      const comment = await checkComment(setting.cid, db);
      if(comment.aid === aid) {
        comment.reply = setting.reply;
        comment.save();
      }
    })
  )
}

export {
  createComment,
  updateCommentReply,
};