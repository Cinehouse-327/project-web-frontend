import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./MovieCard.css";

/**
 * MovieCard Component
 * @component
 * 
 * @param {Object} props - The props object.
 * @param {Object} props.movie - Movie details including title, year, category, and type.
 * 
 * @returns {JSX.Element} A card displaying movie details with a "Book Now" button.
 */
function MovieCard({ movie }) {
  const navigate = useNavigate();
  
  /** 
   * Redux state for user authentication and ID.
   * @type {Object} 
   * @property {string} userId - The unique ID of the authenticated user.
   * @property {boolean} isAuthenticated - Whether the user is logged in.
   */
  const { userId, isAuthenticated } = useSelector((state) => state.auth);

  /**
   * Handle booking action.
   * Navigates to the booking page if the user is authenticated.
   * Redirects to the login page if not authenticated.
   */
  const handleBooking = () => {
    if (!isAuthenticated) {
      alert("Please log in to book a movie.");
      navigate("/login");
      return;
    }

    navigate("/booking", {
      state: {
        movieTitle: movie.name,
        moviePoster: movie.imageLink,
        movieId: movie._id,
        userId: userId,
      },
    });
  };

  return (
    <div className="movie-card">
      <img
        src={movie.imageLink}
        alt={`${movie.name} poster`}
        className="movie-poster"
      />
      <div className="movie-info">
        <h3 className="movie-name">{movie.name}</h3>
        <p className="movie-year">Year: {movie.year}</p>
        <p className="movie-category">Category: {movie.category}</p>
        <p className="movie-type">Type: {movie.type}</p>
      </div>
      <button onClick={handleBooking} className="book-button">
        Book Now
      </button>
    </div>
  );
}

export default MovieCard;
