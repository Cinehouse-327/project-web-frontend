import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import "./Watchlist.css";


/**
 * @file watchList.jsx
 * @description This component manages the user's watchlist, 
 * allowing users to add, remove, and view movies or shows they wish to watch in the future.
 */

function Watchlist() {
  const [movies, setMovies] = useState([]);
  const { userId } = useSelector((state) => state.auth); 

  useEffect(() => {
    const fetchWatchlist = async () => {
      try {
        const { data } = await axios.get("http://localhost:3000/watchlist", {
          params: { userId }, 
        });
        setMovies(data.movies);
      } catch (error) {
        console.error("Error fetching watchlist:", error);
      }
    };
    fetchWatchlist();
  }, [userId]);

  const handleDelete = async (movieId) => {
    try {
      await axios.delete(`http://localhost:3000/watchlist/remove/${movieId}`);
      setMovies(movies.filter((movie) => movie._id !== movieId));
    } catch (error) {
      console.error("Error removing movie from watchlist:", error);
    }
  };

  return (
    <div className="watchlist-container">
      <h1>Your Watchlist</h1>
      {movies.length > 0 ? (
        <div className="watchlist-grid">
          {movies.map((movie) => (
            <div key={movie._id} className="watchlist-item">
              <img src={movie.movie.imageLink} alt={movie.movie.name} className="poster" />
              <div className="info">
                <h3>{movie.movie.name}</h3>
                <button
                  onClick={() => handleDelete(movie._id)}
                  className="delete-button"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No movies in your watchlist.</p>
      )}
    </div>
  );
}

export default Watchlist;
