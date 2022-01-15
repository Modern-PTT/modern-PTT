// import Button from '@material-ui/core/Button';
import {useState, useContext} from 'react'

import styled from 'styled-components';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { Divider } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Row from './Layout/Row';
import Column from './Layout/Column'

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';

import { useParams, useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { CREATE_ARTICLE_MUTATION } from "../graphql";

import { pttContext } from '../Containers/App';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 700px;
  margin: auto;
`;
const useStyles = makeStyles({
    root: {
      minWidth: 700,
    },
    bullet: {
      display: 'flex',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });
  
  const useTextStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        // width: 'auto',
      },
    },
  }));

const msgState = (input)=>{
  if (input == "1")return "👍  "
  else if (input == "2")return "👎🏼  "
  else return "→  "
}



export default function NewPostCard() {
    
    const {
      username,
      myHashPassword
    } = useContext(pttContext)
  

    const navigate = useNavigate();


    const classes = useStyles();
    const classesText = useTextStyles();
    const bull = <span className={classes.bullet}>•</span>;
    const {brdname} = useParams()

    //about send NewPost
    const [body,setBody] = useState('')
    const [title,setTitle] = useState('')

    const [sendPost, { data, loading, error }] = useMutation(CREATE_ARTICLE_MUTATION);


    const handleChangeArticleBody=(input)=>{
        setBody(input)
        // console.log("body: "+body)
    }

    const handleChangeArticleTitle=(input)=>{
    setTitle(input)
    // console.log("title: "+title)
    }  

    const handleSubmit = async ()=>{
        if(!title || !body) alert("title and body can't be null")
        else {
          const returnSubmit = await sendPost({
              variables:{
                input:{
                  token: {
                    username:username,
                    password:myHashPassword,
                  },
                  brdname: brdname,
                  title:  title,
                  content: body,
                  }
                },
              });
          if(returnSubmit){
            setBody('')
            setTitle('')
            navigate(`/${brdname}`)
            // alert("New Post is published.")
          } else{
            alert("New Post is denied.")
          }

        }
        
    }





    return (
        <Wrapper>
            <Card className={classes.root} variant="outlined" width="800">
                <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    <Column>
                        <>看板｜{brdname}</>
                        <Divider />
                        {/* <FormControl  width="300px">
                            <InputLabel htmlFor="demo-customized-select-native">選擇主題</InputLabel>
                            <Select
                            id="demo-customized-select-native"
                            // value={age}
                            // onChange={handleChange}
                            // input={value}
                            >
                            <option hight="80px" value={10}>[問卦]</option>
                            <option hight="80px" value={20}>[新聞]</option>
                            <option hight="80px" value={30}>[？？]</option>
                            </Select>
                        </FormControl> */}
                    </Column>

                    <Divider />

                </Typography>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        <Column>
                        <>標題</>
                        <form >
                            <TextField 
                            fullWidth
                            value={title}
                            onChange={(e) => handleChangeArticleTitle(e.target.value)}
                            />
                        </form>
                        </Column>

                    </Typography>

                </CardContent>
                <Divider />

                <form className={classesText.root} noValidate autoComplete="off">
                <TextField 
                    id="outlined-basic" 
                    variant="outlined" 
                    multiline
                    fullWidth
                    value={body}
                    onChange={(e) => handleChangeArticleBody(e.target.value)}
                    rows={20}
                    />
                </form>
                <CardActions>
                    <Button size="small"
                    onClick={()=>handleSubmit()}
                    >
                        發文</Button>
                </CardActions>
            </Card>
        </Wrapper>
    );
    }

