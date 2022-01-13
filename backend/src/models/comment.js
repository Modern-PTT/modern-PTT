import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
  {
    cid: {
      type: String,
      unique: true,
      required: true
    },
    deleted: Boolean,

    type: Number,
    owner: String,
    content: String,
    reply: String,
    ip: String,
    create_time: Date
  }
);

const CommentModel = mongoose.model("Comment", CommentSchema);
export { CommentModel };