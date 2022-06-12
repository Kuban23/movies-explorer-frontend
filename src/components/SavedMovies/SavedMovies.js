
import React from "react";
import './SavedMovies.css'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import SearchForm from '../SearchForm/SearchForm';
import MoviesCard from '../MoviesCard/MoviesCard'

function SavedMovies(props){
	return ( 
	<div>
	<Header loggedIn={props.loggedIn}/>
	<SearchForm />	
   <MoviesCard/>
   <MoviesCard/>
   <MoviesCard/>
	<Footer/>

	</div>
);
}

export default SavedMovies;