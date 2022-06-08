
import React from "react";
import './Login.css'
//import logo from '../../images/logo.svg'
import { Link } from 'react-router-dom'

function Login(){
	return ( 
<section className="login">
<div className="login-container">

<Link className="login__logo" to="/" />

<h1 className="login__title">Рады видеть!</h1>
<form className="login__form" noValidate>
<ul className="login__form-input-list">
	<li className="login__form-input-list-item">
	<label className="login__form-input-label">E-mail</label>
	<input className="login__form-input" name="email" type="email" placeholder="Ваш e-mail" required />
	</li>

	<li className="login__form-input-list-item">
	<label className="login__form-input-label">Пароль</label>
	<input className="login__form-input" name="password" type="password" placeholder="Ваш пароль" minLength="7" maxLength="20" required />
	</li>	
</ul>
<button className="login__button" type="submit" aria-label='Кнопка отправить'>Войти</button>
			<div className="login__form-button-container">
				<p className="login__question">Ещё не зарегистрированы?</p>
				<Link className="login__form-link" to="/signup">Регистрация</Link>  
			</div>
</form>
</div>

</section>
);
}

export default Login;