// import Button from '@material-ui/core/Button';
import styled from 'styled-components';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { Divider, ListItem } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Row from './Layout/Row';
import Column from './Layout/Column';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import ArchiveIcon from '@mui/icons-material/Archive';
import FavoriteIcon from '@mui/icons-material/Favorite';
import NotificationAddIcon from '@mui/icons-material/NotificationAdd';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import Link from '@mui/material/Link';
import {useState, useEffect, useContext} from 'react'
import { pttContext } from '../Containers/App';
import moment from 'moment';
const useStyles = makeStyles({
  root: {
    minWidth: 700,
    // align-items: "space-between",
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const useTextStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      // width: 'auto',
    },
  },
}));

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100px;
  width: 800px;
  margin: auto;
`;


const msgState = (input)=>{
  if (input == "1")return "👍"
  else if (input == "2")return "👎🏼"
  else return "-"
}

const showTime = (time)=>{
  return moment(time).format('YYYY/MM/DD hh:mm:ss')
}

export default function ArticleCard( {item, showBrdname} ) {
  

  const {
    favArticles,
    setFavArticles
  } = useContext(pttContext)
  
  
  const classes = useStyles();
  const classesText = useTextStyles();
  const bull = <span className={classes.bullet}>•</span>;

  const AddLoveArticles = (input) =>{
    console.log(input)
    setFavArticles(favArticles.concat(input));
  }

  // useEffect(() => {
  //   console.log(favArticles)
  // }, [favArticles])

  
  return (
    (item.deleted)?
    <Wrapper>
      <Card className={classes.root} variant="outlined">
          <CardContent>
           本文章已刪除
          </CardContent>
      </Card>
    </Wrapper>
    :
      <Wrapper>
        <Card className={classes.root} variant="outlined">
            <CardContent>
                    {/* <Typography className={classes.title} color="textSecondary" gutterBottom> */}
                    <Row justify="space-between">
                      
                        <>{item.push - item.boo}
                        {(showBrdname)?<>{item.brdname}</>:<></>}

                        <Link href={`/${item.brdname}/${item.aid}`}>
                        {item.title}
                          </Link> 
                        {item.owner}</>


                      <>{showTime(item.create_time)}</>
                      <div>
                      {/* <Tooltip title="收藏">
                          <IconButton onClick={()=>AddLoveArticles(aid)}>
                            <FavoriteIcon />
                          </IconButton>
                        </Tooltip> */}
                        {/* <Tooltip title="追蹤">
                          <IconButton>
                            <NotificationAddIcon />
                          </IconButton>
                        </Tooltip>
                        <Button size="small" variant="contained" color="primary">追蹤</Button> */}
                      </div>
                    </Row>
                    {/* </Typography> */}

            </CardContent>
            {/* <CardActions>
                <Button size="small">留言</Button>
            </CardActions> */}
        </Card>
      </Wrapper>
    
  );
}
