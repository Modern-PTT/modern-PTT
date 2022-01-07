// import logo from './logo.svg';
// import './App.css';
import { useState } from "react";
import ArticleBox from "./MainSpace/ArticleBox"
import Navbar from "../Components/Navbar"
import LeftList from "../Components/DashBoard"
import styled from 'styled-components';
import BoardList from "../Components/BoardList";
import RightBoardList from "../Components/BoardList"
import ArticleList from "./MainSpace/ArticleList";
import Row from '../Components/Layout/Row'
import Column from '../Components/Layout/Column'

const WrapperRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: fixed;
  height: 90vh;
  width: 80vw;
  margin: auto;
`;

// const Column = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: ${props=>props.justify};
//   align-items: ${props=>props.align};
// `;


// const Row = styled.div`
//   display: flex;
//   flex-direction: row;
//   justify-content: ${props=>props.justify};
//   align-items: ${props=>props.align};
// `;

function App() {
  const [atHome, setAtHome] = useState(true)

  return (
        // <Column>
        <>
          <Navbar/>
          <WrapperRow>
          <LeftList/>
            {atHome
              ? <>
                {/* <RightBoardList/> */}
                  <BoardList/>
                  {/* <Column>
                    <ArticleList/>
                  </Column> */}
                </>
              : <ArticleBox/>
            } 
        </WrapperRow>
        </>
        //</Column>

  );
}

export default App;
