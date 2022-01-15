import styled from 'styled-components';
import ArticleCard from '../../Components/ArticleCard'
import { DataGrid } from '@material-ui/data-grid';
import Link from '@mui/material/Link';
// import  graphql  from 'graphql';
import { useParams, useHistory } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_BOARDS_QUERY } from "../../graphql";
import { useState, useEffect, useContext } from 'react';

import { pttContext } from '../App';

import Navbar from "../../Components/News/NavbarPro"
import DashBoard from "../../Components/DashBoard"
//query某看板後拿回的簡要文章列表


import { MEDIA_QUERY_MD, MEDIA_QUERY_XL } from '../../css/Media_query';

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

const SearchBoard = () => {



  const { simpleBoardSearch } = useContext(pttContext)
  console.log(simpleBoardSearch);

  const [allBoards, setAllBoards] = useState('');

  const { data, error, loading } = useQuery(GET_BOARDS_QUERY, {
    variables: {
      keywords: simpleBoardSearch,
    }
  })

  useEffect(() => {
    if (data) setAllBoards(data.boards);
  }, [data])

  //set styled div

  const columns = [
    {
      field: 'brdname',
      headerName: 'BoardName',
      flex: 1,
      renderCell: (params) => (
        <Link href={`/${params.value}`}>{params.value}</Link>
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
    },

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

export default SearchBoard;

