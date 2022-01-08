// import Button from '@material-ui/core/Button';
import {useState} from 'react'

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

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
// import Message from '../hooks/Message';




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



export default function Airticle() {
    const classes = useStyles();
    const classesText = useTextStyles();
    const bull = <span className={classes.bullet}>•</span>;

    //about send NewPost
    const [body,setBody] = useState('')
    const [title,setTitle] = useState('')
    // const [articleInput,setArticleInput] = useState('')

    const handleChangeArticleBody=(input)=>{
        setBody(input)
        console.log("body: "+body)
    }

    const handleChangeArticleTitle=(input)=>{
    setTitle(input)
    console.log("title: "+title)
    }  

    return (
        <Wrapper>
            <Card className={classes.root} variant="outlined" width="800">
                <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    <>看板</>
                    <FormControl  width="300px">
                        <InputLabel htmlFor="demo-customized-select-native">選擇主題</InputLabel>
                        <Select
                        id="demo-customized-select-native"
                        // value={age}
                        // onChange={handleChange}
                        // input={value}
                        >
                        <option hight="50px" value={10}>[問卦]</option>
                        <option hight="50px" value={20}>[新聞]</option>
                        <option hight="50px" value={30}>[？？]</option>
                        </Select>
                    </FormControl>
                    <Divider />

                </Typography>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        <>標題</>
                        <form fullWidth>
                            <TextField 
                            // width="700px"
                            value={title}
                            onChange={(e) => handleChangeArticleTitle(e.target.value)}
                            labelWidth={60}
                            />
                        </form>
                    </Typography>
                    <Divider />

                </CardContent>
                <Divider />

                <form className={classesText.root} noValidate autoComplete="off">
                <TextField 
                    id="outlined-basic" 
                    label="Outlined" 
                    variant="outlined" 
                    multiline
                    value={body}
                    onChange={(e) => handleChangeArticleBody(e.target.value)}
                    rows={20}
                    />
                </form>
                <CardActions>
                    <Button size="small">發文</Button>
                </CardActions>
            </Card>
        </Wrapper>
    );
    }

// const Airticle = () =>{

//     return(
//         <Wrapper>
//             <Button variant="contained">Default</Button>
//         </Wrapper>

//     )
// }

// export default Airticle;
