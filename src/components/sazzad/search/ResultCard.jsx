import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './ResultCard.css';

/**
 * ResultCard component displays information about a movie and allows users to book a movie ticket.
 * It checks whether the user is authenticated before proceeding with the booking.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {Object} props.movie - The movie object containing details about the movie.
 * @param {string} props.movie.name - The name of the movie.
 * @param {string} props.movie.imageLink - The URL of the movie poster image.
 * @param {string} props.movie._id - The unique identifier for the movie.
 * @param {string} props.movie.year - The release year of the movie.
 * @param {string} props.movie.category - The category or genre of the movie.
 * @param {string} props.movie.type - The type of movie (e.g., action, drama).
 *
 * @returns {JSX.Element} The ResultCard component.
 */
const ResultCard = ({ movie }) => {
  const navigate = useNavigate();
  
 
  const { userId, isAuthenticated } = useSelector((state) => state.auth);

  /**
   * Handles the booking process when the "Book Now" button is clicked.
   * If the user is not authenticated, they are prompted to log in.
   * If authenticated, navigates to the booking page with relevant movie details.
   */
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
    <div className="horizontalMovieCard">
      <img
        src={movie.imageLink}
        alt={`${movie.name} poster`}
        className="horizontalMoviePoster"
      />
      <div className="horizontalMovieInfo">
        <h3 className="horizontalMovieTitle">{movie.name}</h3>
        <div className="horizontalMovieDetails">
          <span className="horizontalMovieYear">{movie.year}</span>
          <span className="horizontalMovieCategory">{movie.category}</span>
          <span className="horizontalMovieType">{movie.type}</span>
        </div>
      </div>
      <button onClick={handleBooking} className="horizontalBookButton">
        Book Now
      </button>
    </div>
  );
};

export default ResultCard;
