import { GET_SALT, GET_USER, LOG_IN_MUTATION, LOG_OUT_MUTATION  } from  "../graphql";
import { useQuery, useMutation } from '@apollo/client';
import { useState, useEffect, useContext} from 'react';
import Button from '@mui/material/Button';
import styled from 'styled-components';
import bcrypt from "bcryptjs"
import Row from "./Layout/Row";
import Column from './Layout/Column'

import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import Link from '@mui/material/Link';
import { pttContext } from "../Containers/App";
import { useNavigate } from "react-router-dom";

const LOCALSTORAGE_USERNAME = "saveMyUsername";
const LOCALSTORAGE_HASHEDPW = "saveMyHashedPassword";


const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 500px;
  width: 800px;
  margin: auto;
`;

const Login = () => {

    const {    
        username,
        setUsername,
        myHashPassword,
        setMyHashPassword,
        isLogIn,
        setIsLogIn} = useContext(pttContext)

    const navigate = useNavigate();

    const [usernameInput,setUsernameInput] = useState('')
    const [password, setPassword] = useState('')

    const { data: returnSalt,
            // error: getSaltError,
            // loading: getSaltLoading,
            refetch: getSalt} = useQuery( GET_SALT, {
                variables:{ username: usernameInput }
            });
    
    const [checkLogin] = useMutation(LOG_IN_MUTATION)
    const [checkLogout] = useMutation(LOG_OUT_MUTATION);



    // const generateSalt=() =>{return bcrypt.genSaltSync(10);} 
    const generateHash = async (password, salt) => {
        return bcrypt.hashSync(password, salt);
    }

    const checkUserExist = () => {
        getSalt();
        if(returnSalt) {
            // console.log("salt:", returnSalt.salt);
            return returnSalt.salt;
        }
        return null;
    }

    const login = async () => {
        const getBackSalt = checkUserExist();
        if(!getBackSalt) {
            alert("username or password invalid");
            setUsernameInput("");
            setPassword("");
            return;
        }

        if(password) {
            const hashPassword = await generateHash(password, getBackSalt);
            const loginResult = await checkLogin({
                variables:{
                    username: usernameInput,
                    password: hashPassword,
                }
            });
            if(loginResult.data?.login) {
                setUsername(usernameInput);
                setMyHashPassword(hashPassword)
                localStorage.setItem(LOCALSTORAGE_USERNAME, loginResult.data.login);
                localStorage.setItem(LOCALSTORAGE_HASHEDPW, hashPassword);
                setIsLogIn(true);
                console.log("login!!");
            }
            else {
                alert("username or password invalid");
            }
            setUsernameInput("");
            setPassword("");
        } else {
            alert("password can't not be empty");
        }
    }

    const logout = async () => {
        if(!username || !myHashPassword) {
            console.log("username and hashed password cannot be null");
            return;
        }

        const logoutResult = await checkLogout({
            variables:{
                username: username,
                password: myHashPassword,
            }
        });

        if(logoutResult.data?.logout) {
            console.log("logout~~");
            setIsLogIn(false);
            setMyHashPassword("");
            setUsername("");

            localStorage.removeItem(LOCALSTORAGE_USERNAME);
            localStorage.removeItem(LOCALSTORAGE_HASHEDPW);
        } else {
            console.log("logout error...");
        }
    }

    const [values, setValues] = useState({
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
            <p> 登入 </p>
            <TextField
                label="username"
                id="username"
                value={usernameInput}
                onChange={(e)=>{setUsernameInput(e.target.value);}}
                sx={{ m: 1, width: '25ch' }}
            />
            
            <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput
                id="outlined-adornment-password"
                type={values.showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e)=>{setPassword(e.target.value);}}
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
            </FormControl>
            <Row>
                <Link href="/home">
                    <Button variant="outlined">訪客</Button>
                </Link>
                <Link href="/signup">
                    <Button variant="outlined">註冊</Button>
                </Link>
                <Button variant="contained" onClick={()=>login()}>登入</Button>
            </Row>
            </Column>

        :<>
        {navigate("/home")}
        </>
    );
}
export default Login;