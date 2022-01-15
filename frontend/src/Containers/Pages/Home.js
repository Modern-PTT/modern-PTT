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


        <Navbar />
        <div className="contents">
            <DashBoard/>
            <Wrapper>
                {/* <Button variant="contained">Default</Button> */}
                <>{articles ? articles.map((item)=>(
                    <ArticleCard
                        showBrdname={true}
                        key={item.aid}
                        item={item}
                    />)
                ): ''}   
                </>
            </Wrapper>
        </div>

    </>);
}

export default Home;