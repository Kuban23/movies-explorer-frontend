
import React from "react";
import './Profile.css'
import Header from '../Header/Header';
import formValidationHook from '../../hook/formValidationHook';
import { CurrentUserContext } from '../../contexts/CurrentUserContext'

function Profile(props) {

   // Чтобы выводить текущие данные инпутов буду использовать хук useRef
   const refName = React.useRef('')
   const refEmail = React.useRef('')

   const { errors, handleChange, isValid } = formValidationHook({
      name: refName.current.value,
      email: refEmail.current.value,
   })

   // Получаю текущего пользователя из контекста
   const currentUser = React.useContext(CurrentUserContext)

   // Состояние, которым буду отслеживать изменение данных пользователя
   const [isUpdate, setIsUpdate] = React.useState(false)
   const [isDisabledInput, setIsDisabledInput] = React.useState(false)

   // При каждом изменении состояния имени и почты отрисовываем заново
   React.useEffect(() => {
      if (refName.current.value === currentUser.name && refEmail.current.value === currentUser.email) {
         setIsUpdate(false)
      } else {
         setIsUpdate(true)
      }
   }, [refName.current.value, refEmail.current.value, currentUser.name, currentUser.email])

   const handleSubmit = (evt) => {
      setIsDisabledInput(true)
      evt.preventDefault()
      // Создал переменные с текущими данными
      const name = refName.current.value
      const email = refEmail.current.value
      // Заданю изменение данных пользователя
      props.handleUpdateUser({ name, email })
      evt.target.reset()
      setIsDisabledInput(false) // Разблокирую форму

   }

   return (
      <>
         <Header loggedIn={props.loggedIn} />
         <section className="profile">
            <form className="profile__form" name="profile__form" onSubmit={handleSubmit} noValidate>
               <h1 className="profile__form-title">{`Привет, ${currentUser?.name}`}!</h1>
               <ul className="profile__form-input-list">
                  <li className="profile__form-input-item">
                     <label className="profile__form-input-label">Имя</label>
                     <input className={errors.profileName ? 'profile__form-input profile__form-input_type_error' : 'profile__form-input'}
                        type="text" name="profileName" placeholder="Ваше имя" minLength="2" maxLength="20" required ref={refName}
                        onChange={handleChange} values={refName.current.value} defaultValue={currentUser.name} disabled={isDisabledInput} />
                  </li>

                  <li className="profile__form-input-item">
                     <label className="profile__form-input-label">E-mail</label>
                     <input className={errors.profileEmail ? 'profile__form-input profile__form-input_type_error' : 'profile__form-input'}
                        type="email" name="profileEmail" placeholder="Ваш e-mail"
                        required ref={refEmail} onChange={handleChange} values={refEmail.current.value} defaultValue={currentUser.email} disabled={isDisabledInput} />
                  </li>
               </ul>
               <div className="profile__buttons">
                  {props.updateProfileError && <span className="profile__error">{props.updateProfileError}</span>}
                  {props.isSuccessfulProfileSubmit && <span className="profile__successful">Ваши данные успешно изменены!</span>}
                  <button className="profile__button" type="submit" aria-label='Кнопка отправить' disabled={!isValid}>Редактировать</button>
                  <button className="profile__button profile__button_type_logout" type="button" onClick={props.handleAccountExit}>Выйти из аккаунта</button>
               </div>
            </form>

         </section>
      </>
   );
}

export default Profile; 