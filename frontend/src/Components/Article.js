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
import DeleteIcon from '@mui/icons-material/Delete';

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
  GET_ARTICLE_QUERY,
  CREATE_COMMENT_MUTATION, 
  DELETE_ARTICLE_MUTATION,
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





export default function Article( {item} ) {
  console.log("item", item)
  const {
    username,
    myHashPassword,
    isLogIn } = useContext(pttContext)

  const classes = useStyles();
  const classesText = useTextStyles();
  const bull = <span className={classes.bullet}>•</span>;

  const showTime = (time)=>{
      return moment(time).format('YYYY/MM/DD hh:mm:ss')
  }

  // Edit Comment Part
  const [commentType, setCommentType] = useState(3)
  const [inputcomment, setInputComment] = useState('')
  // const [inputaid, setInputaid]=useState(item.aid)
  const [createComment] = useMutation(CREATE_COMMENT_MUTATION);

  // Edit Article Part
  const [editTitle, setEditTitle] = useState(item.title)
  const [editContent, setEditContent] = useState(item.content)
  const [edit_reply, setEdit_reply] = useState([])
// ({cid: ,})
// setEdit_reply([...edit_reply,])
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const handleEditOpen = () => {setEditOpen(true);};
  const handleEditClose = () => {setEditOpen(false);};

  const handleDeleteOpen = () => {setDeleteOpen(true);};
  const handleDeleteClose = () => {setDeleteOpen(false);};

  const EditCard = ()=>{
    return(
      <Dialog open={editOpen} onClose={handleEditClose}>
          <DialogTitle>{item.username}</DialogTitle>
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

          <CardContent>
          {item.comments.map((item)=>(
              <Typography className={classes.title} color="textSecondary" gutterBottom key={item.cid}>             
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
          </DialogContent>
          <DialogActions>
            <Button onClick={handleEditClose}>取消</Button>
            <Button onClick={()=>{handleEditClose();updateEdit();}}>更改</Button>
          </DialogActions>
        </Dialog>
    )
  }
  
  const DeleteCard = () => {
    return (
      <div>
        <Button variant="outlined" onClick={handleDeleteOpen}>
          Open alert dialog
        </Button>
        <Dialog
          open={deleteOpen}
          onClose={handleDeleteClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Use Google's location service?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Let Google help apps determine location. This means sending anonymous
              location data to Google, even when no apps are running.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDeleteClose}>取消</Button>
            <Button onClick={()=>sendDelete()} autoFocus color="red">
              刪除
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }

  const [deleteArticle] = useMutation(DELETE_ARTICLE_MUTATION)
  const sendDelete = async () => {
    var delete1 = await deleteArticle({
      variables:{
        input:{
          token: {
            username: username,
            password: myHashPassword,
          },
          aid: item.aid,
        }
      }
    })
    if(delete1.data) console.log("delete") 

  }

  const [updateArticle] = useMutation(DELETE_ARTICLE_MUTATION)
  const updateEdit = async() =>{
    var update = await updateArticle({
      variables: {
        input: {
          token: {
            username: username,
            password: myHashPassword,
          },
          aid: item.aid,
          title: editTitle,
          content: editContent,
          comment_reply: [{}],
        }
      }
    })
    if(update.data) console.log("delete") 
  }

  const submitComment = async () =>{
    if(inputcomment!== ""){
      var submit = await createComment({
        variables:{
          input:{
            token: {
              username: username,
              password: myHashPassword,
            },
            aid: item.aid,
            type: commentType,
            content: inputcomment,
          }
        },refetchQueries:[GET_ARTICLE_QUERY]
      })
      if(submit.data) {
        setInputComment("");
      }
      else alert("Comment failed")
    }
  }
  
  return (
      <Wrapper>
        <Card className={classes.root} variant="outlined">
            <CardContent>
                    {/* <Typography className={classes.title} color="textSecondary" gutterBottom> */}
                      <Row justify="space-between" align="center">
                        <div>標題｜{item.title}</div>
                        <div>
                          {(username==item.owner)?
                          <>
                            <Tooltip title="刪除">
                              <IconButton>
                                <DeleteIcon onClick={()=>{handleDeleteOpen();console.log("door open");}}/>
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="編輯">
                              <IconButton>
                                <EditIcon onClick={()=>{handleEditOpen();console.log("door open");}}/>
                              </IconButton>
                            </Tooltip>
                          </>

                          :<></>}
                          <EditCard/>

                          {/* {isLogIn?
                          <Tooltip title="收藏">
                            <IconButton>
                              <FavoriteIcon />
                            </IconButton>
                          </Tooltip>
                          :<></>} */}


                        </div>
                      </Row>

                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    作者｜{item.owner}
                </Typography>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    時間｜{showTime(item.create_time)}
                </Typography>
                <p></p>
                <Divider />
                <p></p>
                <Typography className={classes.title} color="textSecondary" gutterBottom >
                  {item.content.split("\n").map(e => (
                            <>
                              {e}
                              <br />
                            </>
                  ))}
                </Typography>
                <Typography className={classes.title} color="textSecondary" gutterBottom >
                  {/* {data.url} */}
                </Typography>

            </CardContent>
            <Divider />

    
            <CardContent>
                {item.comments.map((item)=>(
                    <Typography className={classes.title} color="textSecondary" gutterBottom key={item.cid}> 
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
            {(isLogIn)?
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
                <CardActions >
                  <Row justify="flex-end">
                    <Button size="small" onClick={()=>submitComment()}>留言</Button>
                  </Row>
                </CardActions>
              </Row>
            :<></>}

        </Card>
    </Wrapper>
  );
}

