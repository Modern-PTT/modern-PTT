// import logo from './logo.svg';
// import './App.css';
import { useState } from "react";
import ArticleBox from "./MainSpace/ArticleBox"
import Navbar from "../Components/Navbar"
import DashBoard from "../Components/DashBoard"
import styled from 'styled-components';
import BoardList from "../Components/BoardList";
import RightBoardList from "../Components/BoardList"
import ArticleList from "./MainSpace/ArticleList";
import Row from '../Components/Layout/Row'
import Column from '../Components/Layout/Column'

import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
  const [atHome, setAtHome] = useState(true)
  return (
        <BrowserRouter>        
              <Navbar/>
              <div className="contents">
                <DashBoard/>
                <Routes> 
                  <Route path="/hot" element={<BoardList/>}/>
                  <Route path="/:id" element={<BoardList/>}/>
                  <Route path="/newPost" element={<BoardList/>}/>
                  <Route path="/" element={<BoardList/>}/>
                  <Route path="/" element={<BoardList/>}/>
                  <Route path="*" element={<BoardList/>}/>
                </Routes>
              </div>
        </BrowserRouter>


  );
}

export default App;
