// import Button from '@material-ui/core/Button';
import styled from 'styled-components';
import React from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Link from '@mui/material/Link';
import {useState, useEffect, useContext} from 'react'
import { pttContext } from '../../Containers/App';
import moment from 'moment';

import { MEDIA_QUERY_MD,MEDIA_QUERY_LG,MEDIA_QUERY_XL } from '../../css/Media_query';

const Wrapper = styled.div`
  display: grid;
  grid-template: auto auto / auto auto;
  grid-row-gap: 10px;
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
    grid-column: 1 / span 2;
  }
  .boardName{
    font-size: 1rem;
    color: rgba(0,0,0,0.8);
  }
  .title{
    font-size: 1.2rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 100%;
  }
  .owner{
    font-size: .8rem;
    color: rgba(0,0,0,0.6);
  }
  .date{
    font-size: .6rem;
    color: rgba(0,0,0,0.6);
    align-self: flex-end;
    justify-self: end;
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
const showTime = (time)=>{
  return moment(time).format('YYYY/MM/DD hh:mm:ss')
}

export default function ArticleCard({item, showBrdname}) {
  

  const {
    favArticles,
    setFavArticles
  } = useContext(pttContext)

  const AddLoveArticles = (input) =>{
    console.log(input)
    setFavArticles(favArticles.concat(input));
  }

  useEffect(() => {
  }, [favArticles])

  
  return (
    (item.deleted)?
    <Wrapper className="bordered">
      <div className="main deleted ">
        本文章已刪除
      </div>
    </Wrapper>
    :
      <Wrapper className="bordered">
          <div className="boardName">
          {item.push - item.boo}
                        {(showBrdname)?<>{item.brdname}</>:<></>}
          </div>
        <Link underline="none" href={`/${item.brdname}/${item.aid}`} className="main font-color-link ">
          <div className="title">
            {item.title}
          </div>
        </Link>
          <div className="owner">
            {item.owner}
          </div>
        <div className="date">
         {showTime(item.create_time)}
        </div>
        {/* <div className="heart">
          <FavoriteIcon onClick={()=>AddLoveArticles(aid)}/>
        </div> */}
      </Wrapper>
    
  );
}

