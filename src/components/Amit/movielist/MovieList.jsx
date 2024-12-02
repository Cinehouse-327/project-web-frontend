import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies } from '../../../store/movieSlice';
import './MovieList.css';
import Header from '../../home/pageComponents/Header';
import Footer from '../../home/pageComponents/Footer';
import MovieCard from './MovieCard';

/**
 * The `MovieList` component displays a list of movies.
 * It fetches movies from the Redux store and renders them in a grid.
 *
 * @component
 * @returns {JSX.Element} The rendered `MovieList` component.
 */
function MovieList() {
  const dispatch = useDispatch();

  /**
   * Selector for accessing movie-related data from the Redux store.
   * @type {Object} movies - Array of movie objects.
   * @type {boolean} loading - Loading state.
   * @type {string|null} error - Error message, if any.
   */
  const { movies, loading, error } = useSelector((state) => state.movies);

  /**
   * Fetches the list of movies on component mount.
   * Uses the `fetchMovies` action from the Redux store.
   */
  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  /**
   * Renders a loading spinner if data is being fetched.
   * @returns {JSX.Element} Loading spinner element.
   */
  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  /**
   * Renders an error message if an error occurs while fetching data.
   * @returns {JSX.Element} Error message element.
   */
  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  /**
   * Renders the list of movies in a grid.
   * If no movies are available, displays a fallback message.
   * @returns {JSX.Element} The movie grid or a fallback message.
   */
  return (
    <div className="list-page">
      <Header />
      <div className="movie-list-page">
        <h1 className="title">Movie List</h1>
        <div className="movie-grid">
          {movies.length > 0 ? (
            movies.map((movie) => (
              /**
               * Renders a movie card for each movie in the list.
               * @param {Object} movie - Movie object.
               * @param {string|number} movie.movieId - Unique ID for the movie.
               */
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
