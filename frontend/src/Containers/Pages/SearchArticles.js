import styled from 'styled-components';
import ArticleCard from '../../Components/ArticleCard'
import { useParams, useHistory } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_ARTICLES_QUERY } from "../../graphql";
import { useState, useEffect, useContext} from 'react';

import { pttContext } from '../App';

import Navbar from "../../Components/Navbar"
import DashBoard from "../../Components/DashBoard"
import BoardNameCard from '../../Components/BoardNameCard';


const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 500px;
  width: 800px;
  margin: auto;
`;

const SearchArticles =  ( ) =>{

  
  const { 
    advBoardSearch,
    advTitleSearch,
    ownerSearch,
    timeSearch,
    setAdvTitleSearch,
    setTimeSearch,
    setOwnerSearch,
    setAdvBoardSearch
  } = useContext(pttContext)


    const [articles, setArticles] = useState('');

  const {data, error, loading} =  useQuery(GET_ARTICLES_QUERY,{
    variables: {
      input:{
        brdname: advBoardSearch,
        owner:ownerSearch,
        title: advTitleSearch,
        timerange: timeSearch,
      }
    }
  })
  
  useEffect(() => {
    if(data) {
      setArticles(data.articles);
      setAdvTitleSearch([]);
      setTimeSearch()
      setOwnerSearch("");
      setAdvBoardSearch([]);
    }
  }, [data])



  return(
    <>
      <Navbar />
      <div className="contents">
          <DashBoard />
      </div>
      {/* <BoardNameCard nowAtWhere={brdname}/> */}
      <Wrapper>
          <>{articles ? articles.map((item)=>(
              <ArticleCard
                  showBrdname={true}
                  key={item.aid}
                  item={item}
              />
          )): ''}  
          </>
        </Wrapper>
  </>);

}

export default SearchArticles;

