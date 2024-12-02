import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../../store/authSlice';
import "./Header.css";

const Header = () => {
  const [isScrolling, setIsScrolling] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const handleScroll = () => {
    if (window.scrollY > 100) {
      setIsScrolling(true);
    } else {
      setIsScrolling(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <header className={`header ${isScrolling ? 'header--scrolled' : ''}`}>
      <div className="header__content">
        <div className="header__logo">
          <img
            src="https://i.ibb.co.com/SxFZYcm/cholo-dekhi-logo.png"
            alt="Netflix Logo"
          />
        </div>

        <div className="header__nav">
          <a href="/" className="header__navItem">
            Home
          </a>
          <a href="/trending" className="header__navItem">
            Trending
          </a>
          <a href="/movies" className="header__navItem">
            Movies
          </a>
          <a href="/order" className="header__navItem">
            FOOD
          </a>
          <a href="/my-list" className="header__navItem">
            My List
          </a>
        </div>

        <div className="header__controls">
          {isAuthenticated ? (
            <div className="header__user">
              <img
                src="https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-avatar-image-for-profile-png-image_13001882.png"
                alt="User Avatar"
                className="header__avatar"
              />
              <button className="header__logoutButton" onClick={handleLogout}>
                Logout
              </button>
            </div>
          ) : (
            <button className="header__loginButton" onClick={handleLogin}>
              LogIn
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
