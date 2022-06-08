
import React from "react";
import './Portfolio.css'
import ArrowImage from '../../images/arrow.svg';

function Portfolio(){
	return ( 
<section className="portfolio">
<h2 className="portfolio__title">Портфолио</h2>
<ul className="portfolio__links">
	<li className="portfolio__item">
	<a className="portfolio__link" href="https://kuban23.github.io/how-to-learn">
	<h3 className="portfolio__link-title">Статичный сайт</h3>
	<img className="portfolio__link-picture" src={ArrowImage} alt="Изображение стрелки" />
	</a>
	</li>

	<li className="portfolio__item">
	<a className="portfolio__link" href="https://kuban23.github.io/russian-travel/">
	<h3 className="portfolio__link-title">Адаптивный сайт</h3>
	<img className="portfolio__link-picture" src={ArrowImage} alt="Изображение стрелки" />
	</a>
	</li>

	<li className="portfolio__item">
	<a className="portfolio__link" href="https://kuban23.github.io/mesto-react/">
	<h3 className="portfolio__link-title">Одностраничное приложение</h3>
	<img className="portfolio__link-picture" src={ArrowImage} alt="Изображение стрелки" />
	</a>
	</li>

</ul>

</section>
);
}

export default Portfolio;