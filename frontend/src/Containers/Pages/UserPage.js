import { Button } from "@material-ui/core";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../../graphql";
import { useState, useEffect, useContext} from 'react';
// import styled from "@emotion/styled/types/base";

import styled from 'styled-components';

import{ BgBubble} from '../Effects/BgBubble'
import { pttContext } from '../App';
import moment from 'moment-timezone';
import Link from '@mui/material/Link';

const StyledDiv = styled.div`
    width: 100%;
    height: 100vh;
    background: black;
    display: grid;
    justify-items: center;
    align-content: center;
    .overlay{
        display: grid;
        padding-left: 10%;
        .text-gradient{
        }
        h2{
            margin: 10px;
        }
        button.back{
            position: absolute;
            right: 5%;
            bottom: 5%;
            width: fit-content;
            padding: 30px 60px;
        }
    }
`
const StyledP = styled.p`
    width: 100%;
    height: 100vh;
    font-size: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
`

const showTime = (time)=>{
    return moment(time).tz("Asia/Taipei").format('YYYY/MM/DD HH:mm:ss')
  }

  const showDate = (time)=>{
    return moment(time).tz("Asia/Taipei").format('YYYY/MM/DD HH:mm:ss')
  }


const UserPage = ()=> {

    const { 
        username,
        myHashPassword
      } = useContext(pttContext)

    const {data, error, loading} = useQuery(GET_USER,{
        variables:{
            input:{
                username:username,
                password:myHashPassword  
            }
        }
    })

    return(
        (loading)?
        <StyledP>loading...</StyledP>:
        <StyledDiv>
            <BgBubble/>
            <div className="overlay">
                <h1 className="text-gradient">{data.user.username}</h1>
                <h2>{"nick name："}{data.user.nickname}</h2>
                <h2>{"真實的我："}{data.user.realname}</h2>
                <hr/>
                <h2>{"初次登入："}{showTime(data.user.first_login)}</h2>
                <h2>{"登入天數："}{data.user.login_days}</h2>
                <h2>{"上次登入："}{showTime(data.user.last_login)}</h2>
                <h2>{"發文篇數："}{data.user.post}</h2>
                <h2>{"錢包： P幣"}{data.user.money}</h2>
                <Link underline="none" href="/home">
                    <button className='back overlay-btn'>Back</button>
                </Link>
            </div>
        </StyledDiv>

    )
}

export default UserPage;