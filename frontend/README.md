---
tags: 110-1, web-programming
---

# 110-1-Web-finalproject 
# preREADME



##  final project frontend環境

1. 在 anywhere 新增 `ptt` 資料夾
```bash
mkdir ptt
```

2. 在 `ptt` 資料夾執行以下指令:

```bash
yarn init -y
yarn add -D cypress dotenv-defaults mongoose
```

3. 在 `ptt/package.json` 內新增以下欄位:
```json
"scripts": {
    "frontend": "cd ./frontend && npm start",
    "backend": "cd ./backend && npm start",
    "test": "npx cypress run --browser=firefox --spec cypress/integration/*.spec.js"
},
```

4. 在 `ptt` 資料夾下利用 `npx create-react-app frontend` 建立 `frontend`
```bash
cd ptt
npx create-react-app@5.0.0 frontend
```


5. 在 `ptt/frontend` 下安裝底下套件:
```bash
cd ptt/frontend
yarn add @apollo/client @apollo/react-hooks @emotion/react @emotion/styled @mui/icons-material @mui/lab @mui/material apollo-link-ws graphql moment react-apollo react-beautiful-dnd subscriptions-transport-ws uuid

npm i styled-components
npm i @material-ui/core

```

6. 在 `ptt` 資料夾下新增 `backend` 資料夾
```bash
cd ptt
mkdir backend
```

7. 在 `ptt/backend` 下執行以下指令:
```bash
cd ptt/backend
yarn init -y
yarn add dotenv-defaults graphql-yoga mongoose nodemon
```

8. 在 `ptt/backend` 內依照下面的內容執行:
```bash
// 妥善安裝 Babel 相關套件
yarn add -D @babel/cli @babel/core @babel/node @babel/preset-env

// 增加一個 .babelrc 的設定檔
{
  "presets": [
    "@babel/preset-env"
  ]
}

// 修改 package.json:
"scripts": {
    "start": "nodemon src/index.js --ext js,graphql --exec babel-node"
},
```

9. 檢查你的資料夾結構是否是如下:
```
.
├── backend
│   ├── .babelrc
│   ├── package.json
│   └── yarn.lock
├── frontend
│   ├── README.md
│   ├── package-lock.json
│   ├── package.json
│   ├── public
│   │   ├── favicon.ico
│   │   ├── index.html
│   │   ├── logo192.png
│   │   ├── logo512.png
│   │   ├── manifest.json
│   │   └── robots.txt
│   ├── src
│   │   ├── App.css
│   │   ├── App.js
│   │   ├── App.test.js
│   │   ├── index.css
│   │   ├── index.js
│   │   ├── logo.svg
│   │   ├── reportWebVitals.js
│   │   └── setupTests.js
│   └── yarn.lock
├── package.json
└── yarn.lock
```



10. 到 MongoDB Atlas 的網站，利用之前創好的 cluster，在裡面新增一個 database
ptt
![](https://i.imgur.com/RYVv47T.png)


同時確保你的 IP 有在白名單內: 



> [time=Wed, Jan 5, 2022 1:42 AM]
目前進度：

![](https://i.imgur.com/kG9dur8.png)

![](https://i.imgur.com/8MJbwAv.png)

