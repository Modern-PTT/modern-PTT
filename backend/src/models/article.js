import mongoose from "mongoose";

const ArticleSchema = new mongoose.Schema(
  {
    aid: {
      type: String,
      unique: true,
      required: true
    },

    // summary
    board: {
      type: mongoose.Types.ObjectId,
      ref: "Board"
    },
    title: String,
    create_time: Date,
    owner: {
      type: mongoose.Types.ObjectId,
      ref: "User"
    },
    type: String,
    deleted: Boolean,
    push: Number,
    boo: Number,

    // detail
    content: String,
    comments: [{
      type: mongoose.Types.ObjectId,
      ref: "Comment"
    }],
    ip: String,       // not record country name
    last_modified_time: Date
  }
);

const ArticleModel = mongoose.model("Article", ArticleSchema);
export { ArticleModel };