import React from "react";
import './NavTab.css'

function NavTab(){
	return ( 
<div className="navtab">
<a className='navtab__link' href="#">О проекте</a>
<a className='navtab__link' href="#">Технологии</a>
<a className='navtab__link' href="#">Студент</a>
</div>
);
}

export default NavTab;