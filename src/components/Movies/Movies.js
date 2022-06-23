import React from "react";
import './Movies.css'
import SearchForm from '../../components/SearchForm/SearchForm';
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
//import MoviesCardList from '../../components/MoviesCardList/MoviesCardList';

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
   {/* <MoviesCardList/> */}
	<Footer />
</div>
);
}

export default Movies;