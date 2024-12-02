import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './components/home/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Booking from './components/sazzad/booking/bookingPage';
import SearchMovie from './components/sazzad/search/SearchMovie';

import Order from './components/zaed/FoodList';
import WatchList from './components/zaed/Watchlist';

import MovieReview from './components/aman/MovieReview';
import Payment from './components/aman/PaymentGateway';

import MovieList from './components/Amit/movielist/MovieList';
import HelpSupport from './components/Amit/HelpSupport';

import Profile from './components/akif/EditProfile';
// import GiftCard from './components/akif/GiftCard'

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/search" element={<SearchMovie />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/movies" element={<MovieList />} />
        <Route path="/order" element={<Order />} />
        <Route path="/watchlist" element={<WatchList />} />
        <Route path="/review" element={<MovieReview />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/help" element={<HelpSupport />} />
        <Route path="/profile" element={<Profile />} />
        {/* <Route path="/gift" element={<GiftCard />} /> */}
      </Routes>
    </>
  );
};

export default App;
