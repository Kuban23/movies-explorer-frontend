import React from "react";
import './Movies.css'
import SearchForm from '../../components/SearchForm/SearchForm';
import Header from '../Header/Header'
import Footer from '../Footer/Footer'

function Movies(){
	return ( 
<div>
   <Header />
	<SearchForm/>
	<Footer />
</div>
);
}

export default Movies;