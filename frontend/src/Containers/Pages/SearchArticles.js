import styled from 'styled-components';
import ArticleCard from '../../Components/ArticleCard'
import { useParams, useHistory } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_BOARDS_QUERY } from "../../graphql";
import { useState, useEffect, useContext} from 'react';

import { pttContext } from '../App';

import Navbar from "../../Components/Navbar"
import DashBoard from "../../Components/DashBoard"



const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 500px;
  width: 800px;
  margin: auto;
`;

const SearchBoard =  ( ) =>{

  
  const { 
    simpleBoardSearch 
  } = useContext(pttContext)
  console.log(simpleBoardSearch);

  const [allBoards, setAllBoards] = useState('');

  const {data, error, loading} =  useQuery(GET_BOARDS_QUERY,{
    variables: {
      keywords: simpleBoardSearch,
    }
  })
  
  useEffect(() => {
    if(data) setAllBoards(data.boards);
  }, [data])


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
    return(
      <>
        <Navbar/>
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

export default SearchBoard;

