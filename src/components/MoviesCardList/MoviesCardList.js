
import React from "react";
import './MoviesCardList.css'
import MoviesCard from '../MoviesCard/MoviesCard'

function MoviesCardList(props) {

const movieDuration = (movie) => `${Math.foor(movie.duration / 60)}ч ${movie.duration % 60}`



   return (
      <section className="movies-card-list">
         <ul className="movies-card-list__list">
            <li>
               <MoviesCard/>
            </li>
            <li>
               <MoviesCard/>
            </li>
            <li>
               <MoviesCard/>
            </li>
            <li>
               <MoviesCard/>
            </li>
            <li>
               <MoviesCard/>
            </li>
            <li>
               <MoviesCard/>
            </li>
            <li>
               <MoviesCard/>
            </li>
         </ul>
         <button className="movies-card-list__more-button" type="button">Еще</button>

      </section>
   );
}

export default MoviesCardList;