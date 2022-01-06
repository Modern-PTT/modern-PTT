// import logo from './logo.svg';
// import './App.css';
import { useState } from "react";
import ArticleBox from "./ArticleBox"
import Navbar from "../Components/Navbar"
import LeftList from "../Components/LeftList"
import styled from 'styled-components';
import BoardList from "../Components/BoardList";
import RightBoardList from "../Components/RightBoardList"

const WrapperRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 90vh;
  
  width: 80vw;
  margin: auto;
`;

const WrapperColumn = styled.div`
  display: flex;
  flex-direction: column;
  maxWidth: 90vh;
  margin: auto;
`;


function App() {
  const [atHome, setAtHome] = useState(true)

  return (
        <WrapperColumn>
          <Navbar/>
          <WrapperRow>
            {atHome
            ?<>
              <LeftList/>
              <RightBoardList/>
            </>
            :
            <>
              <BoardList/>
              <ArticleBox/>
            </>
            }
            
          </WrapperRow>
        </WrapperColumn>

  );
}

export default App;
