import { GET_SALT, GET_USER, LOG_IN_MUTATION, SIGN_UP_MUTATION } from  "../graphql";
import { useQuery, useMutation } from '@apollo/client';
import { useState, useEffect} from 'react';
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

import Link from '@mui/material/Link';



const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 500px;
  width: 800px;
  margin: auto;
`;
const SingUp = (
    {   setUsername,
        setMyHashPassword,
        isLogIn,
        setIsLogIn,
    }) => {
    
    const [usernameInput,setUsernameInput] = useState('')
    const [realnameInput,setRealnameInput] = useState('')
    const [password, setPassword] = useState('')

 
    const [checkSingUp] = useMutation(SIGN_UP_MUTATION)

    // useEffect(() => {
    //     if (isLogIn) {
    //       localStorage.setItem(LOCALSTORAGE_KEY, username);
    //     }
    //     // displayStatus(status)
    //   }, [isLogIn, username]);

    // useEffect(() => {
    //   if(data) setArticles(data.hotArticles);
    //   if(data) console.log(data)
    // }, [data])

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