import Button from '@material-ui/core/Button';
import styled from 'styled-components';
// import MessageBox from './old/MessageBox';
import Article from '../../Components/Article';
import ArticleCard from '../../Components/ArticleCard'

// import  graphql  from 'graphql';
import { useParams, useHistory } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_ARTICLE_QUERY } from "../../graphql";
import { useState, useEffect, useContext} from 'react';

import Navbar from "../../Components/Navbar"
import DashBoard from "../../Components/DashBoard"
//query某看板後拿回的簡要文章列表


const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 500px;
  width: 800px;
  margin: auto;
`;

const Board =  ({myLoveArticles, setMyLoveArticles,isLogIn,username,myHashPassword}) =>{
  const [articles, setArticles] = useState('');

  const {aid, brdname} = useParams()
  console.log(aid)
  console.log(brdname)
  const {data, error, loading} =  useQuery(GET_ARTICLE_QUERY,{
    variables: {
      aid: aid,
    }
  })
  
//   useEffect(() => {
//     if(data) {
//         setArticles(data.articles);
//         console.log("42"+data.title)
//     }
//   }, [data])


    return(
      <>
        <Navbar  />
        <div className="contents">
            <DashBoard />
        </div>
        <Wrapper>
            {/* {console.log(data.article)} */}
            {(data)?
            <Article
                article={data.article}
                myLoveArticles={myLoveArticles}
                setMyLoveArticles={setMyLoveArticles}
                username={username}
                myHashPassword={myHashPassword}
            />:<></>}
        </Wrapper>
    </>);

}

export default Board;

