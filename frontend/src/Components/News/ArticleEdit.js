// import Button from '@material-ui/core/Button';
import styled from 'styled-components';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

import { Divider } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { useState, useContext } from 'react';
import moment from 'moment';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

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

import { useMutation } from '@apollo/client';
import {
    GET_ARTICLE_QUERY,
    CREATE_COMMENT_MUTATION,
    DELETE_ARTICLE_MUTATION,
    UPDATE_ARTICLE_MUTATION,
    MODIFY_COMMENT_MUTATION
} from "../../graphql";

import { pttContext } from "../../Containers/App"

import { useNavigate } from 'react-router-dom';

import { MEDIA_QUERY_MD, MEDIA_QUERY_XL, Styles } from '../../css/Media_query';


const Wrapper = styled.div`
    width: 100%;
    .card-container{
        padding: 30px 15px;
        .post{
            padding: 30px 0px;
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-template-rows: auto auto auto auto;
            .post-title{
                font-size: 1.2rem;
                font-weight: bold;
                grid-column: 1 / span 2;
                width: fit-content;
                height: fit-content;
            }
            .post-functions{
                display: grid;
                grid-template-columns: 1fr 1fr;
                grid-column: 2 / span 1;
                grid-row: 2 / span 1;
                width: fit-content;
                justify-self: end;
                .post-delete, .post-edit{
                    width: fit-content;
                }
                .post-edit{
                    color: ${Styles.colors.font.faded};
                }
                .post-delete{
                    color: ${Styles.colors.font.danger};
                }
            }
            .post-owner, .post-createTime{
                width: fit-content;
            }
            .post-detail{
                grid-row: 2 / span 1;
                .post-owner{
                    font-size: .8rem;
                }
                .post-createTime{
                    font-size: .6rem;
                    color: rgba(0,0,0,0.5);
                }
            }
            .post-content{
                grid-column: 1 / span 2;
                font-size: 1rem;
                margin-top: 50px;
            }
        }
        .comments{
            display: grid;
            grid-row-gap: 30px;
            padding: 30px 0;
            .comments-comment{
                display: grid;
                grid-row-gap: 10px;
                grid-template: 1fr auto 1fr / auto auto ;
                .comments-comment-state{
                    
                }
                .comments-comment-owner{
                    justify-self: end;
                    font-weight: bold;
                }
                .comments-comment-content{
                    grid-column: 1 / span 2;
                    grid-row: 2 / span 1;
                }
                .comments-comment-ip{
                    font-size: .8rem;
                    color: ${Styles.colors.font.faded};
                }
                .comments-comment-createTime{
                    font-size: .8rem;
                    justify-self: end;
                    color: ${Styles.colors.font.faded};
                }
            }
        }
        .input{
            margin-top: 30px;
            display: grid;
            grid-row-gap: 10px;
            .input-state{
                display: grid;
                grid-template-columns: 1fr 1fr 1fr;
                width: fit-content;
                grid-column-gap: 5px;
                color: ${Styles.colors.border.darker};
                    svg:nth-child(1).active{
                        color: ${Styles.colors.font.good};
                    }
                    svg:nth-child(2).active{
                        color: ${Styles.colors.font.danger};
                    }
                    svg:nth-child(3).active{
                        color: ${Styles.colors.font.faded};
                    }
            }
            .input-content{
                width: 100%;
            }
            .input-bottom{
                padding: 10px 10px;
                border-radius: 5px;
                color: white;
                background-color: black;
                border: none;
                max-width: 200px;
                justify-self: center;
                width: 100%;
            }
        }
    }
    ${MEDIA_QUERY_MD}{
        .card-container{
        padding: 30px 60px;
        .post{
            .post-title{
                font-size: 1.5rem;
            }
            .post-detail{
                .post-owner{
                    font-size: 1rem;
                }
                .post-createTime{
                    font-size: .8rem;
                }
            }
            .post-content{
                grid-column: 1 / span 2;
                font-size: 1.2rem;
            }
        }
        .input{
            margin-top: 30px;
            display: grid;
            grid-row-gap: 20px;
            .input-state{
                display: grid;
                grid-template-columns: 1fr 1fr 1fr;
                width: fit-content;
                grid-column-gap: 5px;
            }
            .input-content{
            }
            .input-bottom{
            }
        }
    }
    }
    ${MEDIA_QUERY_XL}{
        width: 90%;
        margin: auto;
    .card-container{
        padding: 30px 60px;
        
    }
    }
  `;


