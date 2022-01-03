import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
  {
    cid: {
      type: String,
      unique: true,
      required: true
    },
    article: {
      type: mongoose.Types.ObjectId,
      ref: "Article"      
    },
    deleted: Boolean,

    type: String,
    owner: {
      type: mongoose.Types.ObjectId,
      ref: "User"
    },
    content: String,
    reply: String,
    ip: String,
    create_time: Date
  }
);

const CommentModel = mongoose.model("Comment", CommentSchema);
export { CommentModel };