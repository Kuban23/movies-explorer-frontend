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


 // Состояние авторизации пользователя(вошел в систему или нет)
 const [loggedIn, setloggedIn] = React.useState(true); //false не залогинился, true залогинился

 const [savedMovies, setSavedMovies] = React.useState(3)

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
              <Main loggedIn={loggedIn}/>
              
               </Route>

               <Route exact path="/movies">
              <Movies loggedIn={loggedIn} />
               </Route>

              <Route exact path="/saved-movies">
              <SavedMovies  loggedIn={loggedIn} savedMovies={savedMovies}/>
              </Route>
               
               <Route exact path="/signup">
              <Register  />
              </Route>

               <Route exact path="/signin">
              <Login  />
              </Route>

               <Route exact path="/profile">
              <Profile />
              </Route>
              
            </Switch>
         </div>
      </div>
   );
}

export default App;
