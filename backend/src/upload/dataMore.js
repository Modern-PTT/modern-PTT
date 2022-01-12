import axios from "axios";
import { hashPassword } from "../utilities/userUtil";

const instance = axios.create({
  baseURL: 'https://api.devptt.site:3457/api'
});

// import users
const getInitUserList = async () => {
  let user_list = [];

  let { hashed_password, salt } = await hashPassword("123123");
  user_list.push({
    username: "SYSOP",
    nickname: "站長？",
    realname: "站長是誰",
    password: hashed_password,
    salt,
  });
  
  ({ hashed_password, salt } = await hashPassword("123123"));
  user_list.push({
    username: "test",
    nickname: "測試機器人嗶嗶",
    realname: "測試機",
    password: hashed_password,
    salt,
  });

  for(let i = 2; i <= 12; i++) {
    ({ hashed_password, salt } = await hashPassword("123123"));
    user_list.push({
      username: `SYSOP${i}`,
      realname: "SYSOP 真名",
      password: hashed_password,
      salt,
    });
  }

  for(let i = 1; i <= 50; i++) {
    ({ hashed_password, salt } = await hashPassword("123123"));
    user_list.push({
      username: `test${i}`,
      realname: "test 真名",
      password: hashed_password,
      salt,
    });
  }

  return user_list;
}

// import boards
const brdname_list = [
  "Baseball",
  "C_Chat",
  "Gossiping",
  "HatePolitics",
  "Lifeismoney",
  "LoL",
  "MobileComm",
  "NBA",
  "sex",
  "Stock",
  "WhoAmI",
  "test",
];

const getInitBoardList = async () => {
  let board_list = [];

  for(let brdname of brdname_list) {
    const { data: {
      class: className,
      moderators,
      title
    }} = await instance.get(`/board/${brdname}/summary`);

    board_list.push({
      brdname,
      type: "board",
      class: className,
      moderators,
      title,
      post_limit_logins: 0,
    });
  }
  return board_list;
}

// import articles
const parseContent = async (content) => {
  let plainContent = "";
  for(let line of content) {
    for(let block of line) {
      plainContent += block.text;
    }
    plainContent += "\n";
  }
  return plainContent;
}

const parseComments = async (brdname, aid) => {
  let plainComments = [];
  const { data: { list } } = await instance.get(`/board/${brdname}/article/${aid}/comments?limit=200&desc=false`);
  for(let comment of list) {
    if(comment.type <= 3) {
      const type = (comment.type == 1)? "推" : ((comment.type == 2)? "噓" : "→");
      plainComments.push({
        owner: comment.owner,
        type,
        content: comment.content[0][0].text,
        deleted: comment.deleted,
        ip: comment.ip,
        create_time: comment.create_time * 1000,
      });
    }
  }
  return plainComments;
}

const articlePerBoard = 50;

const getInitArticleList = async () => {
  let article_list = [];
  for(let brdname of brdname_list) {
    const { data: { list } } = await instance.get(`/board/${brdname}/articles?limit=${articlePerBoard}&desc=true`);

    for(let article of list) {
      let { aid, title, class: className, owner, create_time, deleted } = article;
      const { data: { content, ip } } = await instance.get(`/board/${brdname}/article/${aid}`);
      
      title = title.trim().replace(/\[測試\][ ]?/, "");
      title = (className !== "")? `[${className}] ${title}` : `[閒聊] ${title}`;
      const plainContent = await parseContent(content);
      const plainComments = await parseComments(brdname, aid);
  
      article_list.push({
        aid,
        brdname,
        title: title,
        create_time: create_time * 1000,
        owner,
        deleted,
        push: 0,
        neutral: 0,
        boo: 0,
        content: plainContent,
        plainComments,
        ip,
      });
    }
  }
  return article_list;
}

export {
  getInitUserList,
  getInitBoardList,
  getInitArticleList,
}