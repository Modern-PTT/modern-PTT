import mongoose from "mongoose";

const BoardSchema = new mongoose.Schema(
  {
    // summary
    brdname: {
      type: String,
      unique: true,
      required: true
    },
    type: String,
    class: String,
    title: String,
    moderators: [String],
    //nuser: Number,  // store in server memory
    
    // details
    post_limit_logins: Number,

    // contents
    articles: [{
      type: mongoose.Types.ObjectId,
      ref: "Article"
    }],
    boards: [{
      type: mongoose.Types.ObjectId,
      ref: "Board"
    }],
  }
);

const BoardModel = mongoose.model("Board", BoardSchema);
export { BoardModel };