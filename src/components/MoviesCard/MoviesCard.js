
import React from "react";
import './MoviesCard.css'
// import word_33 from '../../images/33_word.jpg';
// import { Switch, Route } from "react-router-dom";

function MoviesCard({savedMovies, isSaved, movie, movieDuration, handleMovieDelete, handleSavedMovie, }) {

   // Состояние понравившихся фильмов
  const [isLiked, setIsLiked] = React.useState(false)

  // Состояние удаленных фильмов
  const [delMovieId, setIsDelMovieId] = React.useState('0')

   const likedMovie = {
      country: movie.country || 'Нет данных',
      director: movie.director || 'Нет данных',
      duration: movie.duration || 0,
      year: movie.year || 'Нет данных',
      description: movie.description || ' ',
      image: isSaved ? movie.image : `https://api.nomoreparties.co${movie.image.url}`,
      trailerLink: isSaved ? movie.trailerLink : movie.trailerLink || 'https://youtube.com',
      thumbnail: isSaved ? movie.thumbnail : `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`,
      nameRU: movie.nameRU || 'Нет данных',
      nameEN: movie.nameEN || 'Нет данных',
      movieId: isSaved ? movie._id : movie.id,
    }

    // При монтировании делаю проверку ставить ли лайк карточке
  React.useEffect(() => {
   if (savedMovies) {
     // Выполняем это, если в данный момент не роут /saved-movies
     if (!isSaved) {
       const checkSave = savedMovies?.find((item) => +item.movieId === +movie.id)
       if (checkSave) {
         setIsLiked(true)
       } else {
         setIsLiked(false)
       }
     }
   }
 }, [])

 React.useEffect(() => {
      if (savedMovies) {
     if (!isSaved) {
       // Выставляем лайк
       const checkSave = savedMovies.find((item) => +item.movieId === +movie.id)
       if (checkSave) {
         setIsLiked(true)
         // Записываем из _id в _id
         likedMovie.movieId = checkSave._id
         setIsDelMovieId(checkSave._id)
       } else {
         setIsLiked(false)
       }
     }
   }
 }, [savedMovies])

 // Заполняю поля с информацией для фильмов которые приходят без них
 const handleTrailerOpen = () => {
   window.open(`${likedMovie.trailer}`, `Трейлер фильма "${likedMovie.nameRU}"`)
 }
 const handleLikeClick = async () => {
   // Если роут /saved-movies, то удаляю фильм
   if (isSaved) {
      handleMovieDelete({ movieId: likedMovie.movieId })
   } else if (isLiked) {
     // Если установлен лайк фильму, то удаляем его
     handleMovieDelete({ movieId: delMovieId })
   } else {
     // Если фильм не лайкнут, то лайкаем
     handleSavedMovie({ movie: likedMovie })
   }
 }
   return (
            <div className="movies-card">
               <div className="movies-card__container">
                  <h3 className="movies-card__title">{likedMovie.nameRU}</h3>
                  <p className="movies-card__lenght">{movieDuration}</p>
                  {isSaved && (
                     <button className="movies-card__button movies-card__button_type_close-btn" type='button' 
                     aria-label='Кнопка удаления фильма'
                     onClick={handleLikeClick}></button>
                  )}
                  {!isSaved && (
                   <button className={isLiked ? 'movies-card__button movies-button_type_active-like-btn' : 'movies-card__button movies-button_type_unactive-like-btn'}
                    type='button' aria-label='Кнопка для постановки и удаления лайков' onClick={handleLikeClick}></button>
                  )}                  
               </div>
               <img className="movies-card__picture-film" alt="Картинка фильма" src={likedMovie.image} onClick={handleTrailerOpen}/>
            </div> 
            

      // <Switch>
      //    <Route path="/movies">
      //       <div className="movies-card">
      //          <div className="movies-card__container">
      //             <h3 className="movies-card__title">33 слова о дизайне</h3>
      //             <p className="movies-card__lenght">1ч 42м</p>
      //             <button className="movies-card__button movies-button_type_active-like-btn" type='button' aria-label='Кнопка для постановки и удаления лайков'></button>
      //          </div>
      //          <img className="movies-card__picture-film" alt="Картинка фильма" src={word_33} />
      //       </div>
      //    </Route>

      //    <Route path="/saved-movies">
      //       <div className="movies-card">
      //          <div className="movies-card__container">
      //             <h3 className="movies-card__title">33 слова о дизайне</h3>
      //             <p className="movies-card__lenght">1ч 42м</p>
      //             <button className="movies-card__button movies-card__button_type_close-btn" type='button' aria-label='Кнопка удаления фильма'></button>
      //          </div>
      //          <img className="movies-card__picture-film" alt="Картинка фильма" src={word_33} />
      //       </div>
      //    </Route>

      // </Switch>

   );
}

export default MoviesCard;