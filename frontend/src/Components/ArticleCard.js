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

const Row = styled.div`
  display: flex;
  flex-direction: row;
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
    //   <Wrapper>
        <Card className={classes.root} variant="outlined">
            <CardContent>
                <Row>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                    <>{brdname}</>
                    <>{title}</>
                    <>{owner}</>
                    <>{create_time}</>
                    {/* <Button size="small">Learn More</Button> */}
                    </Typography>
                </Row>
            </CardContent>
            {/* <CardActions>
                <Button size="small">留言</Button>
            </CardActions> */}
        </Card>
    // </Wrapper>
  );
}
