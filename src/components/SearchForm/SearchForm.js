
import React from "react";
import './SearchForm.css'

function SearchForm() {
   return (
      <section className="search-form">
         <form className="search-form__form" noValidate name="search">
            <div className="search-form__inputs">
               <input className="search-form__input" name="search" placeholder="Фильм" type="search" required />
               <button className="search-form__btn-submit" aria-label='Кнопка поиск' type='submit' />
            </div>
            <label className="search-form__checkbox-container">
               <input className="search-form__checkbox-btn-notvisible" type="checkbox" name="short-films" />
               <span className="search-form__checkbox-btn-visible"></span>
               <p className="search-form__checkbox-title">Короткометражки</p>
            </label>
         </form>

      </section>
   );
}

export default SearchForm;