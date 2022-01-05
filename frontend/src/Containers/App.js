// import logo from './logo.svg';
// import './App.css';
import ArticleBox from "./ArticleBox"
import Navbar from "../Components/Navbar"
import LeftList from "../Components/LeftList"
import styled from 'styled-components';

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
  return (
    <WrapperColumn>
      <Navbar/>
      <WrapperRow>
        <LeftList/>
        <ArticleBox/>
      </WrapperRow>
    </WrapperColumn>
  );
}

export default App;
