import styled from 'styled-components';
import { useQuery, useMutation } from '@apollo/client';
import { GET_BOARDS_QUERY, UPDATE_FAV_ARTICLES_MUTATION } from "../../graphql";
import { useState, useEffect} from 'react';

import  {DataGrid}  from '@material-ui/data-grid';
import Link from '@mui/material/Link';

import Navbar from "../../Components/Navbar"
import DashBoard from "../../Components/DashBoard"
// import HotList from '../../Components/HotList'
//query某看板後拿回的簡要文章列表


//set styled div
const StyledDiv = styled.div`
    height: 60vh;
    width: 80%;
    max-width: 1200px;
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 500px;
  width: 1000px;
  margin: auto;
`;


const AllBoards =  ({myLoveArticles, setMyLoveArticles,isLogIn, username, myHashPassword}) =>{
  const [allBoards, setAllBoards] = useState('');
  const [updateFavArticles] = useMutation(UPDATE_FAV_ARTICLES_MUTATION)
  const {data, error, loading} =  useQuery(GET_BOARDS_QUERY)

  
  useEffect(() => {
    if(data) setAllBoards(data.boards);
  }, [data])


  useEffect(() => {
    if(username) {
      var update = updateFavArticles({
        variables:{
          input:{
            token:{
              username: username,
              password: myHashPassword
            },
            aids:  myLoveArticles
          }
        }
      })
    }
    // if(update)alert("update myLoveArticles success!")

  }, [myLoveArticles])

  const columns = [
    {
      field: 'brdname',
      headerName: 'BoardName',
      flex: 1,
      renderCell: (params) => (
        <Link href={`/boards/${params.value}`}>{params.value}</Link>
      )
    },
    {
      field: 'class',
      headerName: 'class',
      flex: .5
    },
    {
      field: 'title',
      headerName: 'title',
      flex: 1
    },
    {
      field: 'moderators',
      headerName: 'moderators',
      flex: .5
    }
  ];
    return(
      <>
        <Navbar isLogIn={isLogIn} />
        <div className="contents">
            <DashBoard />
        </div>
        <Wrapper>
                {/* <HotList/> */}
                <StyledDiv>
                  {allBoards?
                    <DataGrid
                    rows={allBoards}
                    columns={columns}
                    pageSize={10}
                    getRowId={(row) => row.brdname}
                    disableSelectionOnClick
                  />
                  :''
                  }

                </StyledDiv>
          </Wrapper>
    </>);

}

export default AllBoards;

