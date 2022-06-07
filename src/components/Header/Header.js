
import React from "react";
import './Header.css'
import logo from '../../images/logo.svg';
import { Link } from 'react-router-dom';
import icon from '../../images/profile_icon.svg';

function Header() {
   return (
      <header className="header">
         
         <img className="header__logo" src={logo} alt="Логотип проекта" />

         <nav className="header__links">
         <Link className="header__link-films">Фильмы</Link>
         <Link className="header__link-films">Сохранённые фильмы</Link>
         </nav>
      <>
      
         <Link className="header__profile-link">
         <img className='header__profile-link-icon'src={icon} alt='Иконка профиля'/>
         </Link>
         <button className="header__menu-button" type="button"></button>
         </>
         
         {/* <nav className="header__link-container">
            <Link className="header__link-auth header__link-auth_type_up">Регистрация</Link>
            <Link className="header__link-auth header__link-auth_type_in">Войти</Link>
            
         </nav> */}
         {/* <button className="header__menu-button" type="button"></button> */}
        



      </header>
   );
}

export default Header;