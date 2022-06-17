import React from "react";
// import Header from "../Header/Header";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import './App.css'
// import Profile from '../Profile/Profile'
// import Register from '../Register/Register';
// import Login from '../Login/Login';
import PageNotFound from '../PageNotFound/PageNotFound';
import { Switch, Route, useHistory } from 'react-router-dom'
import SavedMovies from '../SavedMovies/SavedMovies'
import Register from '../Register/Register'
import Login from '../Login/Login';
import Profile from '../Profile/Profile'
import {register, login, saveMovies, getMovies, editProfile, getUserInformation, deleteSavedMovies} from '../../untils/api/MainApi';


function App() {

   // Состояние авторизации пользователя(вошел в систему или нет)
   const [loggedIn, setloggedIn] = React.useState(false); //false не залогинился, true залогинился

   // Состояние ошибок при регистрации
   const [registrationError, setRegistrationError] = React.useState('')

   // Переменная для работы с useHistory
   const history = useHistory();

   //  Функция регистрации пользователя
   const handleRegister = ({name, email, password}) => {
      // Очищаю ошибки при регистрации
      setRegistrationError('');
      // Отправляю запрос Api
      register(name, email, password)
      .then((res) => {
      // Залогинил пользователя
      handleLogin({email, password})
      })
      .catch((error) => {
      if(error.status === 409) {
         setRegistrationError('Пользователь с таким email зарегистрирован')
      }
      else {
         setRegistrationError('Что-то пошло не так');
      }
      })
   };

   // Функция для залогивания пользователя
   const handleLogin = ({email, password}) => {
      login(email, password)
      .then((data) => {
         // Устанавливаю в хранилище токен пользователя
         localStorage.setItem('token', data.token)
         // Получаю данные о пользователе
         getUserInformation()
         .then((userInfo) => {
            // Делаю проверку о приходе данных
            if (userInfo.data.name) {
               history.push('/movies')
            }
         })
      })
   };

   return (
      <div className="App">
         <div className="page">
            <Switch>

               <Route exact path="/">
                  <Main loggedIn={loggedIn} />
               </Route>

               <Route exact path="/movies">
                  <Movies loggedIn={loggedIn} />
               </Route>

               <Route exact path="/saved-movies">
                  <SavedMovies loggedIn={loggedIn} />
               </Route>

               <Route exact path="/signup">
                  <Register 
                  handleRegister={handleRegister}
                  loggedIn={loggedIn}
                  registrationError ={registrationError}
                  />
               </Route>

               <Route exact path="/signin">
                  <Login />
               </Route>

               <Route exact path="/profile">
                  <Profile loggedIn={loggedIn} />
               </Route>

               <Route path="/*">
              <PageNotFound />
            </Route>

            </Switch>
         </div>
      </div>
   );
}

export default App;
