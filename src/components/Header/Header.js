
import React from "react";
import './Header.css'
import { Link, NavLink } from 'react-router-dom';
import icon from '../../images/profile_icon.svg';

function Header() {
   return (
      <header className="header">

         <Link className="header__logo" to="/" />

         {/* <div className="header__container_type_left">

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

         </div>    */}


         {/* <nav className="header__link-container">
            <Link className="header__link-auth header__link-auth_type_up" to="/signup">Регистрация</Link>
            <Link className="header__link-auth header__link-auth_type_in" to="/signin">Войти</Link>
         </nav> */}

         <nav className="header__link-sidebar header__link-sidebar_active">
            <button className="header__link-sidebar-close-btn" type="button"></button>

            <ul className="header__link-sidebar-container">

               <li className="header__link-sidebar-container-item">
                  <Link className="header__link-films header__link_type_sidebar" to="/">Главная</Link>
                  <NavLink className="header__link-films header__link_type_sidebar" activeClassName="header__link_type_sidebar_active" to="/movies">Фильмы</NavLink>
                  <NavLink className="header__link-films header__link_type_sidebar" activeClassName="header__link_type_sidebar_active" to="/saved-movies">Сохранённые фильмы</NavLink>
               </li>

               <li className="header__link-sidebar-container-item">
                  <Link className="header__profile-link header__profile-link_type_sidebar" to="/profile">
                     <img className="header__profile-link-icon header__profile-link-icon_type_sidebar" src={icon} alt="Иконка профиля" />
                  </Link>
               </li>

            </ul>
         </nav>

      </header>
   );
}

export default Header;