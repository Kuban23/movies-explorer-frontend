
import React from "react";
import './Profile.css'
import Header from '../Header/Header';

function Profile(props) {
   return (
      <>
      <Header loggedIn={props.loggedIn}/>
      <section className="profile">
         <form className="profile__form" name="profile__form" noValidate>
            <h1 className="profile__form-title">Привет, Андрей!</h1>
            <ul className="profile__form-input-list">
               <li className="profile__form-input-item">
                  <label className="profile__form-input-label">Имя</label>
                  <input className="profile__form-input" type="text" name="profileName" placeholder="Ваше имя" minLength="2" maxLength="20" required />
               </li>

               <li className="profile__form-input-item">
                  <label className="profile__form-input-label">E-mail</label>
                  <input className="profile__form-input" type="email" name="profileEmail" placeholder="Ваш e-mail"required />
               </li>
            </ul>
            <div className="profile__buttons">
               <button className="profile__button" type="submit" aria-label='Кнопка отправить'>Редактировать</button>
               <button className="profile__button profile__button_type_logout" type="button">Выйти из аккаунта</button>
            </div>
         </form>

      </section>
      </>
   );
}

export default Profile;