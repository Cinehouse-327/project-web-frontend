import React, { useState } from 'react';
import Header from './pageComponents/Header';
import Footer from './pageComponents/Footer';
import './Home.css';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');


  const handleSearchChange = (e) => {
    
  };

  const handleSearch = () => {

  };

  const handleBook = (movieTitle, moviePoster) => {
   
  };

  return (
    <div className="home">
      <Header />

      <div className="home__banner">
        <img
          className="home__bannerImage"
          src="https://i.ibb.co/1GTb7Zz/auth-background.jpg"
          alt="Banner"
        />
        <div className="home__searchWrapper">
          <input
            type="text"
            className="home__search"
            placeholder="Search for movies, shows..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
      </div>

      <div className="home__bannerContents">
        <h1 className="home__title">Popular Movies</h1>
      </div>

      <div className="home__row">
        <div className="home__movie">
          <img
            className="home__moviePoster"
            src="https://m.media-amazon.com/images/I/71tIm0Xxr2L._AC_UF1000,1000_QL80_.jpg"
            alt="John Wick"
          />
          <div className="home__movieDetails">
            <h3 className="home__movieTitle">John Wick</h3>
            <p className="home__movieRating">8.7/10</p>
            <button
              className="home__bookButton"
              onClick={() =>
                handleBook(
                  'John Wick',
                  'https://m.media-amazon.com/images/I/71tIm0Xxr2L._AC_UF1000,1000_QL80_.jpg'
                )
              }
            >
              Book
            </button>
          </div>
        </div>

        <div className="home__movie">
          <img
            className="home__moviePoster"
            src="https://thumbnails.cbsig.net/CBS_Production_Entertainment_VMS/2023/05/04/2202473539626/MIDR1_US_2023_Amazon_1920x1080_2538342_1920x1080.jpg"
            alt="Mission Impossible"
          />
          <div className="home__movieDetails">
            <h3 className="home__movieTitle">Mission Impossible</h3>
            <p className="home__movieRating">⭐ 8.9/10</p>
            <button
              className="home__bookButton"
              onClick={() =>
                handleBook(
                  'Mission Impossible',
                  'https://thumbnails.cbsig.net/CBS_Production_Entertainment_VMS/2023/05/04/2202473539626/MIDR1_US_2023_Amazon_1920x1080_2538342_1920x1080.jpg'
                )
              }
            >
              Book
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
