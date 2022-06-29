import React from "react";
// import Header from "../Header/Header";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import './App.css'
import PageNotFound from '../PageNotFound/PageNotFound';
import { Switch, Route, useHistory } from 'react-router-dom'
import SavedMovies from '../SavedMovies/SavedMovies'
import Register from '../Register/Register'
import Login from '../Login/Login';
import Profile from '../Profile/Profile'
import {
    register,
    login,
    saveMovies,
    editProfile,
    getUserInformation,
    deleteSavedMovies,
    getMovies
} from '../../untils/api/MainApi';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'
import { CurrentUserContext } from '../../contexts/CurrentUserContext'
import UnProtectedRoute from '../UnProtectedRoute/UnProtectedRoute'
import {narrowScreen, largeScreenMoviesMore, narrowScreenMoviesMore} from '../../untils/constants'
import {getSavedMovies} from "../../untils/api/MoviesApi";

function App() {

   // Состояние авторизации пользователя(вошел в систему или нет)
   const [loggedIn, setloggedIn] = React.useState(false); //false не залогинился, true залогинился

   // Состояние ошибок при регистрации
   const [registrationError, setRegistrationError] = React.useState('')

   // Состояние ошибок при залогивании
   const [loginError, setLoginError] = React.useState('')

   // Состояние ошибок при изменении профиля
   const [updateProfileError, setUpdateProfileError] = React.useState('')

   // Состояние при успешном изменении профиля
   const [isSuccessfulProfileSubmit, setIsSuccessfulProfileSubmit] = React.useState(false)

   // Переменная состояния для текущего пользователя.
   const [currentUser, setCurrentUser] = React.useState({});

   // Переменная состояния сохраненных фильмов
   const [savedMovies, setSavedMovies] = React.useState('')

   // Состояние кол-ва карточек
   const [cardCount, setCardCount] = React.useState(window.innerWidth > narrowScreen ? largeScreenMoviesMore : narrowScreenMoviesMore)

   // Переменная для работы с useHistory
   const history = useHistory();

   const [screenWidth, setScreenWidth] = React.useState(window.innerWidth)

   const handleResizing = () => {
      setScreenWidth(window.innerWidth)  // Записываю сайт в стейт для лальнейшего использования
    }

    const [allMovies, setMovies] = React.useState(null)

    // Сортировка фильмов пользователя
   const sortingUserSavedMovies =(savedFilms, userId)=> savedFilms.filter((movie) => movie.owner ===userId);

   const handleGetMovies = () => {
       if (!allMovies) {
           getSavedMovies()
               .then(value => setMovies(value))
               .catch(reason => console.log(reason))
       }
   };

   //  Функция регистрации пользователя
   const handleRegister = ({ name, email, password }) => {
      // Очищаю ошибки при регистрации
      setRegistrationError('');
      // Отправляю запрос Api
      register(name, email, password)
         .then((res) => {
            // Прописываю пользователя в стэйт
            setCurrentUser(res.data)
            // Залогинил пользователя
            handleLogin({ email, password })
         })
         .catch((error) => {
            if (error.status === 409) {
               setRegistrationError('Пользователь с таким email зарегистрирован')
            }
            else {
               setRegistrationError('Что-то пошло не так');
            }
         })
   };

   // Функция для залогивания пользователя
   const handleLogin = ({ email, password }) => {
      // Очищаю ошибки при залогивании
      setLoginError('');
      // Отправляю запрос Api
      login(email, password)
         .then((data) => {
            // Устанавливаю в хранилище токен пользователя
            localStorage.setItem('token', data.token)
            // Получаю данные о пользователе
            getUserInformation()
               .then((userInfo) => {
                  // Делаю проверку о приходе данных
                  if (userInfo.data.name) {
                     // Прописываю пользователя в стэйт
                     setCurrentUser(userInfo.data)
                     // Прописываю состояние регистрации
                     setloggedIn(true)
                     // Реализация запроса сохраненных пользователем фильмов
                     const currentUserId= userInfo.data._id
                     // Отправляю запрос Api на получение фильмов
                     getMovies()
                     .then((res)=>{
                        const beatfilmsMoviesApi =res.data
                        // Сортирую свои / не свои фильмы
                        const sortingUserMovies = sortingUserSavedMovies(beatfilmsMoviesApi, currentUserId)
                        // Сохраняю фильмы в стэйт
                        setSavedMovies(sortingUserMovies)
                        // Сохраняю фильмы в localStorage
                        localStorage.setItem('films', JSON.stringify(sortingUserMovies))
                     })
                     .catch((error)=> console.log(error))
                      // перехожу на страницу 'Фильмы'  
                     history.push('/movies')                     
                  }
               }).catch((error) => {
                  if (error.status === 401) {
                     setLoginError('Неправильный адрес почты или пароль')
                  }
                  else {
                     setLoginError('Что-то пошло не так. Попробуйте войти позднее.')
                  }
               })
         })
         .catch((error) => {
            if (error.status === 401) {
               setLoginError('Неправильный адрес почты или пароль')
            }
            else {
               setLoginError('Что-то пошло не так. Попробуйте войти позднее.')
            }
         })
   };

   // Функция для изменения профайла 
   const handleUpdateUser = ({ name, email }) => {
      // Очищаю ошибки в профиле
      setUpdateProfileError('');
      // Очищаю данные об успешном изменении данных
      setIsSuccessfulProfileSubmit(false)
      // Отправляю запрос Api
      editProfile(name, email)
         .then((res) => {
            // Обновляю данные пользователя, прописываю данные в стэйт
            setCurrentUser(res.data)
            // Сообщаю пользователю, что данные пользователя изменены
            setIsSuccessfulProfileSubmit(true)
         })
         .catch((error) => {
            if (error.status === 409) {
               setUpdateProfileError(`e-mail ${email} Пользователь с таким email зарегистрирован`)
            }
            else {
               setUpdateProfileError('Что-то пошло не так. Попробуйте войти позднее.')
            }
         })
   }

   // Функция выхода из редактирования аккаунта
   const handleAccountExit = () => {
      // Очищаю localStorage
      localStorage.clear()
      // Изменяю стейт регистрации в false
      setloggedIn(false)
      // Удаляю-зачищаю пользователя из состояния-контекста
      setCurrentUser('')
      // Перехожу на главную страницу
      history.push('/')
   }

   // Функция сохранения фильмов
   const handleSavedMovie =({movie}) =>{
      // Отправляю запрос Api
      saveMovies(movie)
      .then(()=>{
         // Запрашиваю массив сохраненных фильмов
         getMovies()
         .then((res)=>{
            const beatfilmsMoviesApi =res.data
            // Сортирую свои фильмы
            const sortingUserMovies = sortingUserSavedMovies(beatfilmsMoviesApi, currentUser._id)
             // Сохраняю фильмы в стэйт
             setSavedMovies(sortingUserMovies)
             // Сохраняю фильмы в localStorage
             localStorage.setItem('films', JSON.stringify(sortingUserMovies))
         })
         .catch((error)=> console.log(error))
      })
   }

   // Функция удаления сохраненных фильмов
   const handleMovieDelete =({movieId})=>{
      // Отправляю запрос Api
      deleteSavedMovies(movieId)
      .then(()=>{
         // Запрашиваю массив сохраненных фильмов
         getMovies()
         .then((res)=>{
            const beatfilmsMoviesApi =res.data
            // Сортирую свои фильмы
            const sortingUserMovies = sortingUserSavedMovies(beatfilmsMoviesApi, currentUser._id)
            // Сохраняю фильмы в стэйт
            setSavedMovies(sortingUserMovies)
            // Сохраняю фильмы в localStorage
            localStorage.setItem('films', JSON.stringify(sortingUserMovies))
         })
         .catch((error)=> console.log(error))
      })
   }

   const tokenCheck = () => {
      const token = localStorage.getItem('token')
      if (token) {
        getUserInformation()
          .then((userInfo) => {
            // проверяю приходял данные или нет
            if (userInfo.data.name) {
              // Записываю данные в контекст
              setCurrentUser(userInfo.data)
              // Записываю в стейт авторизации
              setloggedIn(true)
              // Делаю запрос на сохранённые фильмы
              const savedFilms = JSON.parse(localStorage.getItem('films'))
              setSavedMovies(savedFilms)
            }
          })
          .catch((error) => {
            // Удаляю не валидный токен
            localStorage.clear()
            return console.log(error)
          })
      }
    }

    // Получаю данные пользователя при монтировании компонента
  React.useEffect(() => {
   tokenCheck()
   handleGetMovies()
 }, [])

 React.useEffect(() => {
   // Вешаем слушатель на ресайз
   window.addEventListener('resize', () =>
     setTimeout(() => {
      handleResizing()
     }, 1000),
   )
 }, [])

  // Юзаю этот юзЭффект если изменится стейт ширины экрана и выставим актуальное количество карточек
  React.useEffect(() => {
   setCardCount(window.innerWidth > narrowScreen ? largeScreenMoviesMore : narrowScreenMoviesMore)
 }, [screenWidth])

   return (
      <CurrentUserContext.Provider value={currentUser}>
         <div className="App">
            <div className="page">

               <Switch>

                  <Route exact path="/">
                     <Main loggedIn={loggedIn} />
                  </Route>

                  <ProtectedRoute
                     exact path="/movies"
                     component={Movies}
                     loggedIn={loggedIn}
                     savedMovies={savedMovies}
                     allMovies={allMovies}
                     handleSavedMovie={handleSavedMovie}
                     handleMovieDelete={handleMovieDelete}
                     cardCount={cardCount}
                  />

                  <ProtectedRoute
                     exact path="/saved-movies"
                     loggedIn={loggedIn}
                     component={SavedMovies}
                     savedMovies={savedMovies}
                     handleMovieDelete={handleMovieDelete}
                     cardCount={cardCount}
                  />                  

                  <UnProtectedRoute
                     exact path="/signup"
                     handleRegister={handleRegister}
                     loggedIn={loggedIn}
                     registrationError={registrationError}
                     component={Register}                    
                  />

                  <UnProtectedRoute
                  exact path="/signin"
                  handleLogin={handleLogin}
                  loggedIn={loggedIn}
                  loginError={loginError}
                  component={Login}                   
                  />                  

                  <ProtectedRoute
                     exact path="/profile"
                     loggedIn={loggedIn}
                     component={Profile}
                     handleAccountExit={handleAccountExit}
                     handleUpdateUser={handleUpdateUser}
                     updateProfileError={updateProfileError}
                     isSuccessfulProfileSubmit={isSuccessfulProfileSubmit}
                  />
                
                  <Route path="/*">
                     <PageNotFound />
                  </Route>

               </Switch>
            </div>
         </div>

      </CurrentUserContext.Provider>
   );
}

export default App;
