
import React from "react";
import './Header.css'
import { Link, NavLink } from 'react-router-dom';
import icon from '../../images/profile_icon.svg';

function Header() {
   return (
      <header className="header">
         
         <Link className="header__logo" alt="Логотип проекта" to="/"/>

         <nav className="header__links">
         <Link className="header__link-films" to="/movies">Фильмы</Link>
         <Link className="header__link-films" to="/saved-movies">Сохранённые фильмы</Link>
         </nav>
      <>
      
         <Link className="header__profile-link" to="/profile">
         <img className='header__profile-link-icon'src={icon} alt='Иконка профиля'/>
         </Link>
         <button className="header__menu-button" type="button"></button>
         </>
         
         {/* <nav className="header__link-container">
            <Link className="header__link-auth header__link-auth_type_up">Регистрация</Link>
            <Link className="header__link-auth header__link-auth_type_in">Войти</Link>
         
         </nav> */}
         
        
      </header>
   );
}

export default Header;