import React from "react";
import './Movies.css'
import SearchForm from '../../components/SearchForm/SearchForm';
import Header from '../Header/Header'
import Footer from '../Footer/Footer'

function Movies(props){
	return ( 
<div>
   <Header loggedIn={props.loggedIn}/>
	<SearchForm
	savedMovies={props.savedMovies}
	handleSavedMovie={props.handleSavedMovie}
	handleMovieDelete={props.handleMovieDelete}
	isSaved={false}
	cardCount={props.cardCount}
	/>   
	<Footer />
</div>
);
}

export default Movies;