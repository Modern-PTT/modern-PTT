import Button from '@material-ui/core/Button';
import styled from 'styled-components';
import { useParams, useHistory } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_HOTBOARDS } from "../../graphql";
import { useState, useEffect} from 'react';
import  {DataGrid}  from '@material-ui/data-grid';
import Link from '@mui/material/Link';
import Navbar from "../../Components/Navbar"
import DashBoard from "../../Components/DashBoard"


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


const HotBoards =  ({isLogIn}) =>{
  const [hotBoards, setHotBoards] = useState('');

  const {data, error, loading} =  useQuery(GET_HOTBOARDS)
   
  
  useEffect(() => {
    if(data) setHotBoards(data.hotBoards);
  }, [data])
  console.log(hotBoards)

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
                  {hotBoards?
                    <DataGrid
                    rows={hotBoards}
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

export default HotBoards;

