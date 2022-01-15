import styled from 'styled-components';
import { useParams, useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { CREATE_ARTICLE_MUTATION } from "../../graphql";
import { useState, useEffect, useContext} from 'react';
import NewPostCard from '../../Components/NewPostCard';
import Navbar from "../../Components/Navbar"
import DashBoard from "../../Components/DashBoard"
import Row from "../../Components/Layout/Row"
//query某看板後拿回的簡要文章列表


const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 500px;
  width: 800px;
  margin: auto;
`;

const NewPost =  ({isLogIn,username ,myHashPassword}) =>{
 

    return(
      <>
        <Navbar isLogIn={isLogIn} />
        <div className="contents">
          <Row>
            <DashBoard />
            <NewPostCard
              username={username}
              myHashPassword={myHashPassword}
            />
          </Row>
        </div>
    </>);

}

export default NewPost;
