# Modern PTT

## Warning
* 目前所有看板文章資料皆與 PTT 獨立
## Feature
* （偽）熱門看板
* 文章閱讀
* 全站所有看板
* 全站最新文章

## 加密架構
- 前端 <-> 後端：HTTP TLS 加密
- 後端 -> 資料庫：bcrypt 將密碼做 hash
## Reference
* Schema 參考 / 抓取部分資料預寫入 DB
    - [openbbs-middleware - Swagger UI](https://api.devptt.site:5000/)
* PTT 文章編號與 URL 產生
    - [pttbbs/aids.txt at master · ptt/pttbbs - GitHub](https://github.com/ptt/pttbbs/blob/master/docs/aids.txt)
    - [[聊天] 文章代碼轉網址 - 看板 PttEarnMoney - 批踢踢實業坊](https://www.ptt.cc/bbs/PttEarnMoney/M.1566319802.A.35E.html)
    - [Ptt 文章代碼(AID)與網址轉換 - illya.tw](https://illya.tw/ptt-aid)
* 取得 ip 的地理位置
    - [geoip-lite/node-geoip - GitHub](https://github.com/geoip-lite/node-geoip)