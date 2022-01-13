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
import myLoveArticles from "./Pages/myLoveArticles";
import Intro from "../Containers/Pages/Intro";
import Home from '../Containers/Pages/Home'
import Category from '../Containers/Pages/Category'
import AllBoards from './Pages/AllBoards'
import HotBoards from './Pages/HotBoards'
import SearchBoards from './Pages/SearchBoards'

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";


function App() {

  // TODO USERNAME PASSWORD SALT
  const [me, setMe] = useState()
  const [meSalt, setMeSalt] = useState()
  const [myLoveBoards, setMyLoveBoards] = useState([])
  const [myLoveArticles, setMyLoveArticles] = useState([])

  return (
    <>
        <BrowserRouter>
              <Routes>
                <Route path='/' element={<Navigate to='/intro'/>}/>
                <Route path='/intro' element={<Intro/>}/>
                <Route path='/home' element={
                  <Home 
                    myLoveBoards={myLoveBoards}
                    setMyLoveBoards={setMyLoveBoards}
                    myLoveArticles={myLoveArticles}
                    setMyLoveArticles={setMyLoveArticles}
                  />
                  }/>
                  {/* Home_熱門文章 */}
                <Route path='/allboards' element={<AllBoards/>}/>
                  {/* Home_所有看板 */}
                <Route path='/hotboards' element={<HotBoards/>}/>
                  {/* Home_熱門看板 */}

                <Route path='/myLoveArticles' element={
                  <myLoveArticles
                    myLoveArticles={myLoveArticles}
                    setMyLoveArticles={setMyLoveArticles}
                  />
                  }/>
                {/* <Route path='/category' element={<Category/>}/> */}
                <Route path='/search/boards' element={<SearchBoards/>}/>
                {/* <Route path='/search/articles' element={<Board/>}/> */}
                <Route path='/boards/:brdname' element={
                  <Board
                    myLoveArticles={myLoveArticles}
                    setMyLoveArticles={setMyLoveArticles}
                  />
                  }/>
                <Route path='/boards/:brdname/:aid' element={
                  <Article
                    myLoveArticles={myLoveArticles}
                    setMyLoveArticles={setMyLoveArticles}
                  />
                  }/>
                <Route path='/NewPost' element={<NewPost/>}/>
                <Route path='*' element={<Home/>}/>
              </Routes> 
        </BrowserRouter>
    </>

  );
}

export default App;
