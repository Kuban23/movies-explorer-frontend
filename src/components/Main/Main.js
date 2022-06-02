import React from "react";
import './Main.css'
import Promo from "../Promo/Promo";
import AboutProject from "../AboutProject/AboutProject";
import Techs from "../Techs/Techs";

function Main(){
	return ( 
  <div>
  <Promo />
  <AboutProject/>
  <Techs/>
  </div>

);
}

export default Main;