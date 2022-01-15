import Button from '@material-ui/core/Button';
import styled from 'styled-components';
// import MessageBox from './old/MessageBox';
import Article from '../../Components/Article';
import ArticleCard from '../../Components/ArticleCard'

// import  graphql  from 'graphql';
import { useParams, useHistory } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { GET_BOARD_QUERY, UPDATE_FAV_ARTICLES_MUTATION } from "../../graphql";
import { useState, useEffect, useContext} from 'react';
import moment from 'moment';

import Navbar from "../../Components/Navbar"
import DashBoard from "../../Components/DashBoard"

import { pttContext } from '../App'
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

const Board =  () => {

  const {
    favArticles, 
    setFavArticles, 
    isLogIn, 
    username, 
    myHashPassword
  } = useContext(pttContext)


  const [articles, setArticles] = useState('');

  const [updateFavArticles] = useMutation(UPDATE_FAV_ARTICLES_MUTATION)


  const {brdname} = useParams()
  console.log(brdname)
  const {data, error, loading} =  useQuery(GET_BOARD_QUERY,{
    variables: {
      brdname: brdname,
    }
  })

  const showTime = (time)=>{
    return moment(time).format('YYYY/MM/DD hh:mm:ss')
}
  
  useEffect(() => {
    if(data) setArticles(data.board.articles);
  }, [data])

  useEffect(() => {
    var update = updateFavArticles({
      variables:{
        input:{
          token:{
            username: username,
            password: myHashPassword
          },
          aids:  favArticles
        }
      }
    })

  }, [favArticles])

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
                    key={item.aid}
                    item={item}
                />
            )): ''}  
            </>
          </Wrapper>
    </>);

}

export default Board;

