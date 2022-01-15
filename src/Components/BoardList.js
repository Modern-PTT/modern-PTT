import * as React from 'react';
import { useEffect, useContext } from 'react';
import  {DataGrid}  from '@material-ui/data-grid';
import styled from 'styled-components';
import Link from '@mui/material/Link';
import IconButton from '@mui/material/IconButton';

import NotificationAddIcon from '@mui/icons-material/NotificationAdd';
import { pttContext } from '../Containers/App';


//set styled div
const StyledDiv = styled.div`
    height: 60vh;
    width: 80%;
    max-width: 1200px;
`


export default function DataTable() {

  const {
    favBoards,
    setFavBoards,
  } = useContext(pttContext)

  const AddFavBoards = (input) =>{
    console.log(input)
    setFavBoards(favBoards.concat(input));
  }

  useEffect(() => {
    console.log(favBoards)
  }, [favBoards])

  const columns = [
    {
      field: 'brdname',
      headerName: 'BoardName',
      flex: .5,
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
      headerName: '加入最愛',
      flex: .5,
      renderCell: (params) => (
        <IconButton>
            <NotificationAddIcon onClick={()=>AddFavBoards(params.row.brdname)} />
        </IconButton>
      )
    },

  ];





  return (
    <StyledDiv>
      {/* <DataGrid
        rows={GET_ALLBOARDS_QUERY.data.allBoards}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
      /> */}
    </StyledDiv>
  );
}