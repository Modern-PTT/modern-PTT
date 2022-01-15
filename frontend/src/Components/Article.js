// import Button from '@material-ui/core/Button';
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
import { useState, useContext} from 'react';
import moment from 'moment';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


// import Message from '../hooks/Message';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import EditIcon from '@mui/icons-material/Edit';

import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useMutation } from '@apollo/client';
import { 
  CREATE_COMMENT_MUTATION, 
  UPDATE_ARTICLE_MUTATION,
  MODIFY_COMMENT_MUTATION } from "../graphql";

import {pttContext}  from "../Containers/App"

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
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

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 700px;
  margin: auto;
`;


const msgState = (input)=>{
  if (input == 1)return <ThumbUpAltOutlinedIcon/>
  else if (input == 2)return <ThumbDownOutlinedIcon/>
  else return <ArrowRightAltIcon/>
}





export default function Article({article}) {
  const {
    username,
    myHashPassword,
    isLogin } = useContext(pttContext)

  const classes = useStyles();
  const classesText = useTextStyles();
  const bull = <span className={classes.bullet}>•</span>;

  const showTime = (time)=>{
      return moment(time).format('YYYY/MM/DD hh:mm:ss')
  }

  // Edit Comment Part
  const [commentType, setCommentType] = useState(3)
  const [inputcomment, setInputComment] = useState('')
  const [inputaid, setInputaid]=useState(article.aid)
  const [createComment] = useMutation(CREATE_COMMENT_MUTATION);

  // Edit Article Part
  const [editTitle, setEditTitle] = useState(article.title)
  const [editContent, setEditContent] = useState(article.content)
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handelEdit = () => {

  }

  const EditCard = ()=>{
    return(
      <Dialog open={open} onClose={handleClose}>
          <DialogTitle>{article.username}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              標題
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="editTitle"
              type="editTitle"
              fullWidth
              value={editTitle}
              onChange={(e)=>setEditTitle(e.target.value)}
              variant="standard"
            />
            <DialogContentText>
              內文
            </DialogContentText>
            <TextField
              margin="dense"
              id="editTitle"
              type="editTitle"
              fullWidth
              value={editContent}
              onChange={(e)=>setEditContent(e.target.value)}
              variant="standard"
            />
            {/* {article.comments.map((item)=>(
              <DialogContentText>
              {item.owner}{item.owner}
              </DialogContentText>
            ))} */}
          <Divider />

      
          <CardContent>
              {article.comments.map((item)=>(
                  <Typography className={classes.title} color="textSecondary" gutterBottom key={item}>
                  <Row align="center">
                      <>{msgState(item.type) }{item.owner} </> <>{item.location.ip}   {item.create_time}</>
                  </Row>
                  {item.body}
                  </Typography>
              
              ))}
          </CardContent>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>取消</Button>
            <Button onClick={()=>{handleClose();handelEdit();}}>更改</Button>
          </DialogActions>
        </Dialog>
    )
  }
    

  const submitComment = () =>{
      var submit = createComment({
        variables:{
          input:{
            token: {
              username: username,
              password: myHashPassword,
            },
            aid: "M.1642183234.A.2D6",
            type: commentType,
            content: inputcomment,
          }
        }
      })
      if(submit.data) {
        alert("Comment submit")
        console.log(submit)
      }
      else alert("Comment failed")
  }
  
  // var username = "amy"
  // var myHashPassword = "$2a$10$FUeuUN9JDCOmpVW324HKoOPpl7vKQ3tWeT6tCaLzvEoUQCKi9Fd/G"
  // const isOwner = compare();
  return (
      <Wrapper>
        <Card className={classes.root} variant="outlined">
            <CardContent>
                    {/* <Typography className={classes.title} color="textSecondary" gutterBottom> */}
                      <Row justify="space-between" align="center">
                        <div>標題｜{article.title}</div>
                        <div>
                          {(username==article.owner)?
                            <Tooltip title="編輯">
                              <IconButton>
                                <EditIcon onClick={()=>{handleClickOpen();console.log("door open");}}/>
                              </IconButton>
                            </Tooltip>
                          :<></>}
                          <EditCard/>

                          {isLogin?
                          <Tooltip title="收藏">
                            <IconButton>
                              <FavoriteIcon />
                            </IconButton>
                          </Tooltip>
                          :<></>}


                        </div>
                      </Row>

                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    作者｜{article.owner}
                </Typography>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    時間｜{showTime(article.create_time)}
                </Typography>
                <p></p>
                <Divider />
                <p></p>
                <Typography className={classes.title} color="textSecondary" gutterBottom >
                  {article.content.split("\n").map(e => (
                            <>
                              {e}
                              <br />
                            </>
                  ))}
                </Typography>
                <Typography className={classes.title} color="textSecondary" gutterBottom l>
                  {/* {data.url} */}
                </Typography>

            </CardContent>
            <Divider />

    
            <CardContent>
                {article.comments.map((item)=>(
                    <Typography className={classes.title} color="textSecondary" gutterBottom> key={item.cid}
                    <Row align="center">
                        <>{msgState(item.type)}
                          {item.owner}
                          {item.content.split("\n").map(e => (
                            <>
                              {e}
                              <br />
                            </>
                          ))}
                        </>
                        <>
                          {item.location.ip}
                          {showTime(item.create_time)}
                        </>
                    </Row>
                    {item.body}
                    </Typography>
                
                ))}
            </CardContent>
            {isLogin?
              <Row justify="space-around"align="center">
                <div>
                  <ThumbUpAltOutlinedIcon onClick={()=>{setCommentType(1);console.log(1);}}/>
                  <ThumbDownOutlinedIcon onClick={()=>{setCommentType(2);console.log(2);}}/>
                  <ArrowRightAltIcon onClick={()=>{setCommentType(3);console.log(3);}}/>
                </div>
                <form className={classesText.root} noValidate autoComplete="off">
                  <TextField 
                    id="outlined-basic"  
                    variant="outlined" 
                    value={inputcomment}
                    onChange={(e)=>{
                      setInputComment(e.target.value)
                      console.log(inputcomment)
                    }}
                    />
                </form>
                {/* <CardActions > */}
                  <Row justify="flex-end">
                    <Button size="small" onClick={()=>submitComment()}>留言</Button>
                  </Row>
                {/* </CardActions> */}
              </Row>
            :<></>}

        </Card>
    </Wrapper>
  );
}

