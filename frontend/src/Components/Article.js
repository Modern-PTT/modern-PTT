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

// import Message from '../hooks/Message';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';


import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FavoriteIcon from '@mui/icons-material/Favorite';
import NotificationAddIcon from '@mui/icons-material/NotificationAdd';


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
  if (input == "推")return <ThumbUpAltOutlinedIcon/>
  else if (input == "噓")return <ThumbDownOutlinedIcon/>
  else return <ArrowRightAltIcon/>
}



const  GET_AIRTICLE_QUERY=
    {
      "data": {
        "article": {
          "title": "[問題] openbbsmiddleware-0.17.4",
          "owner": "test2000",
          "content": "會不會有問題呢？～ XD.\n",
          "location": {
            "ip": "172.18.0.1",
            "country": "private"
          },
          "comments": [
            {
              "type": "推",
              "owner": "test2000",
              "content": "結果是沒問題喔～ 但是好像 frontend 的推/噓有問題 XD",
              "location": {
                "ip": "140.112.172.11",
                "country": "TW, Taipei"
              },
              "create_time": 1626000949000
            },
            {
              "type": "噓",
              "owner": "test2000",
              "content": "結果是沒問題喔～ 但是好像 frontend 的推/噓有問題 XD",
              "location": {
                "ip": "140.112.172.11",
                "country": "TW, Taipei"
              },
              "create_time": 1626000949000
            }
          ]
        }
      }
    }


export default function Airticle({article}) {
  const classes = useStyles();
  const classesText = useTextStyles();
  const bull = <span className={classes.bullet}>•</span>;
  let testdate = 1637848118000

  const secondToDate = (seconds)=>{
      const date = seconds.getDate() //15
      const day = seconds.getDay()  //5
      const month = seconds.getMonth()  //6
      const year = seconds.getFullYear()  //2016
      return date
  }

  // change to attach each airticle
  // const [articles, setArticles] = useState('');

  // const {brdname} = useParams()
  // console.log(brdname)
  // const {data, error, loading} =  useQuery(GET_BOARD_ARTICLES_QUERY,{
  //   variables: {
  //     brdname: brdname,
  //   }
  // })
  
  // useEffect(() => {
  //   if(data) setArticles(data.board.articles);
  // }, [data])

  return (
      <Wrapper>
        <Card className={classes.root} variant="outlined">
            <CardContent>
                    {/* <Typography className={classes.title} color="textSecondary" gutterBottom> */}
                      <Row justify="space-between" align="center">
                        <div>標題｜{article.title}</div>
                        <div>
                        <Tooltip title="收藏">
                            <IconButton>
                              <FavoriteIcon />
                            </IconButton>
                          </Tooltip>

                        </div>
                      </Row>

                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    作者｜{article.owner}
                </Typography>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    時間｜{article.time}
                </Typography>
                <p></p>
                <Divider />
                <p></p>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                {article.content}
                </Typography>
                <Typography className={classes.title} color="textSecondary" gutterBottom l>
                {/* {data.url} */}
                </Typography>

            </CardContent>
            <Divider />

    
            <CardContent>
                {article.comments.map((item)=>(
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                    <Row align="center">
                        <>{msgState(item.type) }{item.owner} </> <>{item.location.ip}   {item.create_time}</>
                    </Row>
                    {item.body}
                    </Typography>
                
                ))}
            </CardContent>
            <Row justify="space-around"align="center">
              <div>
                <ThumbUpAltOutlinedIcon/>
                <ThumbDownOutlinedIcon/>
                <ArrowRightAltIcon/>
              </div>
              <form className={classesText.root} noValidate autoComplete="off">
                <TextField id="outlined-basic"  variant="outlined" />
              </form>
              {/* <CardActions > */}
                <Row justify="flex-end">
                  <Button size="small">留言</Button>
                </Row>
              {/* </CardActions> */}
            </Row>

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
