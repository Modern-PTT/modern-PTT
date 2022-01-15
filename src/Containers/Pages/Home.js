import NavbarPro from "../../Components/News/NavbarPro"
import Navbar from "../../Components/Navbar"
import DashBoard from "../../Components/DashBoard"
// import ArticleCard from "../../Components/ArticleCard";
import { GET_HOTARTICLES } from  "../../graphql";
import { useQuery } from '@apollo/client';
import { useState, useEffect, useContext} from 'react';
import moment from "moment-timezone";
import Button from '@mui/material/Button';
import styled from 'styled-components';
import BoardNameCard from '../../Components/BoardNameCard'
import { pttContext } from "../App";

import ArticleCard from "../../Components/News/ArticleCardPro";
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
const Home = () => {

    const {
        myLoveBoards, 
        setMyLoveBoards, 
        myLoveArticles, 
        setMyLoveArticles,
        //for login btn
        username,
        setUsername,
        myHashPassword,
        setMyHashPassword,
        isLogIn,
        setIsLogIn,
    } = useContext(pttContext)
    
    const [articles, setArticles] = useState('');
    const {data, error, loading} =  useQuery(GET_HOTARTICLES)
    
    const showTime = (time)=>{
        return moment(time).tz("Asia/Taipei").format('YYYY/MM/DD HH:mm:ss')
    }

    useEffect(() => {
      if(data) setArticles(data.hotArticles);
      if(data) console.log(data)
    }, [data])


    return (<>
        <NavbarPro />
        <StyledDiv className="contents page-container">
            <DashBoard
                myLoveBoards={myLoveBoards}
                setMyLoveBoards={setMyLoveBoards}
                className="dashBoard"
            />
            <div className="wrapper bordered">
                <BoardNameCard nowAtWhere="首頁" isEdible={false}/>
                <>{articles ? articles.map((item)=>(
                    <ArticleCard
                        showBrdname={true}
                        key={item.aid}
                        item={item}
                    />)
                ): ''}   
                </>
            </div>
        </StyledDiv>

    </>);
}

export default Home;

