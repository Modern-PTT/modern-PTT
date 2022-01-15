import * as React from 'react';
import  {DataGrid}  from '@material-ui/data-grid';
import styled from 'styled-components';
import Link from '@mui/material/Link';

//set styled div
const StyledDiv = styled.div`
    height: 60vh;
    width: 80%;
    max-width: 1200px;
`

const columns = [
  {
    field: 'brdname',
    headerName: 'BoardName',
    flex: 1,
    renderCell: (params) => (
      <Link href={`/boards/${params.value}`}>{params.value}</Link>
    )
    // width: 200,
    // editable: true,
  },
  {
    field: 'class',
    headerName: 'class',
    flex: .5
    // type: 'number',
    // width: 110,
    // editable: true,
  },
  {
    field: 'title',
    headerName: 'title',
    flex: 1
    // type: 'number',
    // width: 250,
    // editable: true,
  },
  {
    field: 'moderators',
    headerName: 'moderators',
    flex: .5
    // type: 'number',
    // width: 110,
    // editable: true,
  }
];


export default function HotList({inputrows}) {
  return (
    <StyledDiv>
      <DataGrid
        rows={inputrows}
        columns={columns}
        pageSize={10}

        disableSelectionOnClick
      />
    </StyledDiv>
  );
}