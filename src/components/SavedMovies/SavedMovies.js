
import React from "react";
import './SavedMovies.css'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import SearchForm from '../SearchForm/SearchForm';
// import MoviesCard from '../MoviesCard/MoviesCard'

function SavedMovies(props){
	return ( 
	// <section className="saved-movies">
	<>
	<Header loggedIn={props.loggedIn}/>
	<SearchForm 
	isSaved
	cardCount={props.cardCount}
	handleMovieDelete={props.handleMovieDelete}
	savedMovies={props.savedMovies}
	/>	   
	<Footer/>
	</>
	
);
}

export default SavedMovies;