import NavbarPro from "../../Components/NavbarPro"
import Navbar from "../../Components/Navbar"
import DashBoard from "../../Components/DashBoard"
import ArticleCard from "../../Components/ArticleCard";
import { GET_HOTARTICLES } from  "../../graphql";
import { useQuery } from '@apollo/client';
import { useState, useEffect} from 'react';
import Button from '@mui/material/Button';
import styled from 'styled-components';
import BoardNameCard from '../../Components/BoardNameCard'




const StyledDiv = styled.div`

width: 100%;
    .wrapper{
        display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 500px;
    width: 800px;
    margin: auto;
    
    }
`
const Home = ({myLoveBoards, setMyLoveBoards, myLoveArticles, setMyLoveArticles}) => {

    const [articles, setArticles] = useState('');
    const {data, error, loading} =  useQuery(GET_HOTARTICLES)
    
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
            />
            <div className="wrapper">
                <BoardNameCard nowAtWhere="home" />
                <>{articles ? articles.map((item)=>(
                    <ArticleCard
                        brdname={item.brdname}  
                        title={item.title}
                        owner={item.owner}
                        create_time={item.create_time}
                        aid={item.aid}
                        class={item.class}
                        deleted={item.deleted}
                        myLoveArticles={myLoveArticles}
                        setMyLoveArticles={setMyLoveArticles}
                        number={item.push-item.boo}
                    />
                )): ''}   
                </>
            </div>
        </StyledDiv>

    </>);
}

export default Home;

