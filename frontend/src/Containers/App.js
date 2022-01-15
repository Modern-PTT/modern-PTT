import { useState, createContext } from "react";
import Article from "./Pages/Article";
import NewPost from '../Containers/Pages/NewPost'
import Board from "./Pages/Board";
import favBoards from "./Pages/favBoards";
import AllBoards from './Pages/AllBoards'
import HotBoards from './Pages/HotBoards'
import SearchBoards from './Pages/SearchBoards'
import NotFound from "./Pages/NotFound";
import favArticles from "./Pages/favArticles";
import Intro from "../Containers/Pages/Intro";
import Home from '../Containers/Pages/Home'

import Login from '../Components/Login'
import SingUp from '../Components/SingUp'
import styled from "styled-components";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import GlobalStyle from "../css/GlobalStyle";
import {colors} from '../Containers/Effects/BgBubble';

// const LOCALSTORAGE_KEY = "save-me";


//Css
const StyledApp = styled.div`
`
const LOCALSTORAGE_USERNAME = "saveMyUsername";
const LOCALSTORAGE_HASHEDPW = "saveMyHashedPassword";

export const pttContext = createContext()

function App() {

  const savedUsername = localStorage.getItem(LOCALSTORAGE_USERNAME);
  const savedHashedPassword = localStorage.getItem(LOCALSTORAGE_HASHEDPW);
  
  // TODO USERNAME PASSWORD SALT
  const [username, setUsername] = useState(savedUsername || '')
  const [myHashPassword, setMyHashPassword] = useState(savedHashedPassword || '')
  const [isLogIn, setIsLogIn] = useState((savedUsername && savedHashedPassword)? true : false)

  const [favBoards, setFavBoards] = useState([])
  const [favArticles, setFavArticles] = useState([])


  return (

    <pttContext.Provider value={{
      username, setUsername,
      myHashPassword, setMyHashPassword,
      isLogIn, setIsLogIn,
      favBoards, setFavBoards,
      favArticles, setFavArticles
    }}>
      <GlobalStyle/>
      <BrowserRouter>
            <Routes>
              <Route path='/' element={<Navigate to='/intro'/>}/>
              <Route path='/intro' element={<Intro/>}/>
              <Route path='/login' element={<Login/>}/>
              <Route path='/signup' element={<SingUp/>}/>
              <Route path='/home' element={<Home />}/>

                {/* Home_熱門文章 */}
              <Route path='/allboards' element={<AllBoards />}/>
                {/* Home_所有看板 */}
              <Route path='/hotboards' element={<HotBoards isLogIn={isLogIn}/>}/>
                {/* Home_熱門看板 */}
              <Route path='/favArticles' element={<favArticles/>}/>
              <Route path='/favBoards' element={<favBoards/>}/>

              <Route path='/search/boards' element={<SearchBoards/>}/>
              {/* <Route path='/search/articles' element={<Board/>}/> */}
              <Route path='/:brdname' element={<Board/>}/>
              <Route path='/:brdname/:aid' element={<Article/>}/>
              <Route path='/:brdname/NewPost' element={<NewPost />}/>
              <Route path='*' element={<NotFound/>}/>
            </Routes> 
      </BrowserRouter>
    </pttContext.Provider>

  );
}

export default App;
