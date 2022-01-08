import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import styled from 'styled-components';
import Link from '@mui/material/Link';

//do styling
const StyledDiv = styled.div`
  border: solid 1px grey;
  border-radius: 10px;
`

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 250,
    backgroundColor: theme.palette.background.paper,
  },
}));

const BoardListData = 
  {
    "data": {
      "boards": [
        {
          "brdname": "Baseball",
          "type": "board",
          "class": "棒球",
          "title": "[棒球] United For Baseball",
          "moderators": [
            "test"
          ]
        },
        {
          "brdname": "C_Chat",
          "type": "board",
          "class": "閒談",
          "title": "[希洽] 求求你們不要再發系列文了",
          "moderators": [
            "test"
          ]
        },
        {
          "brdname": "Gossiping",
          "type": "board",
          "class": "八卦",
          "title": "今晚我想來點...",
          "moderators": []
        },
        {
          "brdname": "HatePolitics",
          "type": "board",
          "class": "Hate",
          "title": "[政黑]這裡是正黑旗",
          "moderators": [
            "test"
          ]
        },
        {
          "brdname": "Lifeismoney",
          "type": "board",
          "class": "省錢",
          "title": "[省錢] 省錢板",
          "moderators": [
            "test"
          ]
        },
        {
          "brdname": "LoL",
          "type": "board",
          "class": "遊戲",
          "title": "[LoL] 季後賽開始 快來參選板主",
          "moderators": [
            "test"
          ]
        },
        {
          "brdname": "MobileComm",
          "type": "board",
          "class": "資訊",
          "title": "[通訊] Sony 1/5/10 III 新機登場",
          "moderators": [
            "test"
          ]
        },
        {
          "brdname": "NBA",
          "type": "board",
          "class": "籃球",
          "title": "[NBA] 2021賽季開始了",
          "moderators": [
            "test"
          ]
        },
        {
          "brdname": "sex",
          "type": "board",
          "class": "sex ",
          "title": "三位一體～",
          "moderators": []
        },
        {
          "brdname": "Stock",
          "type": "board",
          "class": "學術",
          "title": "[股板] #DogeDay420",
          "moderators": [
            "test"
          ]
        },
        {
          "brdname": "WhoAmI",
          "type": "board",
          "class": "嘰哩",
          "title": "呵呵，猜猜我是誰！",
          "moderators": []
        },
        {
          "brdname": "test",
          "type": "board",
          "class": "測試",
          "title": "測試",
          "moderators": [
            "test"
          ]
        }
      ]
    }
  }

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

export default function SimpleList() {
  const classes = useStyles();

  return (
    <StyledDiv className={classes.root}>
      <List component="nav" aria-label="main mailbox folders">
      <ListItem button id="q1">
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <Link >
            <ListItemText primary="123" />
          </Link>
        </ListItem>
        <ListItem button id="popular">
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <Link href="hot">
            <ListItemText primary="熱門看板" />
          </Link>
        </ListItem>
        <ListItem button id="separate" value="separates" onClick={(e) => console.log(e.target.value)}>
          <ListItemIcon>
            <DraftsIcon />
          </ListItemIcon>
          <Link href="category">
            <ListItemText primary="分類看板" />
          </Link>
        </ListItem>
      </List>
      <Divider />
      <List component="nav" aria-label="secondary mailbox folders">
        {/* {BoardListData.map((item) => (
          <ListItem button id={item.ename}>
            <ListItemText primary={item.ename} secondary={item.board_detail} />
          </ListItem>
        ))} */}
      </List>
    </StyledDiv>
  );
}
