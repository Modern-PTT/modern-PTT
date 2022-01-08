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

import Intro from "../Containers/Pages/Intro";
import Home from '../Containers/Pages/Home'

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";


function App() {

  return (
    <>
        <BrowserRouter>
              <Routes>
                <Route path='/' element={<Navigate to='/intro'/>}/>
                <Route path='/intro' element={<Intro/>}/>
                <Route path='/home' element={<Home/>}/>
                <Route path='/category' element={<Home/>}/>
                <Route path='/hot' element={<Home/>}/>
                <Route path='/home' element={<Home/>}/>
              </Routes> 
        </BrowserRouter>
    </>

  );
}

export default App;
