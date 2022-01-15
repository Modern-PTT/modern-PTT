import Button from '@material-ui/core/Button';
import styled from 'styled-components';
// import MessageBox from './old/MessageBox';
import Article from '../../Components/Article';
import ArticleCard from '../../Components/News/ArticleCardPro'

// import  graphql  from 'graphql';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { GET_BOARD_QUERY, UPDATE_FAV_ARTICLES_MUTATION } from "../../graphql";
import { useState, useEffect, useContext } from 'react';
import moment from 'moment';

import Navbar from "../../Components/News/NavbarPro"
import DashBoard from "../../Components/DashBoard"
import BoardNameCard from '../../Components/BoardNameCard';

import { pttContext } from '../App'
//query某看板後拿回的簡要文章列表

import { MEDIA_QUERY_MD, MEDIA_QUERY_XL } from '../../css/Media_query';

//set styled div
const StyledDiv = styled.div`
    padding-left: 1rem;
    padding-right: 1rem;
    width: 100%;
    grid-template-columns: 1fr 3fr;
    .dashBoard{
        display: none;
        position: fixed;
    }
    .wrapper{
        width: 100%;
        border: solid 1px rgba(0,0,0,0.1);
        padding: 100px 10px;
        padding-top: 50px;
        overflow: scroll;
        height: 90vh;

    }
    ${MEDIA_QUERY_MD}{
      .wrapper{
            justify-self: start;
            max-width: 1200px;
            padding: 120px 30px 100px 30px;
        }
    }
    ${MEDIA_QUERY_XL}{
        display: grid;
        grid-template-columns: 1fr 3fr;
        justify-content: center;
        align-content: center;
        padding-top: 120px;
        
        .dashBoard{
            justify-self: center;
            align-self: center;
        }
        .wrapper{
            justify-self: start;
            max-width: 1200px;
            padding: 120px 30px 100px 30px;
        }
    }
    
`



const Board =  () => {

  const {
    favArticles, 
    setFavArticles, 
    isLogIn, 
    username, 
    myHashPassword
  } = useContext(pttContext)

  const navigate = useNavigate();

  const [articles, setArticles] = useState('');

  const [updateFavArticles] = useMutation(UPDATE_FAV_ARTICLES_MUTATION)


  const { brdname } = useParams()
  const { data, error, loading } = useQuery(GET_BOARD_QUERY, {
    variables: {
      brdname: brdname,
    }
  })

  const showTime = (time) => {
    return moment(time).format('YYYY/MM/DD hh:mm:ss')
  }

  useEffect(() => {
    if(data){
      if (data.board) setArticles(data.board.articles);
      else navigate('/404')
    }
  }, [data])

 

  return (
    <>
      <Navbar />
      <StyledDiv className="contents page-container">
        <DashBoard
          className="dashBoard" />
        <div className="wrapper bordered">
        <BoardNameCard nowAtWhere={brdname} />
          {articles ? articles.map((item) => (
            <ArticleCard
              key={item.aid}
              item={item}
             
            />
          )) : ''}
        </div>
      </StyledDiv>
    </>
  );

}

export default Board;

