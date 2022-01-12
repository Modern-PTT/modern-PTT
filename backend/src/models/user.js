import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    // summary (public)
    username: {
      type: String,
      unique: true,
      required: true
    },
    password: String,
    salt: String,
    nickname: String,
    login_days: Number,
    last_login: Date,
    last_ip: String,        // not record country name
    post: Number,
    money: Number,

    // detail (private)
    realname: String,
    first_login: Date,

    // other setting
    fav_boards: [{
      type: mongoose.Types.ObjectId,
      ref: "Board"
    }],
    track_articles: [{
      type: mongoose.Types.ObjectId,
      ref: "Article"
    }],
    fav_articles: [{
      type: mongoose.Types.ObjectId,
      ref: "Article"
    }],
    mails: [{
      type: mongoose.Types.ObjectId,
      ref: "Mail"
    }]
  }
);

const UserModel = mongoose.model("User", UserSchema);
export { UserModel };