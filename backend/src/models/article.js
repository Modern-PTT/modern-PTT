import mongoose from "mongoose";

const ArticleSchema = new mongoose.Schema(
  {
    aid: {
      type: String,
      unique: true,
      required: true
    },

    // summary
    brdname: String,
    title: String,
    create_time: Date,
    owner: String,
    type: String,
    deleted: Boolean,
    push: Number,
    neutral: Number,
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