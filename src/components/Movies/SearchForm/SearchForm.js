import React from "react";
import './SearchForm.css'
import {getFromStorage, Keys, setLocalStorage} from "../../../untils/LocalStorageHelper";
import {shortMovies} from "../../../untils/constants";
import MoviesCardList from "../../MoviesCardList/MoviesCardList";
import Preloader from "../../Preloader/Preloader";
import useFormWithValidation from "../../../hook/formValidationHook";

function SearchForm({savedMovies, allMovies, isSaved, cardCount, handleMovieDelete, handleSavedMovie}) {

    const {values, isValid, handleChange} = useFormWithValidation({
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
    const [isShort, setIsShort] = React.useState(isSaved ? false : getFromStorage(Keys.shortsSwitcherKey) ?? false)

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

            setIsError(false)
            setIsErrorNetwork(false)
            // Выключаю Input
            setIsInputDisabled(true)
            // Включаю Preloader
            setIsPreloaderVisual(true)

            // Отправляю запрос Api
            let movies = allMovies

            if (!movies) {
                setIsPreloaderVisual(false)
                setIsErrorNetwork(true)
                // Включаю Input
                setIsInputDisabled(false)
                return
            }

            // Устанавливаю число карт
            setRenderCounter(cardCount)
            // Выключаю Preloader
            setIsPreloaderVisual(false)
            // Включаю Input
            setIsInputDisabled(false)
            // Сортирую фильмы
            const filterFilms = filterItemMovies(movies, values.search)
            const shortFilms = filterFilms.filter((movie) => movie.duration <= shortMovies)
            // Сохраняю найденные фильмы в localStorage
            setLocalStorage(Keys.moviesLongFilmsKey, filterFilms)
            setLocalStorage(Keys.moviesShortFilmsKey, shortFilms)

            // Сохраняем стейт поиска
            setLocalStorage(Keys.searchQueryKey, values.search)
            setLocalStorage(Keys.shortsSwitcherKey, isShort)
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
                } else {
                    setIsNothingFound(false)
                    setIsFindCards(true)
                }
            }
        } else {
            setIsError(true)
        }
    };

    // Если меняется стэйт, то меняю массив с фильмами который рендерится
    React.useEffect(() => { // Меняем массив в том случае, если в нем присутствуют фильмы
        if (filterArrayFilm.length > 0) {
            setLocalStorage(Keys.shortsSwitcherKey, isShort)

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
            } else {
                setMoviesStorage(filterArrayFilm)
                // Включаю кнопку (Еще)
                if (filterArrayFilm.length > isrenderCounter) {
                    setIsButtonVisible(true)
                }
            }
        }
    }, [isShort]);

    // При каждом изменении компоненты провожу след операции
    React.useEffect(() => {
        // Выставляем разный массив на рендер, в зависимости от страницы ///
        const searchMovies = getFromStorage(Keys.moviesLongFilmsKey)
        const searchShortMovies = getFromStorage(Keys.moviesShortFilmsKey)
        const shortMoviesToggle = getFromStorage(Keys.shortsSwitcherKey)
        const search = getFromStorage(Keys.searchQueryKey)

        if (shortMoviesToggle) {
            setIsShort(shortMoviesToggle === true)
        }

        if (search) {
            values.search = search
        }

        setfilterArrayFilm(searchMovies ?? [])
        setshortArrayFilms(searchShortMovies ?? [])

        if (!isShort && searchMovies?.length > 0) {
            // Если пришли от movies, то надо отобразить фильмы + показывать/не показывать кнопку "Ещё"

            setMoviesStorage(searchMovies)

            // включаем секцию с карточками
            setIsFindCards(true)
            setRenderCounter(cardCount)
            setDataLengthMovies(searchMovies.length)
            // выставляем кнопку

            if (searchMovies.length > cardCount) {
                setIsButtonVisible(true)
            }

        } else if (isShort && searchShortMovies?.length > 0) {
            setMoviesStorage(searchShortMovies)

            // включаем секцию с карточками
            setIsFindCards(true)
            setRenderCounter(cardCount)
            setDataLengthMovies(searchShortMovies.length)
            // выставляем кнопку

            if (searchShortMovies.length > cardCount) {
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
                    dataLengthMovies={dataLengthMovies}
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