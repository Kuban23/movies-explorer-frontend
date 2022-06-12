
import React from "react";
import './SearchForm.css'
import MoviesCardList from '../../components/MoviesCardList/MoviesCardList';

function SearchForm() {
   return (
      <section className="search-form">
         <form className="search-form__form" noValidate name="search">
            <div className="search-form__inputs">
               <input className="search-form__input" name="search" placeholder="Фильм" type="text" required maxLength="40"/>
               <button className="search-form__btn-submit" aria-label="Кнопка поиск" type="submit" />
            </div>
            <label className="search-form__checkbox-container">
               <input className="search-form__checkbox-btn-notvisible" type="checkbox" name="short-films" />
               <span className="search-form__checkbox-btn-visible"></span>
               <p className="search-form__checkbox-title">Короткометражки</p>
            </label>
         </form>

         {/* <MoviesCardList/> */}
      </section>

      
   );
}

export default SearchForm;