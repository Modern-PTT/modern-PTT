// import Button from '@material-ui/core/Button';
import styled from 'styled-components';
import React from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Link from '@mui/material/Link';
import {useState, useEffect, useContext} from 'react'
import { pttContext } from '../../Containers/App';

import { MEDIA_QUERY_MD,MEDIA_QUERY_LG,MEDIA_QUERY_XL } from '../../css/Media_query';

const Wrapper = styled.div`
  display: grid;
  grid-template: auto auto / auto auto;
  grid-row-gap: 20px;
  width: 100%;
  padding: 1.2rem;
  padding-left: 2rem;
  border-radius: 10px;
  margin: 7px;
  margin-left: auto;
  margin-right: auto;
  overflow: scroll;
  .main{
    width: 100%;
    font-size: 1.5rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    grid-column: 1 / span 2;
  }
  .date{
    font-size: .6rem;
    align-self: flex-end;
  }
  .heart{
    justify-self: end;
    color: rgba(0,0,0,0.1);
  }
  ${MEDIA_QUERY_MD}{
    width: 80%;
  }
  ${MEDIA_QUERY_XL}{
    max-width: 800px;
  }
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

  const AddLoveArticles = (input) =>{
    console.log(input)
    setFavArticles(favArticles.concat(input));
  }

  useEffect(() => {
    console.log(favArticles)
  }, [favArticles])

  
  return (
    (deleted)?
    <Wrapper className="bordered">
      <div className="main deleted ">
        本文章已刪除
      </div>
    </Wrapper>
    :
      <Wrapper className="bordered">
        <Link underline="none" href="/home" className="main font-color-link ">
          <div className="boardName">
            {brdname}
          </div>
          <div className="title">
            {title}
          </div>
          <div className="owner">
            {owner}
          </div>
        </Link>
        <div className="date">
          {create_time}
        </div>
        <div className="heart">
          <FavoriteIcon onClick={()=>AddLoveArticles(aid)}/>
        </div>
      </Wrapper>
    
  );
}

