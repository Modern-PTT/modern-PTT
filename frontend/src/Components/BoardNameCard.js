import * as React from 'react';
import styled from 'styled-components';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import { MEDIA_QUERY_MD, MEDIA_QUERY_XL } from "../css/Media_query";

import Link from '@mui/material/Link';

const Wrapper = styled.div`
  width: 100%;
  display: grid;
  justify-content: center;
  align-content: center;
  margin: 30px 0px;
  .inner-container{
    display: grid;
    justify-content: center;
    align-content: center;
    width: fit-content;
    padding: 20px 80px;
    background-color: rgba(255,255,255,0.87);
    .text-gradient{
      font-size: 2rem;
      font-weight: bold;
      text-align: center;
    }
    .link{
      position: absolute;
      right: 5%;
      bottom: 5%;
      color: rgba(0,0,0,0.7);
    }
  }
  ${MEDIA_QUERY_MD}{
    margin: 30px 0; 
    .inner-container{
    padding: 30px 120px;
    .text-gradient{
      font-size: 2rem;
    }
    .link{
      right: 5%;
      bottom: 5%;
    }
  }
  }
`;



export default function BoardNameCard({ nowAtWhere, isEdible = true }) {


  return (
    <Wrapper>
      <div className="inner-container bordered">
        <div className="title">
          您現在位於
          <div className="text-gradient">
            {nowAtWhere}
          </div>
        </div>
        {isEdible ?
          <Link className='link' href={`/${nowAtWhere}/NewPost`}><DriveFileRenameOutlineIcon className='icon' /></Link> : <></>
        }
      </div>
    </Wrapper>

  );
}
