
import React from "react";
import './SavedMovies.css'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import SearchForm from '../SearchForm/SearchForm';
import MoviesCard from '../MoviesCard/MoviesCard'

function SavedMovies(props){
	return ( 
	<section className="saved-movies">
	<Header loggedIn={props.loggedIn}/>
	<SearchForm 
	savedMovies={props.savedMovies}
	handleMovieDelete={props.handleMovieDelete}


	/>	
   <div className="saved-movies__list">
   <MoviesCard/>
   <MoviesCard/>
   <MoviesCard/>
   </div>
	<Footer/>

	</section>
);
}

export default SavedMovies;