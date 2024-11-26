import React from 'react';
import './App.css';
import './MovieReview.css';
import { Routes, Route } from 'react-router-dom';
import Home from './components/home/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Booking from './components/sazzad/booking/bookingPage';
import SearchMovie from './components/sazzad/search/SearchMovie';

import Order from './components/zaed/OrderConcession';
import WatchList from './components/zaed/WatchlistApp';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/search" element={<SearchMovie />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/order" element={<Order />} />
        <Route path="/watchlist" element={<WatchList />} />
      </Routes>
    </>
  );
};

export default App;
