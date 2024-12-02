import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies } from '../../../store/movieSlice';
import './MovieList.css';
import Header from '../../home/pageComponents/Header';
import Footer from '../../home/pageComponents/Footer';
import MovieCard from './MovieCard';

function MovieList() {
  const dispatch = useDispatch();
  const { movies, loading, error } = useSelector((state) => state.movies);  // Assuming the movies are stored in `state.movies`

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="list-page">
      <Header />
      <div className="movie-list-page">
        <h1 className="title">Movie List</h1>
        <div className="movie-grid">
          {movies.length > 0 ? (
            movies.map((movie) => (
              <MovieCard key={movie.movieId} movie={movie} />
            ))
          ) : (
            <div>No movies found</div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default MovieList;
