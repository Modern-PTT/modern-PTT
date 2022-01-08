// import logo from './logo.svg';
// import './App.css';
import { useState } from "react";
import ArticleBox from "./MainSpace/ArticleBox"
import Navbar from "../Components/Navbar"
import DashBoard from "../Components/DashBoard"
import styled from 'styled-components';
import BoardList from "../Components/BoardList";
import RightBoardList from "../Components/BoardList"
import Article from "./Pages/Article";
import Row from '../Components/Layout/Row'
import Column from '../Components/Layout/Column'
import NewPost from '../Containers/Pages/NewPost'
import Board from "./Pages/Board";

import Intro from "../Containers/Pages/Intro";
import Home from '../Containers/Pages/Home'
import Category from '../Containers/Pages/Category'
import Hot from '../Components/HotList'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";


function App() {

  return (
    <>
        <BrowserRouter>
              <Routes>
                <Route path='/' element={<Navigate to='/intro'/>}/>
                <Route path='/intro' element={<Intro/>}/>
                <Route path='/home' element={<Home/>}/>
                <Route path='/hot' element={<Hot/>}/>
                <Route path='/category' element={<Category/>}/>
                <Route path='/boards/:brdname' element={<Board/>}/>
                <Route path='/boards/:brdname/:aid' element={<Article/>}/>
                <Route path='/NewPost' element={<NewPost/>}/>
                <Route path='*' element={<Home/>}/>
              </Routes> 
        </BrowserRouter>
    </>

  );
}

export default App;
