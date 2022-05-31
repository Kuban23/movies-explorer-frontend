
import React from "react";
import './Header.css'
import logo from '../../images/logo.svg';

function Header() {
   return (
      <header className="header">
         <img className="header__logo" src={logo} />

         <nav className="header__link-container">
            <div className="header__link-auth header__link-auth_type_up">Регистрация</div>
            <button className="header__link-auth header__link-auth_type_in">Войти</button>
         </nav>



      </header>
   );
}

export default Header;