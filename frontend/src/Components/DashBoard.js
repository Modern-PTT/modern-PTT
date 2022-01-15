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
import Row from '../Components/Layout/Row'

import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

import { pttContext } from '../Containers/App';
import { useContext } from 'react'
//do styling
const StyledDiv = styled.div`
  border: solid 1px grey;
  border-radius: 10px;
`


// TODO: query user loves:
const GET_LOVE_BOARDS = ["gossip", "baseball", "NTU"]

// const LOVEBOARDS =  ["gossip", "baseball", "NTU"]



const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 250,
    backgroundColor: theme.palette.background.paper,
  },
}));


function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

export default function SimpleList() {
  
  const {
    favBoards,
    setFavBoards
  } = useContext(pttContext)


  const classes = useStyles();

  const handleRemove = (remove_one)=>{
    favBoards.filter("gossip")
    console.log("after:"+ favBoards)
  }
  

  return (
    <StyledDiv className={classes.root}>
      <List component="nav" aria-label="main mailbox folders">
        <ListItem button id="q1">
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <Link underline="none" >
            <ListItemText primary="123" />
          </Link>
        </ListItem>
        <ListItem button id="popular">
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <Link underline="none" href="/allboards">
            <ListItemText primary="所有看板" />
          </Link>
        </ListItem>
        <ListItem button id="separate" >
          <ListItemIcon>
            <DraftsIcon />
          </ListItemIcon>
          <Link underline="none" href="/hotboards">
            <ListItemText primary="熱門看板" />
          </Link>
        </ListItem>

        <ListItem button id="all">
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <Link underline="none" href="/lavboards">
            <ListItemText primary="最愛看板" />
          </Link>
          </ListItem>

          <Divider />
        <ListItem button id="separate">
          <ListItemIcon>
            <DraftsIcon />
          </ListItemIcon>
          <Link underline="none" href="/myLoveArticles">
            <ListItemText primary="收藏文章" />
          </Link>
        </ListItem>
      </List>
      
      {/* <List component="nav" aria-label="secondary mailbox folders">
        {(!favBoards)? favBoards.map((item) => (
          <ListItem button id={item} key ={item}>
              <Link href={`/boards/${item}`}>
                <ListItemText primary={item}  />
              </Link>
              <IconButton aria-label="DeleteIcon" onClick={()=>handleRemove(item)}>
                <DeleteIcon />
              </IconButton>
           </ListItem> 
        )):<></>}
      </List> */}
    </StyledDiv>
  );
}
