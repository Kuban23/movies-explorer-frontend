import React from "react";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import './App.css'


function App() {
   return (
      <div className="App">
         <div className="page">
            <Header />
            <Main />
            <Movies />
         </div>


      </div>
   );
}

export default App;
