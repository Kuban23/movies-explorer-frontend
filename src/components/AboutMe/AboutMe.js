
import React from "react";
import './AboutMe.css'
import aboutMePhoto from '../../images/aboutme.jpg';

function AboutMe(){
	return ( 
<section className="about-me" id ="student">
	<h2 className="about-me__title">Студент</h2>
	<div className="about-me__container">
		<div className="about-me__info-container">
	{/* <div className="about-me__info-container"></div>	 */}
	<h3 className="about-me__name">Андрей</h3>
	<p className="about-me__prof">Фронтенд-разработчик</p>
	<p className="about-me__about">Привет! Я Фронтенд-разработчик, с сентября 2021г., проходил переподготовку по профессии Веб-разработчик.
            Курс рассчитан на 10 мес. По итогам обучения, выполнения всех заданий и защиты дипломного проекта, получен Сертификат. 
				Обладаю на сегодняшний день навыками: HTML, CSS (методология БЭМ, Flexbox, Grid Layout, адаптивная
            верстка), Figma, JavaScript (es6), взаимодействие с DOM, Ajax-запросы, React JS, REST API, Babel, сборка Webpack, Git, Node.js,
            Express, MongoDB
	</p>
	<ul className="about-me__social-links">
			<li>
			<a className="about-me__info-social-link" href="http://www.linkedin.com/in/андрей-есин" target="blank">Linkedin</a>
			</li>	
			<li>
			<a className="about-me__info-social-link" href="https://github.com/Kuban23" target="blank">Github</a>
			</li>		
			<li>
			<a className="about-me__info-social-link" href="https://telegram.me/@EsinAndrew" target="blank">Telegram</a>
			</li>

	</ul>
	</div>
	<img className="about-me__photo" src={aboutMePhoto} alt="Фото студента" />
	</div>
	

</section>
);
}

export default AboutMe;