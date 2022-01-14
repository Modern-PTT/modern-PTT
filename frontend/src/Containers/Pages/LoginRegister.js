import { GET_SALT, GET_USER, LOG_IN_MUTATION } from  "../../graphql";
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

const LOCALSTORAGE_KEY = "save-me";


const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 500px;
  width: 800px;
  margin: auto;
`;
const LoginRegister = (
    {   username,
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
    const [usernameInput,setUsernameInput] = useState('')
    const [password, setPassword] = useState('')


    const {data, error1, loading1} =  useQuery(GET_SALT,{variables:{username: usernameInput}})
    // const {data2, error2, loading2} =  useQuery(GET_USER,{variables:{username: usernameInput, password: myHashPassword}})
    const [checkLogin] = useMutation(LOG_IN_MUTATION)

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
    const generateHash=(password, salt) =>{return bcrypt.hashSync(password, salt);} 

    const checkUserExist = ()=>{

        if(!data){
            setMySalt(data.salt)
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
        ?<Column>
            
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
            </FormControl>
            <Row>
                <Button variant="outlined">註冊</Button>
                <Button variant="contained" onClick={()=>checkUserExist()}>登入</Button>
            </Row>


        </Column>
        
        
        :<></>
    );
}

export default LoginRegister;