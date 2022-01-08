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
import Column from './Layout/Column';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import ArchiveIcon from '@mui/icons-material/Archive';
import FavoriteIcon from '@mui/icons-material/Favorite';
import NotificationAddIcon from '@mui/icons-material/NotificationAdd';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';


const useStyles = makeStyles({
  root: {
    minWidth: 700,
    // align-items: "space-between",
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
  height: 100px;
  width: 800px;
  margin: auto;
`;


const msgState = (input)=>{
  if (input == "1")return "👍"
  else if (input == "2")return "👎🏼"
  else return "-"
}


export default function AirticleCard({brdname,title,owner,create_time}) {
  const classes = useStyles();
  const classesText = useTextStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
      <Wrapper>
        <Card className={classes.root} variant="outlined">
            <CardContent>

                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                    {/* <Row justify="space-between"> */}
                      <>{brdname} {title} {owner}</>
                      <>{create_time}</>

                      <Tooltip title="收藏">
                        <IconButton>
                          <FavoriteIcon />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="追蹤">
                        <IconButton>
                          <NotificationAddIcon />
                        </IconButton>
                      </Tooltip>

                      <Button size="small" variant="contained" color="primary">追蹤</Button>
                    {/* </Row> */}
                    </Typography>

            </CardContent>
            {/* <CardActions>
                <Button size="small">留言</Button>
            </CardActions> */}
        </Card>
      </Wrapper>
  );
}
