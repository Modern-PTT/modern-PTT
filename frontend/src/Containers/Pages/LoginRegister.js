import { GET_SALT, GET_USER, LOG_IN_MUTATION } from "../../graphql";
import { useQuery, useMutation } from '@apollo/client';
import { useState, useEffect } from 'react';
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

//RWD
import { MEDIA_QUERY_MD, MEDIA_QUERY_LG, MEDIA_QUERY_XL } from '../../css/Media_query'

//bg
import { BgBubble, colors } from "../Effects/BgBubble";

const LOCALSTORAGE_KEY = "save-me";


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
const LoginRegister = (
    { username,
        setUsername,
        mySalt,
        setMySalt,
        myHashPassword,
        setMyHashPassword,
        isLogIn,
        setIsLogIn,
    }) => {
    // const [isLogIn, setIsHaveAccount] = useState(true);
    const [isHaveAccount, setIsHaveAccount] = useState(true);
    const [usernameInput, setUsernameInput] = useState('')
    const [password, setPassword] = useState('')


    const { data, error1, loading1 } = useQuery(GET_SALT, { variables: { username: usernameInput } })
    const [checkLogin] = useMutation(LOG_IN_MUTATION)


    const generateSalt = () => { return bcrypt.genSaltSync(10); }
    const generateHash = (password, salt) => { return bcrypt.hashSync(password, salt); }

    const checkUserExist = () => {

        if (!data) {
            setMySalt(data.salt.salt)
            console.log(mySalt)
        }
        // if( salt != "null") {
        //     setMySalt(salt);
        //     if(!password){ 
        //         var hashPassword = generateHash({password, mySalt})
        //         setMyHashPassword(hashPassword)
        //         checkLogin({
        //             variables:{
        //                 username,
        //                 hashPassword,
        //             },
        //             // refetchQueries: [GET_TASKS_QUERY],
        //         })
        //     }else {alert("password can't not be empty")}

        // }
        // else {alert("username error")}
    }
    const [values, setValues] = useState({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

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
            ? <Wrapper>
                <BgBubble />
                <Column className="inner-container overlay">
                    <div className="overlay-title">歡迎回來</div>
                    <div className="input-container">
                    <TextField
                        label="Username"
                        id="username"
                        value={usernameInput}
                        onChange={(e) => { setUsernameInput(e.target.value); console.log("name: " + usernameInput) }}
                        sx={{ m: 0, width: '100%' }}
                    />
                    <FormControl sx={{ m: 0, width: '100%' }} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={values.showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => { setPassword(e.target.value); console.log("password: " + password) }}
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
                    </div>
                    <div className="overlay-btns">
                        <div className='overlay-btn overlay-btn-transparent' >註冊</div>
                        <div className='overlay-btn' onClick={() => checkUserExist()}>登入</div>
                    </div>


                </Column>
            </Wrapper>

            : <></>
    );
}

export default LoginRegister;