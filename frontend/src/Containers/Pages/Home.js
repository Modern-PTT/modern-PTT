import Navbar from "../../Components/Navbar"
import DashBoard from "../../Components/DashBoard"
import ArticleCard from "../../Components/ArticleCard";
import { GET_HOTARTICLES } from  "../../graphql";
import { useQuery } from '@apollo/client';
import { useState, useEffect, useContext} from 'react';
import moment from "moment";
import Button from '@mui/material/Button';
import styled from 'styled-components';
import BoardNameCard from '../../Components/BoardNameCard'
import { pttContext } from "../App";



const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 500px;
  width: 800px;
  margin: auto;
`;
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
        return moment(time).format('YYYY/MM/DD hh:mm:ss')
    }

    useEffect(() => {
      if(data) setArticles(data.hotArticles);
      if(data) console.log(data)
    }, [data])


    return (<>


        <Navbar 
            username={username}
            setUsername={setUsername}
            myHashPassword={myHashPassword}
            setMyHashPassword={setMyHashPassword}
            isLogIn={isLogIn}
            setIsLogIn={setIsLogIn}
        />
        <div className="contents">
            <DashBoard/>
            {/* <BoardList
                myLoveBoards={myLoveBoards}
                setMyLoveBoards={setMyLoveBoards}
            /> */}

            <Wrapper>
                <BoardNameCard nowAtWhere="home" />
                {/* <Button variant="contained">Default</Button> */}
                <>{articles ? articles.map((item)=>(
                    <ArticleCard
                        key={item.aid}
                        brdname={item.brdname}  
                        title={item.title}
                        owner={item.owner}
                        create_time={showTime(item.create_time)}
                        aid={item.aid}
                        class={item.class}
                        deleted={item.deleted}
                        myLoveArticles={myLoveArticles}
                        setMyLoveArticles={setMyLoveArticles}
                        number={item.push-item.boo}
                    />
                )): ''}   
                </>
            </Wrapper>
        </div>

    </>);
}

export default Home;