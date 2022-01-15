import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

import Link from '@mui/material/Link';

import styled from 'styled-components';
const StyledDiv = styled.div`
    height: 60vh;
    width: 80%;
    max-width: 1200px;
`
const GET_ALLBOARDS_QUERY ={
    "data": {
      "allBoards": [
        {
          "id":1,
          "brdname": "Baseball",
          "type": "board",
          "class": "棒球",
          "title": "[棒球] United For Baseball",
          "moderators": [
            "test"
          ]
        },
        {
          "id":2,
          "brdname": "C_Chat",
          "type": "board",
          "class": "閒談",
          "title": "[希洽] 求求你們不要再發系列文了",
          "moderators": [
            "test"
          ]
        },
        {
          "id":3,
          "brdname": "Gossiping",
          "type": "board",
          "class": "八卦",
          "title": "今晚我想來點...",
          "moderators": []
        },
        {
          "id":4,
          "brdname": "HatePolitics",
          "type": "board",
          "class": "Hate",
          "title": "[政黑]這裡是正黑旗",
          "moderators": [
            "test"
          ]
        },
        {
          "id":5,
          "brdname": "Lifeismoney",
          "type": "board",
          "class": "省錢",
          "title": "[省錢] 省錢板",
          "moderators": [
            "test"
          ]
        },
        {
          "id":6,
          "brdname": "LoL",
          "type": "board",
          "class": "遊戲",
          "title": "[LoL] 季後賽開始 快來參選板主",
          "moderators": [
            "test"
          ]
        },
        {
          "id":7,
          "brdname": "MobileComm",
          "type": "board",
          "class": "資訊",
          "title": "[通訊] Sony 1/5/10 III 新機登場",
          "moderators": [
            "test"
          ]
        },
        {
          "id":8,
          "brdname": "NBA",
          "type": "board",
          "class": "籃球",
          "title": "[NBA] 2021賽季開始了",
          "moderators": [
            "test"
          ]
        },
        {
          "id":9,
          "brdname": "sex",
          "type": "board",
          "class": "sex ",
          "title": "三位一體～",
          "moderators": []
        },
        {
          "id":10,
          "brdname": "Stock",
          "type": "board",
          "class": "學術",
          "title": "[股板] #DogeDay420",
          "moderators": [
            "test"
          ]
        },
        {
          "id":11,
          "brdname": "WhoAmI",
          "type": "board",
          "class": "嘰哩",
          "title": "呵呵，猜猜我是誰！",
          "moderators": []
        }
      ]
    }
  }

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
    flex: .5,
  },
  {
    field: 'title',
    headerName: 'title',
    flex: 1,
  },
  {
    field: 'moderators',
    headerName: 'moderators',
    flex: .5,
  },
];


export default function StickyHeadTable() {

  // handle page change in mui
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleRowClick = (url) =>{
    console.log("This is "+url)
    window.open(url, "_blank")
  }


  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {GET_ALLBOARDS_QUERY
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.name} value={row.name} onClick={(e)=>{handleRowClick(row.url)}}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10]}
        component="div"
        count={GET_ALLBOARDS_QUERY.data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
