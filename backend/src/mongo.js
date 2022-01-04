import mongoose from "mongoose";
import dotenv from "dotenv-defaults";
import dataInit from "./upload/uploadSimple";

async function connect() {
  dotenv.config();
  if(!process.env.MONGO_URL) {
    console.error("Missing MONGO_URL");
    process.exit(1);
  }

  const dboptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
  };

  mongoose.connect(
    process.env.MONGO_URL, dboptions
  ).then((res) => console.log("mongo db connection created"));

  const db = mongoose.connection;
  db.on("error", (err) => console.log(err));
  db.once('open', () => {
    dataInit();
    console.log("Open Mongo database");
  });
}

export default { connect };