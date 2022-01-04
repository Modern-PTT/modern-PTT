import axios from "axios";

const instance = axios.create({
  baseURL: 'https://api.devptt.site:3457/api'
});

// import users
const getInitUserList = () => {
  let user_list = [];
  user_list.push({
    username: "SYSOP",
    password: "123123",
  });
  for(let i = 2; i <= 12; i++) {
    user_list.push({
      username: `SYSOP${i}`,
      password: "123123",
    });
  }
  for(let i = 1; i <= 20; i++) {
    user_list.push({
      username: `test${i}`,
      password: "123123",
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

export {
  getInitUserList,
  getInitBoardList,
}

//     class: "測試",
//     moderator: [
//       "SYSOP",
//       "test456"
//     ],
//     title: "[測試] 測試板開張～",