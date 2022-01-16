import Button from '@material-ui/core/Button';
import styled from 'styled-components';
// import MessageBox from './old/MessageBox';
import Article from '../../Components/News/ArticleEdit';
import BoardNameCard from '../../Components/BoardNameCard';

// import  graphql  from 'graphql';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_ARTICLE_QUERY } from "../../graphql";
import { useState, useEffect, useContext} from 'react';

import Navbar from "../../Components/News/NavbarPro"
import DashBoard from "../../Components/DashBoard"
//query某看板後拿回的簡要文章列表
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


const Board =  () =>{
  const [articles, setArticles] = useState('');

  const navigate = useNavigate();

  const {aid, brdname} = useParams()
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
    <Navbar />
        <StyledDiv className="contents page-container">
            <DashBoard
                className="dashBoard"
            />
            <div className="wrapper bordered">
                <BoardNameCard nowAtWhere={brdname} />
                <>{(data)?
                    (data.article)?
            <Article
                item={data.article}
            />:<>{navigate('/404')}</>:<></>}
                </>
            </div>
        </StyledDiv>

    </>);

}

export default Board;

