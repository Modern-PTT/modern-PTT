import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import Button from '@mui/material/Button';
import styled from 'styled-components';
import Row from './Layout/Row'

import ModeEditIcon from '@mui/icons-material/ModeEdit';
import Tooltip from '@mui/material/Tooltip';
import Link from '@mui/material/Link';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 500px;
  width: 800px;
  margin: auto;
`;



export default function BoardNameCard({nowAtWhere}) {


  return (
    <Wrapper>
        <Card sx={{ display: 'flex' }}>
          <div sx={{ display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flex: '1 0 auto' }}>
              <Typography component="div" variant="h5">
                  您現在位於 {nowAtWhere} 板
              </Typography>

              <Tooltip title="發文">  
                  <IconButton aria-label="NewPost" color="inherit">
                    <Link href={`/${nowAtWhere}/NewPost`}>
                      <ModeEditIcon/>
                    </Link>
                  </IconButton>
                </Tooltip>

              </CardContent>
          </div>
        </Card>
    </Wrapper>

  );
}
