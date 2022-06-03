import React from "react";
import './Main.css'
import Promo from "../Promo/Promo";
import AboutProject from "../AboutProject/AboutProject";
import Techs from "../Techs/Techs";
import AboutMe from "../AboutMe/AboutMe";
import Portfolio from "../Portfolio/Portfolio";
import Footer from "../Footer/Footer";


function Main(){
	return ( 
  <div>
  <Promo />
  <AboutProject/>
  <Techs/>
  <AboutMe/>
  <Portfolio/>
  <Footer/>
  </div>

);
}

export default Main;