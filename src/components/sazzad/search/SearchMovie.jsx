import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './SearchMovie.css';
import Header from '../../home/pageComponents/Header';
import Footer from '../../home/pageComponents/Footer';
import FilterBar from './FilterBar';
import ResultCard from './ResultCard';

/**
 * SearchMovie component to fetch, display, and filter movies based on a search query.
 * The component fetches movie data from a backend API, handles filtering based on the search query,
 * and displays the movies in a grid format.
 *
 * @component
 * @example
 * return <SearchMovie />;
 */
const SearchMovie = () => {
  // Get the search query from the location state
  const location = useLocation();
  const searchQuery = location.state?.query || '';

  // State to manage movies, filtered movies, loading state, and error state
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Fetches the movie data from the backend API and updates the state with the response.
   * Handles loading and error states.
   */
  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:3000/search/movies');
        const data = await response.json();
        if (data.success) {
          setMovies(data.data);
          setFilteredMovies(data.data);
        } else {
          setError(data.message);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  /**
   * Filters the movies based on the search query from the URL.
   * @param {Array} movies - List of movies fetched from the API.
   */
  useEffect(() => {
    if (searchQuery) {
      const filtered = movies.filter((movie) =>
        movie.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredMovies(filtered);
    } else {
      setFilteredMovies(movies);
    }
  }, [searchQuery, movies]);

  /**
   * Handles the filter change event from the FilterBar component.
   * @param {Array} filtered - The filtered list of movies to be displayed.
   */
  const handleFilter = (filtered) => setFilteredMovies(filtered);

  // Loading and error state handling
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
        <h1 className="title">Search Result</h1>
        <FilterBar movies={movies} onFilter={handleFilter} />
        <div className="movie-grid">
          {filteredMovies.length > 0 ? (
            filteredMovies.map((movie) => (
              <ResultCard key={movie.movieId} movie={movie} />
            ))
          ) : (
            <div>No movies found</div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SearchMovie;
