import React from "react";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import './App.css'
import Profile from '../Profile/Profile'
import Register from '../Register/Register';
import Login from '../Login/Login';
import PageNotFound from '../PageNotFound/PageNotFound';
//import { Switch, Route } from 'react-router-dom'


function App() {
   return (
      <div className="App">
         <div className="page">
            {/* <Switch> */}
               <Header />
               <Main />
               <Movies />
               <Profile/>
               <Register/>
               <Login/>
               <PageNotFound/>
               {/* <Route exact path="/"> */}
                
               {/* </Route>
               <Route path="/*">
               </Route> */}
            {/* </Switch> */}
         </div>
      </div>
   );
}

export default App;
