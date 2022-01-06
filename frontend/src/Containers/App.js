// import logo from './logo.svg';
// import './App.css';
import { useState } from "react";
import ArticleBox from "./MainSpace/ArticleBox"
import Navbar from "../Components/Navbar"
import LeftList from "../Components/DashBoard"
import styled from 'styled-components';
import BoardList from "../Components/BoardList";
import RightBoardList from "../Components/BoardList"
import AirticleList from "./MainSpace/AirticleList";


const WrapperRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 90vh;
  
  width: 80vw;
  margin: auto;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;

`;
const Row = styled.div`
  display: flex;
  flex-direction: column;

`;

function App() {
  const [atHome, setAtHome] = useState(true)

  return (
        <Column>
          <Navbar/>
          <WrapperRow>
            <LeftList/>
              {atHome
                ? 
                  // <RightBoardList/>
                  <BoardList/>
                  // <Column>
                    /* <AirticleList/> */
                  // </Column>
                : <ArticleBox/>
              } 
          </WrapperRow>
        </Column>

  );
}

export default App;
