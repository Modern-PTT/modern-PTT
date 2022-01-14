import { useState } from "react";
import Article from "./Pages/Article";
import NewPost from '../Containers/Pages/NewPost'
import Board from "./Pages/Board";
import myLoveArticles from "./Pages/myLoveArticles";
import Intro from "../Containers/Pages/Intro";
import Home from '../Containers/Pages/Home'
import AllBoards from './Pages/AllBoards'
import HotBoards from './Pages/HotBoards'
import SearchBoards from './Pages/SearchBoards'
import Login from '../Components/Login'
import SingUp from '../Components/SingUp'

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// const LOCALSTORAGE_KEY = "save-me";

const LOCALSTORAGE_USERNAME = "saveMyUsername";
const LOCALSTORAGE_HASHEDPW = "saveMyHashedPassword";

function App() {
  const savedUsername = localStorage.getItem(LOCALSTORAGE_USERNAME);
  const savedHashedPassword = localStorage.getItem(LOCALSTORAGE_HASHEDPW);
  // const savedUserName = localStorage.getItem(LOCALSTORAGE_KEY);
  
  // TODO USERNAME PASSWORD SALT
  const [username, setUsername] = useState(savedUsername || '')
  const [myHashPassword, setMyHashPassword] = useState(savedHashedPassword || '')
  const [isLogIn, setIsLogIn] = useState((savedUsername && savedHashedPassword)? true : false)

  const [myLoveBoards, setMyLoveBoards] = useState([])
  const [myLoveArticles, setMyLoveArticles] = useState([])
  console.log(myHashPassword)
  return (
    <>
        <BrowserRouter>
              <Routes>
                <Route path='/' element={<Navigate to='/intro'/>}/>
                <Route path='/intro' element={<Intro/>}/>
                <Route path='/login' element={
                  <Login
                    username={username}
                    setUsername={setUsername}
                    myHashPassword={myHashPassword}
                    setMyHashPassword={setMyHashPassword}
                    isLogIn={isLogIn}
                    setIsLogIn={setIsLogIn}
                  />
                  }/>
                <Route path='/signup' element={
                  <SingUp
                    username={username}
                    setUsername={setUsername}
                    myHashPassword={myHashPassword}
                    setMyHashPassword={setMyHashPassword}
                    isLogIn={isLogIn}
                    setIsLogIn={setIsLogIn}
                  />
                  }/>

                <Route path='/home' element={
                  <Home 
                    username={username}
                    setUsername={setUsername}
                    myHashPassword={myHashPassword}
                    setMyHashPassword={setMyHashPassword}
                    isLogIn={isLogIn}
                    setIsLogIn={setIsLogIn}

                    myLoveBoards={myLoveBoards}
                    setMyLoveBoards={setMyLoveBoards}
                    myLoveArticles={myLoveArticles}
                    setMyLoveArticles={setMyLoveArticles}
                  />
                  }/>
                  {/* Home_熱門文章 */}
                <Route path='/allboards' element={
                  <AllBoards 
                    isLogIn={isLogIn}
                    myLoveArticles={myLoveArticles}
                    setMyLoveArticles={setMyLoveArticles}
                    username={username}
                    myHashPassword={myHashPassword}
                    />}
                  />
                  {/* Home_所有看板 */}
                <Route path='/hotboards' element={<HotBoards isLogIn={isLogIn}/>}/>
                  {/* Home_熱門看板 */}

                <Route path='/myLoveArticles' element={
                  <myLoveArticles
                    myLoveArticles={myLoveArticles}
                    setMyLoveArticles={setMyLoveArticles}
                    username={username}
                    myHashPassword={myHashPassword}
                  />
                  }/>
                {/* <Route path='/category' element={<Category/>}/> */}
                <Route path='/search/boards' element={<SearchBoards/>}/>
                {/* <Route path='/search/articles' element={<Board/>}/> */}
                <Route path='/boards/:brdname' element={
                  <Board
                    isLogIn={isLogIn}
                    myLoveArticles={myLoveArticles}
                    setMyLoveArticles={setMyLoveArticles}
                    username={username}
                    myHashPassword={myHashPassword}
                  />
                  }/>
                <Route path='/boards/:brdname/:aid' element={
                  <Article
                    isLogIn={isLogIn}
                    myLoveArticles={myLoveArticles}
                    setMyLoveArticles={setMyLoveArticles}
                  />
                  }/>
                <Route path='/:brdname/NewPost' element={
                  <NewPost 
                  isLogIn={isLogIn}
                  username={username}
                  myHashPassword={myHashPassword}
                  />}
                  />
                <Route path='*' element={<Home isLogIn={isLogIn}/>}/>
              </Routes> 
        </BrowserRouter>
    </>

  );
}

export default App;
