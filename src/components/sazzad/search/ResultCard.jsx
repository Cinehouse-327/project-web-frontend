import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './ResultCard.css';

const ResultCard = ({ movie }) => {
  const navigate = useNavigate();
  const { userId, isAuthenticated } = useSelector((state) => state.auth);

  const handleBooking = () => {
    if (!isAuthenticated) {
      alert('Please log in to book a movie.');
      navigate('/login');
      return;
    }

    navigate('/booking', {
      state: {
        movieTitle: movie.name,
        moviePoster: movie.imageLink,
        movieId: movie._id,
        userId,
      },
    });
  };

  return (
    <div className="horizontal-movie-card">
      <img
        src={movie.imageLink}
        alt={`${movie.name} poster`}
        className="horizontal-movie-poster"
      />
      <div className="horizontal-movie-info">
        <h3 className="horizontal-movie-title">{movie.name}</h3>
        <div className="horizontal-movie-details">
          <span className="horizontal-movie-year">{movie.year}</span>
          <span className="horizontal-movie-category">{movie.category}</span>
          <span className="horizontal-movie-type">{movie.type}</span>
        </div>
      </div>
      <button onClick={handleBooking} className="horizontal-book-button">
        Book Now
      </button>
    </div>
  );
};

export default ResultCard;
