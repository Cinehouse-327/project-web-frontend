// // MovieCard.jsx
// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import "./MovieCard.css";

// function MovieCard({ movie }) {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { userId, isAuthenticated } = useSelector((state) => state.auth);

//   const handleBooking = () => {
//     if (!isAuthenticated) {
//       alert("Please log in to book a movie.");
//       navigate("/login");
//       return;
//     }

//     navigate("/booking", {
//       state: {
//         movieTitle: movie.name,
//         moviePoster: movie.imageLink,
//         movieId: movie._id,
//         userId,
//       },
//     });
//   };

//   const handleAddToWatchlist = async () => {
//     if (!isAuthenticated) {
//       alert("Please log in to add movies to your watchlist.");
//       navigate("/login");
//       return;
//     }

//     try {
//       const response = await fetch(`http://localhost:3000/watchlist/add`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           userId,
//           movieId: movie._id,
//         }),
//       });
//       const result = await response.json();
//       if (result.success) {
//         navigate("/watchlist");
//       } else {
//         alert(result.message || "Failed to add to watchlist");
//       }
//     } catch (error) {
//       console.error("Error adding to watchlist:", error);
//     }
//   };

//   return (
//     <div className="movie-card">
//       <img src={movie.imageLink} alt={`${movie.name} poster`} className="movie-poster" />
//       <div className="movie-info">
//         <h3 className="movie-name">{movie.name}</h3>
//         <p className="movie-year">Year: {movie.year}</p>
//         <p className="movie-category">Category: {movie.category}</p>
//         <p className="movie-type">Type: {movie.type}</p>
//       </div>
//       <button onClick={handleBooking} className="book-button">
//         Book Now
//       </button>
//       <button onClick={handleAddToWatchlist} className="watchlist-button">
//         Add Watchlist
//       </button>
//     </div>
//   );
// }

// export default MovieCard;



import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./MovieCard.css";
import axios from "axios";

function MovieCard({ movie }) {
  const navigate = useNavigate();
  const { userId, isAuthenticated } = useSelector((state) => state.auth);

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
        userId,
      },
    });
  };

  const handleAddToWatchlist = async () => {
    if (!isAuthenticated) {
      alert("Please log in to add movies to your watchlist.");
      navigate("/login");
      return;
    }

    try {
      await axios.post("http://localhost:3000/watchlist/add", {
        userId,
        movie,
      });
      navigate("/watchlist");
    } catch (error) {
      console.error("Error adding movie to watchlist:", error);
      alert("Failed to add movie to watchlist.");
    }
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
      <button onClick={handleAddToWatchlist} className="watchlist-button">
        Add to Watchlist
      </button>
      <button onClick={handleBooking} className="book-button">
        Book Now
      </button>
    </div>
  );
}

export default MovieCard;