const msgState = (input, isInput=false) => {
    if (input == 1 && isInput) return <ThumbUpAltOutlinedIcon/>
    else if (input == 1 ) return <ThumbUpAltOutlinedIcon color='success'/>
    else if (input == 2) return <ThumbDownOutlinedIcon />
    else return <ArrowRightAltIcon />
}

const useStyles = makeStyles({
    comments: {
        display: 'grid',
        gridRowGap: '30px',
        padding: '30px 0',
    },
    commentsComment: {
        display: 'grid',
        gridRowGap: '10px',
        gridTemplate: '1fr auto 1fr / auto auto ',
    },
    commentsCommentOwner: {
        justifySelf: 'end',
        fontWeight: 'bold',
    },
    commentsCommentContent: {
        gridColumn: '1 / span 2',
        gridRow: '2 / span 1',
    },
    commentsCommentIp: {
        fontSize: '.8rem',
        color: Styles.colors.font.faded,
    },
    commentsCommentCreateTime: {
        fontSize: '.8rem',
        justifySelf: 'end',
        color: Styles.colors.font.faded,
    },
});



export default function Article({ item }) {

    const [postAid, setPost] = useState(item.aid)
    const [brdname, setBrdname] = useState(item.brdname)
    const {
        username,
        myHashPassword,
        isLogIn } = useContext(pttContext)

    const classes = useStyles();

    const navigate = useNavigate();

    const showTime = (time) => {
        return moment(time).format('YYYY/MM/DD hh:mm:ss')
    }

    // Edit Comment Part
    const [commentType, setCommentType] = useState(3)
    const [inputcomment, setInputComment] = useState('')
    const [createComment] = useMutation(CREATE_COMMENT_MUTATION);

    // Edit Article Part
    const [editTitle, setEditTitle] = useState(item.title)
    const [editContent, setEditContent] = useState(item.content)
    const [edit_reply, setEdit_reply] = useState([])
    // ({cid: ,})
    // setEdit_reply([...edit_reply,])
    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);

    const handleEditOpen = () => { setEditOpen(true); };

    const handleDeleteOpen = () => { setDeleteOpen(true); };

    
    const EditCard = () => {
        return (
            <Dialog open={editOpen} onClose={() => setEditOpen(false)}>
                <DialogTitle>{item.username}</DialogTitle>
                <DialogContent>
                    <DialogContentText style={{ fontSize: '1.2rem' }} >
                        標題
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="editTitle"
                        type="editTitle"
                        fullWidth
                        value={editTitle}
                        onChange={(e) => { setEditTitle(e.target.value); }}
                        variant="standard"
                    />
                    <DialogContentText style={{ fontSize: '1.2rem', marginTop: '1rem' }}>
                        內文
                    </DialogContentText>
                    <form className='input-content' noValidate autoComplete="off" style={{ marginTop: '.5rem' }}>
                        <TextField
                            id="outlined-basic"
                            variant="outlined"
                            fullWidth
                            value={editContent}
                            onChange={(e) => { setEditContent(e.target.value); }}
                        />
                    </form>

                    <CardContent className={classes.comments} style={{ overflow: 'scroll' }}>
                        {item.comments.map((item) => (
                            <div className={classes.commentsComment} key={item.cid}>
                                <div className={classes.commentsCommentState}>
                                    {msgState(item.type)}
                                </div>
                                <div className={classes.commentsCommentOwner}>
                                    {item.owner}
                                </div>
                                <div className={classes.commentsCommentContent}>
                                    {item.content.split("\n").map(e => (
                                        <>
                                            {e}
                                            <br key={e} />
                                        </>
                                    ))}
                                </div>
                                <div className={classes.commentsCommentIp}>
                                    {item.location.ip}
                                </div>
                                <div className={classes.commentsCommentCreateTime}>
                                    {showTime(item.create_time)}
                                </div>
                                {item.body}
                            </div>
                        ))}
                    </CardContent>
                </DialogContent>
                <DialogActions  style={{padding: '30px'}}>
                    <Button onClick={() => setEditOpen(false)}>取消</Button>
                    <Button style={{ color: Styles.colors.font.danger }} onClick={() => { setEditOpen(false); updateEdit(); }}>更改</Button>
                </DialogActions>
            </Dialog>
        )
    }


    const WrapperDel = styled.div`
    `
    const DeleteCard = () => {
        return (
            <WrapperDel>
                <Dialog
                    open={deleteOpen}
                    onClose={() => setDeleteOpen(false)}
                    aria-labelledby="delete-title"
                    aria-describedby="delete-description"
                    style={{ padding: '80px', margin: 0 }}
                >
                    <DialogContent style={{ width: 'fit-content' }}>
                        <DialogContentText id="alert-dialog-description" style={{ width: 'fit-content' }}>
                            <h1 className='sure' style={{ color: Styles.colors.font.danger, width: '100%', fontSize: '1.8rem' }}> 確定刪除文章？</h1>
                            <p> 此步驟無法恢復</p>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setDeleteOpen(false)}>取消</Button>
                        <Button style={{ color: Styles.colors.font.danger }} onClick={() => sendDelete()} autoFocus color="#dc3545">
                            刪除
                        </Button>
                    </DialogActions>
                </Dialog>
            </WrapperDel>
        );
    }

    const [deleteArticle] = useMutation(DELETE_ARTICLE_MUTATION)
    const sendDelete = async () => {

        var delete1 = await deleteArticle({
            variables: {
                input: {
                    token: {
                        username: username,
                        password: myHashPassword,
                    },
                    aid: postAid,
                }
            }
        })
        if (delete1.data) {
            console.log("Post is deleted.")
            // navigate(`/${brdname}`)
            navigate("/home")
        }

    }

    const [updateArticle] = useMutation(UPDATE_ARTICLE_MUTATION,)
    const updateEdit = async () => {
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
                    comment_reply: [],
                }
            }, refetchQueries: [GET_ARTICLE_QUERY]
        })
        if (update.data) alert("Article is updated.")

    }

    const submitComment = async () => {
        if (inputcomment !== "") {
            var submit = await createComment({
                variables: {
                    input: {
                        token: {
                            username: username,
                            password: myHashPassword,
                        },
                        aid: postAid,
                        type: commentType,
                        content: inputcomment,
                    }
                }, refetchQueries: [GET_ARTICLE_QUERY]
            })
            if (submit.data) {
                setInputComment("");
            }
            else alert("Comment failed")
        }
    }
    const toggleIconClass=(e)=>{
        let el = e.target;
        console.log(el);
        el.classList.toggle('active');
    }
    return (
        <Wrapper>
            <div className="card-container bordered">
                <ArrowBackIosIcon onClick={()=>navigate(-1)}/>
                <div className="post">
                    <div className="post-title">{item.title}</div>
                    {(username == item.owner) ?
                        <div className="post-functions">
                            <div className="post-delete font-color-danger">
                                <DeleteIcon onClick={() => { handleDeleteOpen(); }} />
                            </div>
                            <div className="post-edit">
                                <EditIcon onClick={() => { handleEditOpen(); }} />
                            </div>
                        </div>
                        : <></>}

                    <DeleteCard />
                    <EditCard />
                    <div className="post-detail">
                        <div className="post-owner">
                            {item.owner}
                        </div>
                        <div className="post-createTime">
                            {showTime(item.create_time)}
                        </div>

                    </div>
                    <div className="post-content">
                        {item.content.split("\n").map(e => (
                            <>
                                {e}
                                <br key={e} />
                            </>
                        ))}
                    </div>
                </div>
                <Divider />
                <div className="comments">
                    {item.comments.map((item) => (
                        <div className='comments-comment' key={item.cid}>
                            <div className="comments-comment-state">
                                {msgState(item.type)}
                            </div>
                            <div className="comments-comment-owner">
                                {item.owner}
                            </div>
                            <div className="comments-comment-content">
                                {item.content.split("\n").map(e => (
                                    <>
                                        {e}
                                        <br key={e} />
                                    </>
                                ))}
                            </div>
                            <div className="comments-comment-ip">
                                {item.location.ip}
                            </div>
                            <div className="comments-comment-createTime">
                                {showTime(item.create_time)}
                            </div>
                            {item.body}
                        </div>
                    ))}
                </div>
                <Divider />
                {(isLogIn) ?
                    <div className='input'>
                        <div className='input-state'>
                            <ThumbUpAltOutlinedIcon onClick={(e) => { setCommentType(1); console.log(1); toggleIconClass(e);}} />
                            <ThumbDownOutlinedIcon onClick={(e) => { setCommentType(2); console.log(2); toggleIconClass(e);}} />
                            <ArrowRightAltIcon onClick={(e) => { setCommentType(3); console.log(3); toggleIconClass(e);}} />
                        </div>
                        <form className='input-content' noValidate autoComplete="off">
                            <TextField
                                id="outlined-basic"
                                variant="outlined"
                                fullWidth
                                value={inputcomment}
                                onChange={(e) => {
                                    setInputComment(e.target.value)
                                }}
                            />
                        </form>

                        <button className='input-bottom' size="small" onClick={() => submitComment()}>留言</button>
                    </div>
                    : <></>}
            </div>
        </Wrapper>
    );
}

