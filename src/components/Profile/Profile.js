
import React from "react";
import './Profile.css'
import Header from '../Header/Header';
import formValidationHook from '../../hook/formValidationHook';

function Profile(props) {

   // Чтобы выводить текущие данные инпутов буду использовать хук useRef
   const refName = React.useRef('')
   const refEmail = React.useRef('')

   const { errors, handleChange, isValid } = formValidationHook({
      name: refName.current.value,
      email: refEmail.current.value,
    })

   return (
      <>
         <Header loggedIn={props.loggedIn} />
         <section className="profile">
            <form className="profile__form" name="profile__form" noValidate>
               <h1 className="profile__form-title">Привет, Андрей!</h1>
               <ul className="profile__form-input-list">
                  <li className="profile__form-input-item">
                     <label className="profile__form-input-label">Имя</label>
                     <input className={errors.profileName ? 'profile__form-input profile__form-input_type_error' : 'profile__form-input'} 
                     type="text" name="profileName" placeholder="Ваше имя" minLength="2" maxLength="20" required ref={refName}
                     onChange={handleChange} values={refName.current.value}/>
                  </li>

                  <li className="profile__form-input-item">
                     <label className="profile__form-input-label">E-mail</label>
                     <input className={errors.profileEmail ? 'profile__form-input profile__form-input_type_error' : 'profile__form-input'} 
                     type="email" name="profileEmail" placeholder="Ваш e-mail" 
                     required ref={refEmail} onChange={handleChange} values={refEmail.current.value}/>
                  </li>
               </ul>
               <div className="profile__buttons">
                  <button className="profile__button" type="submit" aria-label='Кнопка отправить' disabled={!isValid}>Редактировать</button>
                  <button className="profile__button profile__button_type_logout" type="button" onClick={props.handleAccountExit}>Выйти из аккаунта</button>
               </div>
            </form>

         </section>
      </>
   );
}

export default Profile;