// import Button from '@material-ui/core/Button';
import styled from 'styled-components';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Row from './Layout/Row';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Link from '@mui/material/Link';
import {useState, useEffect, useContext} from 'react'
import { pttContext } from '../Containers/App';

const useStyles = makeStyles({
  root: {
    // minWidth: 700,
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


export default function ArticleCard({brdname,title,owner,create_time,aid,deleted}) {
  

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

  useEffect(() => {
    console.log(favArticles)
  }, [favArticles])

  
  return (
    (deleted)?
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
                      <Link underline="none" href={`/boards/${brdname}/${aid}`}>
                        <>{brdname} {title} {owner}</>
                      </Link>

                      <>{create_time}</>
                      <div>
                      <Tooltip title="收藏">
                          <IconButton onClick={()=>AddLoveArticles(aid)}>
                            <FavoriteIcon />
                          </IconButton>
                        </Tooltip>
                      </div>
                    </Row>

            </CardContent>
        </Card>
      </Wrapper>
    
  );
}
