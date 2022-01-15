// import Button from '@material-ui/core/Button';
import {useState, useContext} from 'react'
import { colors } from '../Containers/Effects/BgBubble';
import useMediaQuery from '@mui/material/useMediaQuery';

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
  margin: auto;
`;
const useStyles = makeStyles((theme)=>({
    root: {
      width: '95%',
      padding: '30px 0',
      [theme.breakpoints.up("1200")]:{
        padding: '60px 0px',
      }
    },
    bullet: {
      margin: '0 2px',
      transform: 'scale(1)',
    },
    cardContainer:{

      [theme.breakpoints.up("768")]:{
        padding: '0 50px'
      }
    },
    title: {
      fontSize: 14,
      [theme.breakpoints.up("768")]:{
        fontSize: 18,
        width: '90%',
      },
      
    },
    pos: {
      marginBottom: 12,
    },
    row:{
      display: 'flex',
      padding: '5px 0px',
      [theme.breakpoints.up("768")]:{
        padding: '20px 0px',
      }
    },
    column:{
      padding: '5px 0px',
      [theme.breakpoints.up("768")]:{
        margin: '20px 0px',
      }
    },
    brdnameReadOnly:{
      marginLeft: '.5rem',
      color: 'black'
    },
    button:{
      borderRadius: '10px',
      backgroundColor: colors['dark-color'],
      color: 'white'
    },
    buttonContainer:{
      display: 'flex',
      justifyContent: 'center',
    },
    form:{
      padding: '30px 10px',
      [theme.breakpoints.up("768")]:{
        padding: '30px 50px',
      }
    }
  }));
  
  const useTextStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        // margin: theme.spacing(1),
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
            <Card className={classes.root} variant="outlined">
                <CardContent className={classes.cardContainer}>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                  <Row className={classes.row}>
                        <>看板</>
                        <div className={classes.brdnameReadOnly + ' text-gradient'}>{brdname}</div>
                  </Row>

                    <Divider />

                </Typography>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        <Column className={classes.column}>
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

                <form className={classes.form} noValidate autoComplete="off">
                <TextField 
                    id="outlined-basic" 
                    variant="outlined" 
                    multiline
                    fullWidth
                    value={body}
                    onChange={(e) => handleChangeArticleBody(e.target.value)}
                    rows={15}
                    />
                </form>
                <CardActions className={classes.buttonContainer}>
                    <Button size="small" className={classes.button}
                    onClick={()=>handleSubmit()}
                    >
                        發文</Button>
                </CardActions>
            </Card>
        </Wrapper>
    );
    }

