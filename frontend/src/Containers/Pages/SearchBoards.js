import styled from 'styled-components';
import ArticleCard from '../../Components/ArticleCard'

// import  graphql  from 'graphql';
import { useParams, useHistory } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_BOARD_ARTICLES_QUERY } from "../../graphql";
import { useState, useEffect} from 'react';

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

const Board =  ({myLoveArticles, setMyLoveArticles}) =>{
  const [articles, setArticles] = useState('');

  const {brdname} = useParams()
  console.log(brdname)
  const {data, error, loading} =  useQuery(GET_BOARD_ARTICLES_QUERY,{
    variables: {
      brdname: brdname,
    }
  })
  
  useEffect(() => {
    if(data) setArticles(data.board.articles);
  }, [data])


    return(
      <>
        <Navbar />
        <div className="contents">
            <DashBoard />
        </div>
        <Wrapper>
            {/* <Button variant="contained">Default</Button> */}
            <>{articles ? articles.map((item)=>(
                <ArticleCard
                    brdname={item.brdname}
                    title={item.title}
                    owner={item.owner}
                    create_time={item.create_time}
                    aid={item.aid}
                    deleted={item.deleted}
                    myLoveArticles={myLoveArticles}
                    setMyLoveArticles={setMyLoveArticles}
                />
            )): ''}  
            </>
          </Wrapper>
    </>);

}

export default Board;

