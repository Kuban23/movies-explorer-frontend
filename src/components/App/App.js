import React from "react";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import './App.css'
import Profile from '../Profile/Profile'
// import { Switch, Route } from 'react-router-dom'


function App() {
   return (
      <div className="App">
         <div className="page">
            {/* <Switch> */}
               <Header />
               <Main />
               <Movies />
               <Profile/>
               {/* <Route exact path="/">
                  <Main />
               </Route>
               <Route path="/*">
               </Route> */}
            {/* </Switch> */}
         </div>
      </div>
   );
}

export default App;
