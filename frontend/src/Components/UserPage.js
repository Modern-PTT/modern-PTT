import { Button } from "@material-ui/core";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../graphql";
import { useState, useEffect, useContext} from 'react';

import { pttContext } from '../Containers/App';
import moment from 'moment';


const showTime = (time)=>{
    return moment(time).format('YYYY/MM/DD hh:mm:ss')
  }

  const showDate = (time)=>{
    return moment(time).format('YYYY/MM/DD hh:mm:ss')
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
        <p>loaging</p>:
        <div display="flex" align="center" >
            <h1>{data.user.username}</h1>
            <h2>{"nick name："}{data.user.nickname}</h2>
            <h2>{"真實的我："}{data.user.realname}</h2>
            <br></br>
            <h2>{"初次登入："}{showTime(data.user.first_login)}</h2>
            <h2>{"登入天數："}{data.user.login_days}</h2>
            <h2>{"上次登入："}{showTime(data.user.last_login)}</h2>
            <h2>{"發文篇數："}{data.user.post}</h2>
            <h2>{"錢包： P幣"}{data.user.money}</h2>

            <p></p>
        </div>

    )
}

export default UserPage;