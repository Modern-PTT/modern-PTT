import { GET_SALT, GET_USER, LOG_IN_MUTATION, SIGN_UP_MUTATION } from  "../graphql";
import { useQuery, useMutation } from '@apollo/client';
import { useState, useEffect, useContext} from 'react';
import Button from '@mui/material/Button';
import styled from 'styled-components';
import bcrypt from "bcryptjs"
import Row from "./Layout/Row";
import Column from './Layout/Column'

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

//RWD
import { MEDIA_QUERY_MD, MEDIA_QUERY_LG, MEDIA_QUERY_XL } from '../../css/Media_query'

//bg
import { BgBubble, colors } from "../Effects/BgBubble";
import Link from '@mui/material/Link';

import { pttContext } from "../Containers/App";


const Wrapper = styled.div`
  display: grid;
    justify-items: center;
    align-content: center;
    /* background: linear-gradient(to bottom,hsl(237,95%,99%),hsl(237,95%,84%)); */
  height: 100vh;
  width: 100%;
  margin: auto;
  .inner-container{
      display: grid;
      justify-items: center;
      grid-row-gap: 30px;
      padding: 8rem 4rem;
        .overlay-title{
            background-image: linear-gradient(
          45deg,
          ${colors['base']} 25%,
          ${colors['complimentary2']}
        );
        background-clip: text;
        -webkit-text-fill-color: transparent;
        -moz-background-clip: text;
        -webkit-background-clip: text;
        -moz-text-fill-color: transparent;
        }
        .input-container{
            width: 100%;
            display: grid;
            grid-row-gap: 10px;
            justify-items: center;
            align-content: center;
        }
        .overlay-btns{
            .overlay-btn{
                width: 100%;
            }
        }
  }
  ${MEDIA_QUERY_MD}{
      .inner-container{
          padding: 6rem 2rem;
          .input-container{
              width: 90%;
              max-width: 480px;
          }
      }
  }
`;
const SingUp = () => {
    
    const {
        setUsername,
        setMyHashPassword,
        isLogIn,
        setIsLogIn} = useContext(pttContext)

    const [usernameInput,setUsernameInput] = useState('')
    const [realnameInput,setRealnameInput] = useState('')
    const [password, setPassword] = useState('')

    const [checkSingUp] = useMutation(SIGN_UP_MUTATION)


    const generateSalt = () => { return bcrypt.genSaltSync(10); }
    const generateHash = (password, salt) => { return bcrypt.hashSync(password, salt); }

    const generateSalt=() =>{return bcrypt.genSaltSync(10);} 
    const generateHash = async (password, salt) => {
        return bcrypt.hashSync(password, salt);
    }


    const sendSignUp = async () => {
        var randomSalt = generateSalt();

        console.log("Salt: "+randomSalt)

        // each prop. should be filled
        if (!usernameInput) {
            alert("username can not be empty!");
            return;
        }
        if (!realnameInput) {
            alert("username can not be empty!");
            return;
        }
        if (!password) {
            alert("username can not be empty!");
            return;
        } else{ 
            const hashPassword = await generateHash(password, randomSalt);
            setMyHashPassword(hashPassword);
            console.log("hashPassword"+hashPassword)
            const signUpResult = await checkSingUp({
                variables:{
                    input:{
                        username: usernameInput,
                        password: hashPassword,
                        salt: randomSalt,
                        realname: realnameInput,
                    }
                }
            });

            if(signUpResult.data.signup) {
                console.log("signup success and login!!");
                setIsLogIn(true);
                setUsername(usernameInput);
                setMyHashPassword(hashPassword);
            }else{
                alert("username is existed!");
                return;
            }
        }
    }



    const [values, setValues] = useState({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
      });
    

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };


    return (
        (!isLogIn)
        ?<Column>
            <p> 註冊新帳號 </p>
            <TextField
                label="username"
                id="username"
                value={usernameInput}
                onChange={(e)=>{setUsernameInput(e.target.value);console.log("name: "+usernameInput)}}
                sx={{ m: 1, width: '25ch' }}
            />
            
            <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput
                id="outlined-adornment-password"
                type={values.showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e)=>{setPassword(e.target.value);console.log("password: "+password)}}
                endAdornment={
                <InputAdornment position="end">
                    <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                    >
                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                </InputAdornment>
                }
                label="Password"
            />
            <TextField
                label="realname"
                id="realname"
                value={realnameInput}
                onChange={(e)=>{setRealnameInput(e.target.value);console.log("name: "+realnameInput)}}
                sx={{ m: 1, width: '25ch' }}
            />

            </FormControl>
            <Row>
                <Link href="login">
                    <Button variant="outlined">回登入</Button>
                </Link>
                <Button variant="contained" onClick={()=>sendSignUp()}>送出</Button>
            </Row>
        </Column>
        :<>
            <h1>Welcome to NEW PTT</h1>
            <Link href="home">
                <Button variant="outlined">進入新世界</Button>
            </Link>
        </>

    );
}

export default SingUp;