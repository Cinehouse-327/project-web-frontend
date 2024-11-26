import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { fetchMovies, filterMovies } from '../../../store/movieSlice';
import './SearchMovie.css';
import Header from '../../home/pageComponents/Header';
import Footer from '../../home/pageComponents/Footer';
import FilterBar from './FilterBar';
import ResultCard from './ResultCard';

const SearchMovie = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { movies, filteredMovies, loading, error } = useSelector((state) => state.movies);
  const { isAuthenticated } = useSelector((state) => state.auth);

  const searchQuery = location.state?.query || '';

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  useEffect(() => {
    if (searchQuery) {
      const filtered = movies.filter((movie) =>
        movie.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      dispatch(filterMovies(filtered));
    } else {
      dispatch(filterMovies(movies));
    }
  }, [searchQuery, movies, dispatch]);

  const handleFilter = (filtered) => dispatch(filterMovies(filtered));

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
