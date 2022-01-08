import Button from '@material-ui/core/Button';
import styled from 'styled-components';
// import MessageBox from './old/MessageBox';
import Article from '../../Components/Article';
import ArticleCard from '../../Components/ArticleCard'

import { useParams, useHistory } from 'react-router-dom';
import { useQuery } from '@apollo/client';


//query某看板後拿回的簡要文章列表

const GET_BOARD_QUERY = 
    {
      "data": {
        "board": {
          "brdname": "Gossiping",
          "articles": [
            {
              "aid": "M.1629532660.A.AAF",
              "owner": "SYSOP",
              "title": "[問題] Ffff",
              "create_time": 1629532660000
            },
            {
              "aid": "M.1619322699.A.2E4",
              "owner": "test63955",
              "title": "[閒聊] [e:] 爆卦] 游錫堃聲明:帳號被盜!",
              "create_time": 1619322699000
            },
            {
              "aid": "M.1619322699.A.DAD",
              "owner": "test23584",
              "title": "[閒聊] [e:] 問卦] 以前的人為什麼生這麼多小孩？",
              "create_time": 1619322699000
            },
            {
              "aid": "M.1619322699.A.2B3",
              "owner": "test16206",
              "title": "[閒聊] [e:] 新聞] 「卡神」案延燒開除楊蕙如黨籍？林飛帆：",
              "create_time": 1619322699000
            },
            {
              "aid": "M.1619322698.A.AEA",
              "owner": "test5263",
              "title": "[閒聊] [e:] 爆卦] 游錫堃聲明:帳號被盜!",
              "create_time": 1619322698000
            },
            {
              "aid": "M.1619322698.A.B5F",
              "owner": "test13778",
              "title": "[問卦] xvideo的優勢是什麼",
              "create_time": 1619322698000
            },
            {
              "aid": "M.1619322698.A.F0E",
              "owner": "test89788",
              "title": "[問卦] PTT現在的形象怎麼樣?",
              "create_time": 1619322698000
            },
            {
              "aid": "M.1619322698.A.D1D",
              "owner": "test23137",
              "title": "[新聞] 企業號來了 英艦正穿行台灣海峽",
              "create_time": 1619322698000
            },
            {
              "aid": "M.1619322697.A.E06",
              "owner": "test111715",
              "title": "[新聞] 毓蘭質疑女警穿便衣對付陳宜民 817字嗆",
              "create_time": 1619322697000
            },
            {
              "aid": "M.1619322697.A.878",
              "owner": "test71380",
              "title": "[問卦] 這個難度很高嗎？",
              "create_time": 1619322697000
            },
            {
              "aid": "M.1619322697.A.C51",
              "owner": "test89445",
              "title": "[閒聊] [e:] 新聞] 林佳新：蔡英文三不 恐使台灣走向戰爭邊",
              "create_time": 1619322697000
            },
            {
              "aid": "M.1619322697.A.04A",
              "owner": "test159917",
              "title": "[問卦] 八方 vs 四海 兜幾?!!",
              "create_time": 1619322697000
            },
            {
              "aid": "M.1619322696.A.1CF",
              "owner": "test109898",
              "title": "[新聞] 林佳新：蔡英文三不 恐使台灣走向戰爭邊",
              "create_time": 1619322696000
            },
            {
              "aid": "M.1619322696.A.010",
              "owner": "test64836",
              "title": "[問卦] 有無真台女的八卦?",
              "create_time": 1619322696000
            },
            {
              "aid": "M.1619322696.A.105",
              "owner": "test64789",
              "title": "[爆卦] 游錫堃聲明:帳號被盜!",
              "create_time": 1619322696000
            },
            {
              "aid": "M.1619322696.A.ED3",
              "owner": "test135117",
              "title": "[問卦] 女生出門前化妝要多久啊？",
              "create_time": 1619322696000
            },
            {
              "aid": "M.1619322695.A.C0A",
              "owner": "test63845",
              "title": "[問卦] 2萬預算買機械還是apple watch",
              "create_time": 1619322695000
            },
            {
              "aid": "M.1619322695.A.C09",
              "owner": "test41334",
              "title": "[問卦] 有沒有外面在放歌的卦（在線等",
              "create_time": 1619322695000
            },
            {
              "aid": "M.1619322695.A.349",
              "owner": "test30101",
              "title": "[問卦] 立成怎麼找得到那麼多女生出來賣",
              "create_time": 1619322695000
            },
            {
              "aid": "M.1619322694.A.E60",
              "owner": "test37456",
              "title": "[閒聊] [w:] 新聞]橘子集團助攻台灣籃壇，力挺ABL寶島夢想家",
              "create_time": 1619322694000
            },
            {
              "aid": "M.1619322694.A.231",
              "owner": "test106474",
              "title": "[問卦] 新生命教會",
              "create_time": 1619322694000
            },
            {
              "aid": "M.1619322694.A.C0A",
              "owner": "test112461",
              "title": "[閒聊] [e:] 問卦] 有沒有中國真實情況的八卦",
              "create_time": 1619322694000
            },
            {
              "aid": "M.1619322694.A.1BE",
              "owner": "test20351",
              "title": "[新聞] 年銷二億杯 珍奶獲選日本年度美食",
              "create_time": 1619322694000
            },
            {
              "aid": "M.1619322693.A.9EF",
              "owner": "test151420",
              "title": "[問卦] 卡神的3000帳號是怎麼來的?",
              "create_time": 1619322693000
            },
            {
              "aid": "M.1619322693.A.557",
              "owner": "test141860",
              "title": "[閒聊] [e:] 新聞] 質疑蔡壁如、學姐辭職領年終？柯文哲批綠",
              "create_time": 1619322693000
            },
            {
              "aid": "M.1619322693.A.D93",
              "owner": "test143229",
              "title": "[問卦] SLOW到底是台灣英雄還是罪人?",
              "create_time": 1619322693000
            },
            {
              "aid": "M.1619322692.A.031",
              "owner": "test20353",
              "title": "[問卦] 朋友帶女生上合歡山追雪？笑死",
              "create_time": 1619322692000
            },
            {
              "aid": "M.1619322692.A.37E",
              "owner": "test47394",
              "title": "[新聞] 前立委起底楊蕙如 她唸成大時就鑽漏洞賺",
              "create_time": 1619322692000
            },
            {
              "aid": "M.1619322692.A.E74",
              "owner": "test49525",
              "title": "[閒聊] [e:] 問卦] 以前的人為什麼生這麼多小孩？",
              "create_time": 1619322692000
            },
            {
              "aid": "M.1619322692.A.86A",
              "owner": "test31164",
              "title": "[閒聊] [e:] 新聞] 21歲甜美病嬌女刺殺愛男　「我太喜歡他，",
              "create_time": 1619322692000
            },
            {
              "aid": "M.1619322691.A.6F3",
              "owner": "test158974",
              "title": "[問卦] 急！！！吃拉麵旁邊的女生在用MoPTT！？",
              "create_time": 1619322691000
            },
            {
              "aid": "M.1619322691.A.6A9",
              "owner": "test125672",
              "title": "[問卦] 從小到大沒蛀牙是都市傳說?",
              "create_time": 1619322691000
            },
            {
              "aid": "M.1619322691.A.7E5",
              "owner": "test171159",
              "title": "[問卦] 喜酒這桌要多少啊",
              "create_time": 1619322691000
            },
            {
              "aid": "M.1619322690.A.EB3",
              "owner": "test162673",
              "title": "[問卦] 炒蟑螂是在移轉什麼焦點呢？",
              "create_time": 1619322690000
            },
            {
              "aid": "M.1619322690.A.F43",
              "owner": "test166460",
              "title": "[問卦] 台灣也思？Yes?",
              "create_time": 1619322690000
            },
            {
              "aid": "M.1619322690.A.BF6",
              "owner": "test78307",
              "title": "[閒聊] [e:] 問卦] F18降落時中國的反應是？",
              "create_time": 1619322690000
            },
            {
              "aid": "M.1619322690.A.1EA",
              "owner": "test124866",
              "title": "[問卦] 35歲的你，身邊有一個愛你的人嗎？",
              "create_time": 1619322690000
            },
            {
              "aid": "M.1619322689.A.9BD",
              "owner": "test17036",
              "title": "[閒聊] [e:] 新聞] 「偽鈔大師」國中畢業狂印3.3億美金 騙過驗鈔機",
              "create_time": 1619322689000
            },
            {
              "aid": "M.1619322689.A.AA6",
              "owner": "test120593",
              "title": "[新聞] 夫人干政？王淺秋上陣　傳因李佳芬欽點",
              "create_time": 1619322689000
            },
            {
              "aid": "M.1619322689.A.083",
              "owner": "test156213",
              "title": "[閒聊] [e:] 新聞] 「卡神」案延燒開除楊蕙如黨籍？林飛帆：",
              "create_time": 1619322689000
            },
            {
              "aid": "M.1619322688.A.0B4",
              "owner": "test68576",
              "title": "[問卦] 鑰匙圈要怎麼挑",
              "create_time": 1619322688000
            },
            {
              "aid": "M.1619322688.A.888",
              "owner": "test123086",
              "title": "[問卦] 初階主管是不是最賽的缺？",
              "create_time": 1619322688000
            },
            {
              "aid": "M.1619322688.A.186",
              "owner": "test82696",
              "title": "[問卦] 錢多事少離家近該怎麼選擇？",
              "create_time": 1619322688000
            },
            {
              "aid": "M.1619322687.A.AEA",
              "owner": "test274",
              "title": "[問卦] 慟! 浜辺美波去義大利出外景的卦?",
              "create_time": 1619322687000
            },
            {
              "aid": "M.1619322687.A.D86",
              "owner": "test155331",
              "title": "[閒聊] [e:] 問卦] 謝和弦代表的是臺灣哪種人",
              "create_time": 1619322687000
            },
            {
              "aid": "M.1619322687.A.831",
              "owner": "test155331",
              "title": "[閒聊] [e:] 問卦] 擁有3000個PTT帳號能幹嘛？",
              "create_time": 1619322687000
            },
            {
              "aid": "M.1619322687.A.9CE",
              "owner": "test122808",
              "title": "[問卦] 有沒有九成五新的八卦?",
              "create_time": 1619322687000
            },
            {
              "aid": "M.1619322686.A.FED",
              "owner": "test137327",
              "title": "[新聞] 馬英九轟蔡英文不配談護主權 馬維拉護主",
              "create_time": 1619322686000
            },
            {
              "aid": "M.1619322686.A.360",
              "owner": "test123584",
              "title": "[問卦] 搬不動瓦斯桶怎麼辦",
              "create_time": 1619322686000
            },
            {
              "aid": "M.1619322686.A.59E",
              "owner": "test41716",
              "title": "[問卦] 擁有3000個PTT帳號能幹嘛？",
              "create_time": 1619322686000
            }
          ]
        }
      }
    }

