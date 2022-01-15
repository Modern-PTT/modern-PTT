// import Button from '@material-ui/core/Button';
import styled from 'styled-components';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Row from './Layout/Row';
import Link from '@mui/material/Link';
import {useContext} from 'react'
import { pttContext } from '../Containers/App';
import moment from 'moment-timezone';
const useStyles = makeStyles({
  root: {
    
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
      // margin: theme.spacing(1),
      // width: 'auto',
    },
  },
}));

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: auto;
`;


const msgState = (input)=>{
  if (input == "1")return "👍"
  else if (input == "2")return "👎🏼"
  else return "-"
}

const showTime = (time)=>{
  return moment(time).format('YYYY/MM/DD HH:mm:ss')
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
                    <Row justify="space-between">
                      
                        <>{item.push - item.boo}
                        {(showBrdname)?<>{item.brdname}</>:<></>}

                        <Link underline="none" href={`/${item.brdname}/${item.aid}`}>
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

            </CardContent>
        </Card>
      </Wrapper>
    
  );
}
