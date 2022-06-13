
import React from "react";
import './MoviesCard.css'
import word_33 from '../../images/33_word.jpg';
import { Switch, Route } from "react-router-dom";

function MoviesCard() {
   return (
      <Switch>
         <Route path="/movies">
            <div className="movies-card">
               <div className="movies-card__container">
                  <h3 className="movies-card__title">33 слова о дизайне</h3>
                  <p className="movies-card__lenght">1ч 42м</p>
                  <button className="movies-card__button movies-button_type_active-like-btn" type='button' aria-label='Кнопка для постановки и удаления лайков'></button>
               </div>
               <img className="movies-card__picture-film" alt="Картинка фильма" src={word_33} />
            </div>
         </Route>

         <Route path="/saved-movies">
            <div className="movies-card">
               <div className="movies-card__container">
                  <h3 className="movies-card__title">33 слова о дизайне</h3>
                  <p className="movies-card__lenght">1ч 42м</p>
                  <button className="movies-card__button movies-card__button_type_close-btn" type='button' aria-label='Кнопка удаления фильма'></button>
               </div>
               <img className="movies-card__picture-film" alt="Картинка фильма" src={word_33} />
            </div>
         </Route>

      </Switch>

   );
}

export default MoviesCard;