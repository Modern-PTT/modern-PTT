import styled from 'styled-components';
import { useQuery, useMutation } from '@apollo/client';
import { GET_BOARDS_QUERY, UPDATE_FAV_ARTICLES_MUTATION } from "../../graphql";
import { useState, useEffect } from 'react';

import { DataGrid } from '@material-ui/data-grid';
import Link from '@mui/material/Link';

import Navbar from "../../Components/News/NavbarPro"
import DashBoard from "../../Components/DashBoard"

import { MEDIA_QUERY_MD ,MEDIA_QUERY_XL } from '../../css/Media_query';

//set styled div
const StyledDiv = styled.div`
    padding-left: 1rem;
    padding-right: 1rem;
    width: 100%;
    grid-template-columns: 1fr 3fr;
    .dashBoard{
        display: none;
        position: fixed;
    }
    .wrapper{
        width: 100%;
        border: solid 1px rgba(0,0,0,0.1);
        padding: 100px 10px;
        padding-top: 50px;
        overflow: scroll;
        height: 90vh;

    }
    ${MEDIA_QUERY_MD}{
      .wrapper{
            justify-self: start;
            max-width: 1200px;
            padding: 120px 30px 100px 30px;
        }
    }
    ${MEDIA_QUERY_XL}{
        display: grid;
        grid-template-columns: 1fr 3fr;
        justify-content: center;
        align-content: center;
        padding-top: 120px;
        
        .dashBoard{
            justify-self: center;
            align-self: center;
        }
        .wrapper{
            justify-self: start;
            max-width: 1200px;
            padding: 120px 30px 100px 30px;
        }
    }
    
`


const AllBoards = ({ myLoveArticles, setMyLoveArticles, isLogIn, username, myHashPassword }) => {
  const [allBoards, setAllBoards] = useState('');
  const [updateFavArticles] = useMutation(UPDATE_FAV_ARTICLES_MUTATION)
  const { data, error, loading } = useQuery(GET_BOARDS_QUERY)


  useEffect(() => {
    if (data) setAllBoards(data.boards);
  }, [data])


  useEffect(() => {
    if (username) {
      var update = updateFavArticles({
        variables: {
          input: {
            token: {
              username: username,
              password: myHashPassword
            },
            aids: myLoveArticles
          }
        }
      })
    }

  }, [myLoveArticles])

  const columns = [
    {
      field: 'brdname',
      headerName: '看板',
      flex: 1,
      renderCell: (params) => (
        <Link underline="none" href={`/boards/${params.value}`}>{params.value}</Link>
      )
    },
    {
      field: 'class',
      headerName: '類別',
      flex: .5
    },
    {
      field: 'title',
      headerName: '標題',
      flex: 1
    },
    {
      field: 'moderators',
      headerName: '版主',
      flex: .5
    }
  ];
  return (
    <>
      <Navbar />
      <StyledDiv className="contents page-container">
        <DashBoard
          className="dashBoard" />
        <div className="wrapper bordered">
          {allBoards ?
            <DataGrid
              rows={allBoards}
              columns={columns}
              pageSize={10}
              getRowId={(row) => row.brdname}
              disableSelectionOnClick
            />
            : ''
          }
        </div>
      </StyledDiv>
    </>
    );

}

export default AllBoards;

