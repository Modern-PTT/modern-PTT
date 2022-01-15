import styled from 'styled-components';
import ArticleCard from '../../Components/News/ArticleCardPro'
import { useParams, useHistory } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_ARTICLES_QUERY } from "../../graphql";
import { useState, useEffect, useContext } from 'react';

import { pttContext } from '../App';

import Navbar from "../../Components/News/NavbarPro"
import DashBoard from "../../Components/DashBoard"


import { MEDIA_QUERY_XL } from "../../css/Media_query";



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
        overflow: scroll;
        height: 90vh;

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
        }
    }
    
`

const SearchArticles = () => {


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

  // console.log(
  //   advBoardSearch,
  //   advTitleSearch,
  //   ownerSearch,
  //   timeSearch
  // );

  const [articles, setArticles] = useState('');

  const { data, error, loading } = useQuery(GET_ARTICLES_QUERY, {
    variables: {
      input: {
        brdname: advBoardSearch,
        owner: ownerSearch,
        title: advTitleSearch,
        timerange: timeSearch,
      }
    }
  })

  useEffect(() => {
    if (data) {
      setArticles(data.articles);
      // setAdvTitleSearch([]);
      // setTimeSearch()
      // setOwnerSearch("");
      // setAdvBoardSearch([]);
    }
  }, [data])



  return (
    <>
      <Navbar />
      <StyledDiv className="contents page-container">
        <DashBoard
          className="dashBoard"
        />
        <div className="wrapper bordered">
          <>{articles ? articles.map((item) => (
            <ArticleCard
              showBrdname={true}
              key={item.aid}
              item={item}
            />
          )) : ''}
          </>
        </div>
      </StyledDiv>

    </>
  );

}

export default SearchArticles;

