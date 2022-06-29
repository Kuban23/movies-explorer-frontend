import React from "react";
import './SearchForm.css'
import {getFromStorage, Keys, setLocalStorage} from "../../../untils/LocalStorageHelper";
import MoviesCardList from "../../MoviesCardList/MoviesCardList";
import Preloader from "../../Preloader/Preloader";
import {shortMovies} from "../../../untils/constants";
import useFormWithValidation from "../../../hook/formValidationHook";

function SearchForm({savedMovies, allMovies, isSaved, cardCount, handleMovieDelete, handleSavedMovie}) {

    const {values, isValid, handleChange} = useFormWithValidation({
        search: '',
    })

    // Состояние первой инициализации
    const [isInitiated, setIsInitiated] = React.useState(false)

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
    const [isShort, setIsShort] = React.useState(isSaved ? false : getFromStorage(Keys.shortsSwitcherKey) ?? false)

    const [moviesStorage, setMoviesStorage] = React.useState([])

    // Состояние нулевого поиска, т.е. ничего не найдено
    const [isNothingFound, setIsNothingFound] = React.useState(false)

    // стейт для кнопки из MoviesCardList
    const [isButtonVisible, setIsButtonVisible] = React.useState(false)

    // Функция сортировки фильмов по имени
    //   const filterItemMovies = (arr, query) =>
    // arr.filter((movie) => movie.nameRU.toLowerCase().indexOf(query.toLowerCase()) !== -1)
    const filterItemMovies = (arr, query) =>
        arr.filter((movie) => movie.nameRU.toLowerCase().indexOf(query.toLowerCase()) !== -1)

    // Функция обработчик поиска
    const handleSubmitForm = (evt) => {
        evt.preventDefault()
        if (isValid) {
            // Отключаю найденные карточки
            setIsFindCards(false)
            // Изменяю работу сабмита при работе saved-movies и movies
            // Выключаю Input
            setIsInputDisabled(true)
            // Включаю Preloader
            setIsPreloaderVisual(true)
            // Реализую поиск фильмов по сохраненным фильмам Saved-movies
            const filterSavedMovies = filterItemMovies(savedMovies, values.search)
            const filterShortSavedFilms = filterSavedMovies.filter((movie) => movie.duration <= shortMovies)
            // Сохраняю найденные фильмы в localStorage
            setLocalStorage(Keys.moviesSavedLongFilmsKey, filterSavedMovies)
            setLocalStorage(Keys.moviesSavedShortFilmsKey, filterShortSavedFilms)
            // Сохраняю найденные фильмы в стэйт отсортированных
            setfilterArrayFilm(filterSavedMovies)
            // Сохраняю найденные фильмы в стэйт короткометражек
            setshortArrayFilms(filterShortSavedFilms)
            if (isShort) {
                if (filterShortSavedFilms.length > 0) {
                    setMoviesStorage(filterShortSavedFilms)
                    setIsFindCards(true)
                } else {
                    // Если короткоментражных фильмов не нашли, то показываю "ничего не найдено"
                    setIsNothingFound(true)
                    setIsFindCards(false)
                }
            } else { // Записал фильмы в стэйт
                setMoviesStorage(filterSavedMovies)
                if (filterSavedMovies.length === 0) {
                    setIsNothingFound(true)
                    setIsFindCards(false)
                } else {
                    setIsNothingFound(false)
                    setIsFindCards(true)
                }
            }
            // Выключаю Preloader и включаю Input
            setIsPreloaderVisual(false)
            setIsInputDisabled(false)
        } else {
            setIsError(true)
        }
    };

    // Если меняется стэйт, то меняю массив с фильмами который рендерится
    React.useEffect(() => { // Меняем массив в том случае, если в нем присутствуют фильмы
        if (filterArrayFilm.length > 0 || isSaved) {
            if (isInitiated) {
                if (savedMovies?.length > 0) {
                    if (isShort) {
                        if (shortArrayFilms?.length > 0) {
                            setMoviesStorage(shortArrayFilms)
                            setIsNothingFound(false)
                            setIsFindCards(true)
                        } else {
                            setIsNothingFound(true)
                            setIsFindCards(false)
                        }
                    } else if (!isShort) {
                        if (filterArrayFilm?.length > 0) {
                            setMoviesStorage(filterArrayFilm)
                            setIsNothingFound(false)
                            setIsFindCards(true)
                        } else {
                            setIsNothingFound(true)
                            setIsFindCards(false)
                        }
                    }
                } else {
                    setIsNothingFound(true)
                    setIsFindCards(false)
                }
            }
        }
    }, [isShort]);

    // В случае изменения сохраненного массива, то перезаписываем saved-movies ///

    React.useEffect(() => {
        if (!isInitiated) setIsInitiated(true)

        if (savedMovies?.length > 0) {
            setMoviesStorage(savedMovies)
            setIsNothingFound(false)
            setIsFindCards(true)

            let filterSavedMovies = filterItemMovies(savedMovies, values.search)
            let filteredShortSavedMovies = filterSavedMovies.filter((movie) => movie.duration <= shortMovies)
            setfilterArrayFilm(filterSavedMovies)
            setshortArrayFilms(filteredShortSavedMovies)
        } else {
            setIsNothingFound(true)
            setIsFindCards(false)
        }
    }, [savedMovies])

    // Обработчик для чекбокса
    const onShortFilmsCheckbox = () => {
        setIsShort(!isShort)
    }

    return (
        <>
            <section className="search-form">
                <form className="search-form__form" name="search" noValidate onSubmit={handleSubmitForm}>
                    <div className="search-form__inputs">
                        <input className="search-form__input" name="search" placeholder="Фильм" type="search" required
                               maxLength="40"
                               onChange={handleChange} disabled={isInputDisabled} value={values.search}/>
                        <button className="search-form__btn-submit" aria-label="Кнопка поиск" type="submit"/>
                    </div>
                    <span
                        className={!isError ? 'search-form__input-text-error' : 'search-form__input-text-error search-form__input-text-error_active'}>
                  Нужно ввести ключевое слово.
               </span>
                    <label className="search-form__checkbox-container" htmlFor="short-films">
                        <input className="search-form__checkbox-btn-notvisible" type="checkbox" name="short-films"
                               onChange={onShortFilmsCheckbox} id="short-films" defaultChecked={isShort}/>
                        <span className="search-form__checkbox-btn-visible"></span>
                        <p className="search-form__checkbox-title">Короткометражки</p>
                    </label>
                </form>
            </section>
            {isFindCards && moviesStorage?.length > 0 && (
                <MoviesCardList
                    isSaved={isSaved}
                    movies={moviesStorage}
                    dataLengthMovies={0}
                    isrenderCounter={isrenderCounter}
                    setRenderCounter={setRenderCounter}
                    cardCount={cardCount}
                    isButtonVisible={isButtonVisible}
                    setIsButtonVisible={setIsButtonVisible}
                    handleMovieDelete={handleMovieDelete}
                    handleSavedMovie={handleSavedMovie}
                    savedMovies={savedMovies}
                />
            )}
            {isPreloaderVisual && <Preloader/>}
            {isNothingFound && <p className="search-form__text-error">Ничего не найдено</p>}
            {isErrorNetwork && (
                <p className="search-form__text-error">Во время запроса произошла ошибка. Попробуйте сделать запрос еще
                    раз.</p>)}
        </>
    );
}

export default SearchForm;