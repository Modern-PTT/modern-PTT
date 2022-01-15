//provider.js
import React from "react";
import Content from "./content";
import { CatStateContext } from "./context";

const initialState = {
    username={username}
    setUsername={setUsername}
    myHashPassword={myHashPassword}
    setMyHashPassword={setMyHashPassword}

    isLogIn={isLogIn}
    setIsLogIn={setIsLogIn}
    
};

export const ProviderContext = () => {
  return (
    <CatStateContext.Provider value={initialState}>  
      <Content context={CatStateContext} />
    </CatStateContext.Provider>
  );
};

