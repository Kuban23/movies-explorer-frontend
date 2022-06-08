import React from "react";
// import Header from "../Header/Header";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import './App.css'
// import Profile from '../Profile/Profile'
// import Register from '../Register/Register';
// import Login from '../Login/Login';
// import PageNotFound from '../PageNotFound/PageNotFound';
import { Switch, Route } from 'react-router-dom'
import SavedMovies from '../SavedMovies/SavedMovies'
import Register from '../Register/Register'
import Login from '../Login/Login';
import Profile from '../Profile/Profile'

function App() {

// Состояние отображение станицы "Фильмы"


   return (
      <div className="App">
         <div className="page">
            <Switch>
               
               {/* <Main /> */}
               {/* <Movies />
               <Profile/>
               <Register/>
               <Login/>
               <PageNotFound/> */}
               <Route exact path="/">
              <Main />
               </Route>

               <Route exact path="/movies">
              <Movies  />
               </Route>

               <Route exact path="/saved-movies">
              <SavedMovies  />
               </Route>
               
               <Route exact path="/signup">
              <Register  />
               </Route>

               <Route exact path="/signin">
              <Login  />
               </Route>

               <Route exact path="/profile">
              <Profile  />
               </Route>
              
            </Switch>
         </div>
      </div>
   );
}

export default App;
