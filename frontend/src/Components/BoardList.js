import * as React from 'react';
import  {DataGrid}  from '@material-ui/data-grid';
import styled from 'styled-components';

//set styled div
const StyledDiv = styled.div`
    height: 60vh;
    width: 80%;
    max-width: 1200px;
`

const GET_ALLBOARDS_QUERY ={
  "data": {
    "allBoards": [
      {
        "id":1,
        "brdname": "Baseball",
        "type": "board",
        "class": "棒球",
        "title": "[棒球] United For Baseball",
        "moderators": [
          "test"
        ]
      },
      {
        "id":2,
        "brdname": "C_Chat",
        "type": "board",
        "class": "閒談",
        "title": "[希洽] 求求你們不要再發系列文了",
        "moderators": [
          "test"
        ]
      },
      {
        "id":3,
        "brdname": "Gossiping",
        "type": "board",
        "class": "八卦",
        "title": "今晚我想來點...",
        "moderators": []
      },
      {
        "id":4,
        "brdname": "HatePolitics",
        "type": "board",
        "class": "Hate",
        "title": "[政黑]這裡是正黑旗",
        "moderators": [
          "test"
        ]
      },
      {
        "id":5,
        "brdname": "Lifeismoney",
        "type": "board",
        "class": "省錢",
        "title": "[省錢] 省錢板",
        "moderators": [
          "test"
        ]
      },
      {
        "id":6,
        "brdname": "LoL",
        "type": "board",
        "class": "遊戲",
        "title": "[LoL] 季後賽開始 快來參選板主",
        "moderators": [
          "test"
        ]
      },
      {
        "id":7,
        "brdname": "MobileComm",
        "type": "board",
        "class": "資訊",
        "title": "[通訊] Sony 1/5/10 III 新機登場",
        "moderators": [
          "test"
        ]
      },
      {
        "id":8,
        "brdname": "NBA",
        "type": "board",
        "class": "籃球",
        "title": "[NBA] 2021賽季開始了",
        "moderators": [
          "test"
        ]
      },
      {
        "id":9,
        "brdname": "sex",
        "type": "board",
        "class": "sex ",
        "title": "三位一體～",
        "moderators": []
      },
      {
        "id":10,
        "brdname": "Stock",
        "type": "board",
        "class": "學術",
        "title": "[股板] #DogeDay420",
        "moderators": [
          "test"
        ]
      },
      {
        "id":11,
        "brdname": "WhoAmI",
        "type": "board",
        "class": "嘰哩",
        "title": "呵呵，猜猜我是誰！",
        "moderators": []
      }
    ]
  }
}

const columns = [
  {
    field: 'brdname',
    headerName: 'BoardName',
    flex: 1
    // width: 200,
    // editable: true,
  },
  {
    field: 'class',
    headerName: 'class',
    flex: .5
    // type: 'number',
    // width: 110,
    // editable: true,
  },
  {
    field: 'title',
    headerName: 'title',
    flex: 1
    // type: 'number',
    // width: 250,
    // editable: true,
  },
  {
    field: 'moderators',
    headerName: 'moderators',
    flex: .5
    // type: 'number',
    // width: 110,
    // editable: true,
  }
];

const rows = [
  { id: 1, BoardName: 'Snow', BoardEName: 'Jon', detail: 35 },
  { id: 2, BoardName: 'Snow', BoardEName: 'Jon', detail: 35 },
  { id: 3, BoardName: 'Snow', BoardEName: 'Jon', detail: 35 },
  { id: 4, BoardName: 'Snow', BoardEName: 'Jon', detail: 35 }

];

export default function DataTable() {
  return (
    <StyledDiv>
      <DataGrid
        rows={GET_ALLBOARDS_QUERY.data.allBoards}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
      />
    </StyledDiv>
  );
}