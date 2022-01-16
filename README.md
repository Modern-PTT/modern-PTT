# Modern PTT

## Warning
* 目前所有看板文章資料皆與 PTT 獨立

## Feature
- [x] （偽）熱門看板
- [x] 熱門文章（以推噓積分排序）（在首頁）
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

## Reference
* Schema 參考 / 抓取部分資料預寫入 DB
    - [openbbs-middleware - Swagger UI](https://api.devptt.site:5000/)
* PTT 文章編號與 URL 產生
    - [pttbbs/aids.txt at master · ptt/pttbbs - GitHub](https://github.com/ptt/pttbbs/blob/master/docs/aids.txt)
    - [[聊天] 文章代碼轉網址 - 看板 PttEarnMoney - 批踢踢實業坊](https://www.ptt.cc/bbs/PttEarnMoney/M.1566319802.A.35E.html)
    - [Ptt 文章代碼(AID)與網址轉換 - illya.tw](https://illya.tw/ptt-aid)
    
* 取得 ip 的地理位置
    - [geoip-lite/node-geoip - GitHub](https://github.com/geoip-lite/node-geoip)