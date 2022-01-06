import * as React from 'react';
import  {DataGrid}  from '@material-ui/data-grid';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'BoardName',
    headerName: 'BoardName',
    width: 150,
    editable: true,
  },
  {
    field: 'BoradEName',
    headerName: 'BoradEName',
    width: 150,
    editable: true,
  },
  {
    field: 'detail',
    headerName: 'detail',
    type: 'number',
    width: 110,
    editable: true,
  },
//   {
//     field: 'fullName',
//     headerName: 'Full name',
//     description: 'This column has a value getter and is not sortable.',
//     sortable: false,
//     width: 160,
//     valueGetter: (params) =>
//       `${params.getValue(params.id, 'firstName') || ''} ${
//         params.getValue(params.id, 'lastName') || ''
//       }`,
//   },
];

const rows = [
  { id: 1, BoardName: 'Snow', BoradEName: 'Jon', detail: 35 },
  { id: 2, BoardName: 'Snow', BoradEName: 'Jon', detail: 35 },
  { id: 3, BoardName: 'Snow', BoradEName: 'Jon', detail: 35 },
  { id: 4, BoardName: 'Snow', BoradEName: 'Jon', detail: 35 }

];

export default function DataTable() {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        // checkboxSelection
        disableSelectionOnClick
      />
    </div>
  );
}