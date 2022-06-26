
import React from "react";
import './SearchForm.css'
import MoviesCardList from '../MoviesCardList/MoviesCardList'
import formValidationHook from '../../hook/formValidationHook'
import Preloader from '../Preloader/Preloader'
import { getMovies } from '../../untils/api/MoviesApi'

function SearchForm({ savedMovies, isSaved, cardCount, handleMovieDelete, handleSavedMovie }) {

   const { values, isValid, handleChange } = formValidationHook({
      search: '',
   })

   // Состояние предыдущего поиска
   const [isPrevSearch, setIsPrevSearch] = React.useState(true)

   // Состояние найденных карточек 
   const [isFindCards, setIsFindCards] = React.useState(false)

   // Состояние ошибок
   const [isError, setIsError] = React.useState(false)

   // Состояние ошибок сети 
   const [isErrorNetwork, setIsErrorNetwork] = React.useState(false)

   // Состояние интупта
   const [isInputDisabled, setIsInputDisabled] = React.useState(false)

   // Состояние Preloader
   const [isPreloaderVisual, setIsPreloaderVisual] = React.useState(false)

   // Состояние кол-ва числа карт
   const [isrenderCounter, setRenderCounter] = React.useState(cardCount)

   // Состояние найденных фильмов
   const [filterArrayFilm, setfilterArrayFilm] = React.useState([])

   // Состояние найденных короткометражных фильмов
   const [shortArrayFilms, setshortArrayFilms] = React.useState([])

   // Состояние короткометражных фильмов
   const [isShort, setIsShort] = React.useState(false)

   const [moviesStorage, setMoviesStorage] = React.useState([])

   // Состояние нулевого поиска, т.е. ничего не найдено
   const [isNothingFound, setIsNothingFound] = React.useState(false)

   // стейт для кнопки из MoviesCardList
   const [isButtonVisible, setIsButtonVisible] = React.useState(false)

   // Состояние длины массива с фильмами
   const [dataLengthMovies, setDataLengthMovies] = React.useState(0)

   // Функция сортировки фильмов по имени
   //   const filterItemMovies = (arr, query) =>
   // arr.filter((movie) => movie.nameRU.toLowerCase().indexOf(query.toLowerCase()) !== -1)
   const filterItemMovies = (arr, query) =>
      arr.filter((movie) => movie.nameRU.toLowerCase().indexOf(query.toLowerCase()) !== -1)

   // Функция обработчик поиска
   const handleSubmitForm = (evt) => {
      evt.preventDefault()
      if (isValid) {
         // Отключаю поиск
         setIsPrevSearch(false)
         // Отключаю найденные карточки
         setIsFindCards(false)
         // Изменяю работу сабмита при работе saved-movies и movies
         if (!isSaved) {
            setIsError(false)
            setIsErrorNetwork(false)
            // Выключаю Input
            setIsInputDisabled(true)
            // Включаю Preloader
            setIsPreloaderVisual(true)

            // Отправляю запрос Api
            getMovies()
               .then((movies) => {
                  // Устанавливаю число карт
                  setRenderCounter(cardCount)
                  // Выключаю Preloader
                  setIsPreloaderVisual(false)
                  // Включаю Input
                  setIsInputDisabled(false)
                  // Сортирую фильмы 
                  const filterFilms = filterItemMovies(movies, values.search)
                  const shortFilms = filterFilms.filter((movie) => movie.duration <= 40)
                  // Сохраняю найденные фильмы в localStorage
                  localStorage.setItem('moviesLongFilms', JSON.stringify(filterFilms))
                  localStorage.setItem('moviesShortFilms', JSON.stringify(shortFilms))
                  // Прописывыаю короткометражки в стэйт
                  setshortArrayFilms(shortFilms)
                  //Прописываю найденные фильмы в стэйт 
                  setfilterArrayFilm(filterFilms)

                  // Если короткометражка, то показываю ее
                  if (isShort) {
                     if (shortFilms.length > 0) {
                        setMoviesStorage(shortFilms)
                        setIsNothingFound(false)
                        // Включаю найденные карточки
                        setIsFindCards(true)
                        // Условие по показу и скрытию кнопки "Еще"
                        if (shortFilms.length > cardCount) {
                           setIsButtonVisible(true)
                        }
                     } else {
                        // Если короткоментражных фильмов не нашли, то показываю "ничего не найдено"
                        setIsNothingFound(true)
                        setIsFindCards(false)
                     }
                  } else {
                     setDataLengthMovies(filterFilms.length)
                     setIsButtonVisible(filterFilms.length > cardCount)
                     // Сохраняю фильмы в стэйт
                     setMoviesStorage(filterFilms)
                     if (filterFilms.length === 0) {
                        setIsNothingFound(true)
                        setIsFindCards(false)
                     }
                     else {
                        setIsNothingFound(false)
                        setIsFindCards(true)
                     }
                  }
               })
               .catch(() => {
                  setIsPreloaderVisual(false)
                  setIsErrorNetwork(true)
                  // Включаю Input
                  setIsInputDisabled(false)
               })
         }
         else {
            // Выключаю Input
            setIsInputDisabled(true)
            // Включаю Preloader
            setIsPreloaderVisual(true)
            // Реализую поиск фильмов по сохраненным фильмам Saved-movies
            const filterSavedMovies = filterItemMovies(savedMovies, values.search)
            const filterShortSavedFilms = filterSavedMovies.filter((movie) => movie.duration <= 40)
            // Сохраняю найденные фильмы в localStorage
            localStorage.setItem('moviesSavedLongFilms', JSON.stringify(filterSavedMovies))
            localStorage.setItem('moviesSavedShortFilms', JSON.stringify(filterShortSavedFilms))
            // Сохраняю найденные фильмы в стэйт отсортированных
            setfilterArrayFilm(filterSavedMovies)
            // Сохраняю найденные фильмы в стэйт короткометражек
            setshortArrayFilms(filterShortSavedFilms)
            if (isShort) {
               if (filterShortSavedFilms.length > 0) {
                  setMoviesStorage(filterShortSavedFilms)
                  setIsFindCards(true)
               }
               else {
                  // Если короткоментражных фильмов не нашли, то показываю "ничего не найдено"
                  setIsNothingFound(true)
                  setIsFindCards(false)
               }
            }
            else { // Записал фильмы в стэйт
               setMoviesStorage(filterSavedMovies)
               if (filterSavedMovies.length === 0) {
                  setIsNothingFound(true)
                  setIsFindCards(false)
               }
               else {
                  setIsNothingFound(false)
                  setIsFindCards(true)
               }
            }
            // Выключаю Preloader и включаю Input
            setIsPreloaderVisual(false)
            setIsInputDisabled(false)
         }
      }
      else {
         setIsError(true)
      }
   };

   // Если меняется стэйт, то меняю массив с фильмами который рендерится
   React.useEffect(() => { // Меняем массив в том случае, если в нем присутствуют фильмы
      if (filterArrayFilm.length > 0) {
         if (!isSaved) {
            // Изменяю стэйты в случае возвращения из короткометражек
            if (!isShort && filterArrayFilm.length > 0) {
               setIsNothingFound(false)
               setIsFindCards(true)
            }
            // Если короткоментражных фильмов не нашли, то показываю "ничего не найдено"
            if (isShort && shortArrayFilms.length === 0) {
               setIsNothingFound(true)
               setIsFindCards(false)
            }
            if (isShort) {
               setMoviesStorage(shortArrayFilms)
               // Выключаю кнопку (Еще) в короткометражках
               if (shortArrayFilms.length <= cardCount) {
                  setIsButtonVisible(false)
               }
            }
            else {
               setMoviesStorage(filterArrayFilm)
               // Включаю кнопку (Еще)
               if (filterArrayFilm.length > isrenderCounter) {
                  setIsButtonVisible(true)
               }
            }
         }
         else {
            // При возвращении из короткометражек. изменяю стэйты 
            if (!isShort && filterArrayFilm.length > 0) {
               setIsNothingFound(false)
               setIsFindCards(true)
            }
            // Делаю проверку есть фильмы, не нашли, то показываю "ничего не найдено"
            if (isShort && shortArrayFilms.length === 0) {
               setIsNothingFound(true)
               setIsFindCards(false)
            }
            if (isShort) {
               setMoviesStorage(shortArrayFilms)
            }
            else if (filterArrayFilm.length > 0) {
               setMoviesStorage(filterArrayFilm)
            }
            else {
               setMoviesStorage(savedMovies)
            }
         }
      }
   }, [isShort]);

   // В случае изменения сохраненного массива, то перезаписываем saved-movies ///

   React.useEffect(() => {
      if (isSaved) { // && !isPrevSearch
         setMoviesStorage(savedMovies)
      }
   }, [savedMovies])

   // При каждом изменении компоненты провожу след операции
   React.useEffect(() => {
      const searchMovies = JSON.parse(localStorage.getItem('moviesLongFilms'))
      const searchShortMovies = JSON.parse(localStorage.getItem('moviesShortFilms'))
      const savedSearchMovies = JSON.parse(localStorage.getItem('moviesSavedLongFilms'))
      const savedSearchShortMovies = JSON.parse(localStorage.getItem('moviesSavedShortFilms'))
      // Выставляем разный массив на рендер, в зависимости от страницы ///
      if (isSaved) {
         if (savedSearchMovies?.length > 0) {
            setfilterArrayFilm(savedSearchMovies)
            setshortArrayFilms(savedSearchShortMovies)
         }
         // включаем секцию с карточками
         setMoviesStorage(savedMovies)
         setIsFindCards(true)
      } else if (searchMovies?.length > 0) {
         // Если пришли от movies, то надо отобразить фильмы + показывать/не показывать кнопку "Ещё"
         setMoviesStorage(searchMovies)
         setfilterArrayFilm(searchMovies)
         setshortArrayFilms(searchShortMovies)
         // включаем секцию с карточками
         setIsFindCards(true)
         setRenderCounter(cardCount)
         setDataLengthMovies(searchMovies.length)
         // выставляем кнопку
         if (searchMovies.length > cardCount) {
            setIsButtonVisible(true)
         }
      }
   }, [])
  
   // Обработчик для чекбокса
   const onShortFilmsCheckbox = () => {
      setIsShort(!isShort)
   }

   return (
      <>
         <section className="search-form">
            <form className="search-form__form" name="search" noValidate onSubmit={handleSubmitForm}>
               <div className="search-form__inputs">
                  <input className="search-form__input" name="search" placeholder="Фильм" type="search" required maxLength="40"
                     onChange={handleChange} disabled={isInputDisabled} value={values.search} />
                  <button className="search-form__btn-submit" aria-label="Кнопка поиск" type="submit" />
               </div>
               <span
                  className={!isError ? 'search-form__input-text-error' : 'search-form__input-text-error search-form__input-text-error_active'}>
                  Нужно ввести ключевое слово.
               </span>
               <label className="search-form__checkbox-container" htmlFor="short-films">
                  <input className="search-form__checkbox-btn-notvisible" type="checkbox" name="short-films"
                     onChange={onShortFilmsCheckbox} id="short-films" />
                  <span className="search-form__checkbox-btn-visible"></span>
                  <p className="search-form__checkbox-title">Короткометражки</p>
               </label>
            </form>
         </section>
         {isFindCards && moviesStorage.length > 0 && (
            <MoviesCardList
               isSaved={isSaved}
               movies={moviesStorage}
               dataLengthMovies={dataLengthMovies}
               isrenderCounter={isrenderCounter}
               setRenderCounter={setRenderCounter}
               ardCount={cardCount}
               isButtonVisible={isButtonVisible}
               setIsButtonVisible={setIsButtonVisible}
               handleMovieDelete={handleMovieDelete}
               handleSavedMovie={handleSavedMovie}
               savedMovies={savedMovies}
            />
            // <MoviesCardList
            // savedMovies={savedMovies}
            // isSaved={isSaved}
            // cardCount={cardCount}
            // dataLengthMovies={dataLengthMovies}
            // movies={moviesStorage}
            // isrenderCounter={isrenderCounter}
            // setRenderCounter={setRenderCounter}
            // isButtonVisible={isButtonVisible}
            // setIsButtonVisible={setIsButtonVisible}
            // handleMovieDelete={handleMovieDelete}
            // handleSavedMovie={handleSavedMovie}         
            // />
         )}
         {isPreloaderVisual && <Preloader />}
         {isNothingFound && <p className="search-form__text-error">Ничего не найдено</p>}
         {isErrorNetwork && (<p className="search-form__text-error">Во время запроса произошла ошибка. Попробуйте сделать запрос еще раз.</p>)}
      </>
   );
}

export default SearchForm;