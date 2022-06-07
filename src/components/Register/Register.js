
import React from "react";
import './Register.css'
import logo from '../../images/logo.svg'
import { Link } from 'react-router-dom'

function Register(){
	return ( 
<section className="register">
	<div className="register__container">
		<img className="register__logo" src={logo} alt="Логотип проекта" />
		<h1 className="register__title">Добро пожаловать!</h1>
		<form className="register__form" name="register" noValidate>
			<ul className="register__form-input-list">
				<li className="register__form-input-list-item">
				<label className="register__form-input-label">Имя</label>
				<input className="register__form-input" type="text" name="name" placeholder="Ваше имя" minLength="2" maxLength="20" required />
				</li>

				<li className="register__form-input-list-item">
				<label className="register__form-input-label">E-mail</label>
				<input className="register__form-input" type="email" name="email" placeholder="Ваш e-mail" required />
				</li>

				<li className="register__form-input-list-item">
				<label className="register__form-input-label">Пароль</label>
				<input className="register__form-input" type="password" name="password" placeholder="Ваш пароль" minLength="7" maxLength="20" required />
				<span className="register__form-input-error">Что-то пошло не так...</span>
				</li>
			</ul>
			<button className="register__button" type="submit" aria-label='Кнопка отправить'>Зарегистрироваться</button>
			<div className="register__form-button-container">
				<p className="register__question">Уже зарегистрированы?</p>
				<Link className="register__form-link">Войти</Link>  
			</div>

		</form>
	</div>

</section>
);
}

export default Register;