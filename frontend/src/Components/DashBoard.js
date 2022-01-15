import React from 'react';
import {useState} from 'react';
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

import { MEDIA_QUERY_MD, MEDIA_QUERY_LG, MEDIA_QUERY_XL } from '../css/Media_query';
//do styling
const StyledDiv = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  padding: 50px 10px;
  height: 100vh;
  transition: .5s;
  transform: ${({ open }) => open ? 'translateX(0%)' :'translateX(-100%)'};
  .link{
    border-radius: 10px;
  }
  ${MEDIA_QUERY_MD}{
    padding: 90px 10px;
  }
  ${MEDIA_QUERY_XL}{
    transform: translateX(0%);
    position: relative;
    z-index: unset;
    padding: 30px 10px;
    height: fit-content;
    justify-self: center;
  }
`
const StyledBurger = styled.button`
  position: fixed;
  top: 1rem;
  left: 1.2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-end;
  width: 2rem;
  height: 1.5rem;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 1000;

  &:focus {
    outline: none;
  }

  div {
    width: 2rem;
    height: 0.2rem;
    background: ${({ open }) => open ? 'linear-gradient(to right, #E100FF, #7F00FF);' : 'rgba(0,0,0,0.2)'};
    border-radius: 5px;
    transition: all 0.3s linear;
    position: relative;
    transform-origin: 1px;
    :first-child {
      transform: ${({ open }) => open ? 'rotate(45deg)' : 'rotate(0)'};
    }

    :nth-child(2) {
        width: ${({ open }) => open ? '2rem' : '1.5rem'};
        transform-origin: 12px 6px;
        transform: ${({ open }) => open ? 'rotate(-45deg)' : 'rotate(0)'};
    }
  }
  ${MEDIA_QUERY_MD}{
        right: 1.5rem;
        top: 1.5rem;
        width: 3rem;
  }
  ${MEDIA_QUERY_XL}{
        display: none;
  }
`

// TODO: query user loves:
const GET_LOVE_BOARDS = ["gossip", "baseball", "NTU"]



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
  
  const [open, setOpen] = useState(false);
  const {
    favBoards,
    setFavBoards
  } = useContext(pttContext)


  const classes = useStyles();

  const handleRemove = (remove_one)=>{
    favBoards.filter("gossip")
    console.log("after:"+ favBoards)
  }
  

  return (<>
  <StyledBurger open={open} onClick={() => setOpen(!open)}>
      <div />
      <div />
    </StyledBurger>
    <StyledDiv open={open} className={classes.root+' bordered background-glass'}>
      <List component="nav" aria-label="main mailbox folders">
          <Link className="link" underline="none" href="/allboards">
        <ListItem button id="popular">
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
            <ListItemText primary="所有看板" />
        </ListItem>
          </Link>
          <Link className="link" underline="none" href="/hotboards">
        <ListItem button id="separate" >
          <ListItemIcon>
            <DraftsIcon />
          </ListItemIcon>
            <ListItemText primary="熱門看板" />
        </ListItem>
          </Link>

          <Link className="link" underline="none" href="/lavboards">
        <ListItem button id="all">
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
            <ListItemText primary="最愛看板" />
          </ListItem>
          </Link>

          <Divider />
          <Link className="link" underline="none" href="/myLoveArticles">
        <ListItem button id="separate">
          <ListItemIcon>
            <DraftsIcon />
          </ListItemIcon>
            <ListItemText primary="收藏文章" />
        </ListItem>
          </Link>
      </List>
    </StyledDiv>
    </>
  );
}
