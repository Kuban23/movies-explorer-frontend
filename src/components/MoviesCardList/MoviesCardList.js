
import React from "react";
import './MoviesCardList.css'
import MovieCard from '../MoviesCard/MoviesCard'

function MoviesCardList({
   savedMovies, 
   isSaved, 
   cardCount, 
   dataLengthMovies, 
   movies, 
   isrenderCounter, 
   setRenderCounter, 
   isButtonVisible, 
   setIsButtonVisible, 
   handleMovieDelete, 
   handleSavedMovie}) {

   const movieDuration = (movie) => `${Math.floor(movie.duration / 60)}ч ${movie.duration % 60}м`
   
  // Загружаю сохраненные фильмы на странице
  const renderArrayItem = isSaved ? movies : movies.slice(0, isrenderCounter)

  // Делаю проверку о возможности добавления еще карточек с фильмами
  const addbuttonMovies = () => {
    // проверяем может ли мы ещё добавить полное количество карточек
    if (dataLengthMovies - isrenderCounter <= cardCount) {
      setRenderCounter(isrenderCounter + (dataLengthMovies - isrenderCounter))
      setIsButtonVisible(false)
    } else {
      setIsButtonVisible(true)
      setRenderCounter(isrenderCounter + cardCount)
    }
  }
  
   return (
      <section className="movies-card-list">
         {!isSaved ? (
         <ul className="movies-card-list__list">
            {renderArrayItem &&
            renderArrayItem.map((movie) => (
           <li key= {movie.id}>
               <MovieCard
               savedMovies={savedMovies}
               isSaved={isSaved}
               movie={movie}
               handleMovieDelete= {handleMovieDelete}
               handleSavedMovie={handleSavedMovie}
               movieDuration={movieDuration(movie)}
               />
            </li>
            ))}
         </ul>
         ) : (
            <ul className="movies-card-list__list">
               {renderArrayItem &&
               renderArrayItem.map((movie) => (
                  <li key= {movie.id}>
                     <MovieCard
                     isSaved={isSaved}
                     movie={movie}
                     handleMovieDelete= {handleMovieDelete}
                     movieDuration={movieDuration(movie)}
                     />
                     </li>
               ))}
               </ul>
               )}
               {!isSaved && isButtonVisible && (
                  <button className="movies-card-list__more-button" type="button" onClick={addbuttonMovies}>Еще</button>
               )}               
      </section>
   );
}

export default MoviesCardList;