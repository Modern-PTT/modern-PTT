import { GET_SALT, GET_USER, LOG_IN_MUTATION, SIGN_UP_MUTATION } from  "../../graphql";
import { useQuery, useMutation } from '@apollo/client';
import { useState, useEffect} from 'react';
import Button from '@mui/material/Button';
import styled from 'styled-components';
import bcrypt from "bcryptjs"
import Row from "../../Components/Layout/Row";
import Column from '../../Components/Layout/Column'

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
    {   username,
        setUsername,
        myHashPassword,
        setMyHashPassword,
        isLogIn,
        setIsLogIn,
    }) => {
    // const [isLogIn, setIsHaveAccount] = useState(true);
    const [isHaveAccount, setIsHaveAccount] = useState(true);
    const [usernameInput,setUsernameInput] = useState('')
    const [realnameInput,setRealnameInput] = useState('')
    const [newsalt, setNewsalt] = useState('')
    const [password, setPassword] = useState('')

    const { data: returnSalt,
            error: getSaltError,
            loading: getSaltLoading,
            refetch: getSalt} = useQuery( GET_SALT, {
                variables:{ username: usernameInput }
            });
    
    const [checkLogin] = useMutation(LOG_IN_MUTATION)
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

    const checkUserIsExist = () => {
        getSalt();
        if(returnSalt) {
            return true;
        } else {
            console.log(returnSalt);
            const salt = generateSalt();
            setNewsalt(salt);
            console.log(newsalt);
            return false
        }
    }

    const sendSignUp = async () => {
        const userExist = checkUserIsExist();
        if(userExist) {
            alert("username is existed!");
            return;
        }

        if(password) {
            const hashPassword = await generateHash(password, newsalt);
            setMyHashPassword(hashPassword);
            const signInResult = await checkSingUp({
                variables:{
                    username: usernameInput,
                    password: hashPassword,
                    salt: newsalt,
                    realname: realnameInput,
                }
            })
            if(signInResult){
                const loginResult = await checkLogin({
                    variables:{
                        username: usernameInput,
                        password: hashPassword,
                    }
                    // refetchQueries: [GET_TASKS_QUERY],
                });

                if(loginResult.data.login) {
                    console.log("login!!");
                    setIsLogIn(true);
                }
                else {
                    alert("username or password invalid");
                };

            }else {
                alert("system error!");
                return;
            }

        } else {
            alert("password can't not be empty");
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
        :<h1>Welcome to NEW PTT</h1>
    );
}

export default SingUp;