const GET_NEWEST_ARTICLES_QUERY = {
    "data": {
      "newestArticles": [
        {
          "brdname": "WhoAmI",
          "title": "[討論] [測試] 有沒有編輯文章功能？",
          "owner": "test3251",
          "create_time": 1641387652000
        },
        {
          "brdname": "C_Chat",
          "title": "[問題] Gdgdfg",
          "owner": "SYSOP",
          "create_time": 1639204933000
        },
        {
          "brdname": "C_Chat",
          "title": "[新聞] Kg",
          "owner": "SYSOP",
          "create_time": 1637848118000
        },
        {
          "brdname": "C_Chat",
          "title": "[討論] Hrchhh",
          "owner": "SYSOP",
          "create_time": 1637400211000
        }
      ]
    }
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 500px;
  width: 800px;
  margin: auto;
`;

const Board = () =>{
  const {brdname} = useParams()
  const {data: newestArticles, error, isLoading} = useQuery()


    return(
      <Wrapper>
           {/* <Button variant="contained">Default</Button> */}
          <>{GET_NEWEST_ARTICLES_QUERY.data.newestArticles.map((item)=>(
              <ArticleCard
                  brdname={newestArticles.brdname}
                  title={newestArticles.title}
                  owner={newestArticles.owner}
                  create_time={newestArticles.create_time}
              />
          ))}  
          </>
        </Wrapper>
    )
}

export default Board;
