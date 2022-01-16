# Modern PTT

## Warning
* 目前所有看板文章資料皆與 PTT 獨立

## Feature
- [x] （偽）熱門看板
- [x] （在首頁中）熱門文章（以推噓積分排序）
- [x] 文章閱讀
- [x] 全站所有看板
- [x] 文章搜尋
- [x] 看板搜尋
- [x] 註冊/登入/登出
- [x] 發表/編輯/刪除文章
- [x] 留言（不可刪除）

## TODO
- [ ] 我的最愛看板
- [ ] 收藏文章

## Localhost Install
請先確認 `wp1101/final` 的任何資料夾底下皆沒有 `node_modules` 資料夾，若有請先刪除再進行後續動作。

### 資料庫串接

- clone 此 repo 後，進入此資料夾 (`wp1101/final`)，新增 `.env` 檔案  
    ```
    MONGO_URL=mongodb+srv://...
    PORT=80
    ```
- 申請 MongoDB Altas 帳號，將 connection string 貼到 `.env` 檔案
### 資料匯入
- 至 `wp1101/final/backend/src/mongo.js` 檔案，將第 24 行的 `dataInit()` 去掉註解
### Build & Run
```bash
$ npm install
$ npm run build
$ npm start
```
這樣前後端就會一起跑起來囉～    
然後請看要連到 localhost 的哪個 port。
- 若前面有將 `dataInit()` 去掉註解（即需要匯入資料），請靜待幾分鐘，直到出現 `Database: articles and comments initialized!`
- 若之後不需重新匯入資料，請將資料匯入步驟中的 `dataInit()` 加上註解，再重新開啟 backend

## 其它說明
- 可自行註冊，但目前不能確保使用非英文字母能正常運作，結束評分前請手下留情 <(_ _)>
- 若有想對此 project 提出一些建議，可寄信至 [modernptt@googlegroups.com](mailto:modernptt@googlegroups.com)

## Reference
* PTT BBS 架構
* Schema 參考 / 抓取部分資料預寫入 DB
    - [openbbs-middleware - Swagger UI](https://api.devptt.site:5000/)
* PTT 文章編號與 URL 產生
    - [pttbbs/aids.txt at master · ptt/pttbbs - GitHub](https://github.com/ptt/pttbbs/blob/master/docs/aids.txt)
    - [[聊天] 文章代碼轉網址 - 看板 PttEarnMoney - 批踢踢實業坊](https://www.ptt.cc/bbs/PttEarnMoney/M.1566319802.A.35E.html)
    - [Ptt 文章代碼(AID)與網址轉換 - illya.tw](https://illya.tw/ptt-aid)