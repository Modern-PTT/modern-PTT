import Button from '@material-ui/core/Button';
import styled from 'styled-components';
// import MessageBox from './old/MessageBox';
import Article from '../../Components/Article';
import ArticleCard from '../../Components/ArticleCard'

// import  graphql  from 'graphql';
import { useParams, useHistory } from 'react-router-dom';
import { useQuery, useMutation, useContext } from '@apollo/client';
import { GET_BOARD_QUERY, UPDATE_FAV_ARTICLES_MUTATION } from "../../graphql";
import { useState, useEffect} from 'react';
import moment from 'moment';

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

const Board =  ({myLoveArticles, setMyLoveArticles, isLogIn, username, myHashPassword}) =>{
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
          aids:  myLoveArticles
        }
      }
    })
    // if(update)alert("update myLoveArticles success!")

  }, [myLoveArticles])

    return(
      <>
        <Navbar/>
        <div className="contents">
            <DashBoard />
        </div>
        <Wrapper>
            {/* <Button variant="contained">Default</Button> */}
            <>{articles ? articles.map((item)=>(
                <ArticleCard
                    key={item.aid}
                    item={item}
                    create_time={showTime(item.create_time)}
                    brdname={item.brdname}
                    title={item.title}
                    owner={item.owner}
                    // create_time={item.create_time}
                    aid={item.aid}
                    deleted={item.deleted}
                />
            )): ''}  
            </>
          </Wrapper>
    </>);

}

export default Board;

