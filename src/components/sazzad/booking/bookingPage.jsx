import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import './BookingPage.css';
import Header from '../../home/pageComponents/Header';
import Footer from '../../home/pageComponents/Footer';


/**
 * @file bookingPage.jsx
 * @description This component handles the rendering and functionality of the booking page, 
 * allowing users to view and manage booking details, make reservations, 
 * and interact with related features such as selecting dates, times, and services.
 */

/**
 * BookingPage component for selecting and booking movie tickets.
 * 
 * Displays the booking interface for a movie, allowing the user to select
 * the date, showtime, seat type, and seats. Once the user has selected their seats,
 * it confirms the booking and navigates to the payment page.
 * 
 * @returns {JSX.Element} The rendered BookingPage component.
 */
const BookingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  

  const { movieTitle, moviePoster, movieId, userId } = location.state || {};


  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [seatType, setSeatType] = useState('');
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [seatsStatus, setSeatsStatus] = useState([]);

  /**
   * Fetches the status of the seats based on the selected date and time.
   * Updates the seatsStatus state with the fetched data.
   */
  const fetchSeatsStatus = async () => {
    if (!selectedDate || !selectedTime) return;

    try {
      const response = await fetch(
        `http://localhost:3000/user/bookings/seats?movieId=${movieId}&date=${selectedDate}&time=${selectedTime}`
      );
      const data = await response.json();
      if (response.ok) {
        setSeatsStatus(data.seats);
      } else {
        console.error('Failed to fetch seat status:', data.message);
      }
    } catch (error) {
      console.error('Error fetching seat status:', error);
    }
  };


  useEffect(() => {
    fetchSeatsStatus();
  }, [selectedDate, selectedTime]);

  /**
   * Handles the seat click event to toggle seat selection.
   * 
   * @param {number} seatIndex - The index of the clicked seat.
   */
  const handleSeatClick = (seatIndex) => {
    if (seatsStatus[seatIndex] === 'booked') {
      return;
    }

    setSelectedSeats((prev) =>
      prev.includes(seatIndex)
        ? prev.filter((seat) => seat !== seatIndex)
        : [...prev, seatIndex]
    );
  };

  /**
   * Calculates the total price of the booking based on the selected seat type and number of seats.
   * 
   * @returns {number} The total price for the selected seats.
   */
  const calculateTotalPrice = () => {
    const seatPrices = { VIP: 500, Regular: 300, Economy: 200 };
    return selectedSeats.length * (seatPrices[seatType] || 0);
  };

  /**
   * Confirms the booking by sending booking details to the server and navigating to the payment page.
   */
  const confirmBooking = async () => {
    if (!selectedSeats.length) {
      alert('Please select at least one seat to book.');
      return;
    }

    const totalPrice = calculateTotalPrice();
    const bookingDetails = {
      userId: userId,
      movieId: movieId,
      showTime: selectedTime,
      date: selectedDate,
      seats: selectedSeats,
      totalPrice: totalPrice,
    };

    try {
      const response = await fetch('http://localhost:3000/user/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingDetails),
      });

      if (response.ok) {
        const responseData = await response.json();
        const { bookingId } = responseData;
        alert(`Booking confirmed for ${movieTitle}! Booking ID: ${bookingId}`);
        setSelectedSeats([]);
        await fetchSeatsStatus();
        navigate('/payment', { state: { totalPrice, bookingId, userId } });
      } else {
        const errorData = await response.json();
        alert(`Failed to confirm booking: ${errorData.message}`);
      }
    } catch (error) {
      alert(`Error confirming booking: ${error.message}`);
    }
  };

  return (
    <div className="bookingPage">
      <Header />
      <h1>Book {movieTitle}</h1>
      <img className="bookingPage__poster" src={moviePoster} alt={movieTitle} />

      <div className="bookingPage__options">
        <label>
          Select Date:
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </label>
        <label>
          Select Show Time:
          <select value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)}>
            <option value="">Choose Show Time</option>
            <option value="12:00:00">12:00 PM</option>
            <option value="16:00:00">4:00 PM</option>
            <option value="20:00:00">8:00 PM</option>
          </select>
        </label>

        <label>
          Select Seat Type:
          <select value={seatType} onChange={(e) => setSeatType(e.target.value)}>
            <option value="">Choose seat type</option>
            <option value="VIP">VIP</option>
            <option value="Regular">Regular</option>
            <option value="Economy">Economy</option>
          </select>
        </label>
      </div>

      <div className="bookingPage__seatSelection">
        <h2>Select Your Seats</h2>
        <div className="seatGrid">
          {Array.from({ length: 30 }, (_, index) => (
            <div
              key={index}
              className={`seat ${
                seatsStatus[index] === 'booked'
                  ? 'booked'
                  : selectedSeats.includes(index)
                  ? 'selected'
                  : 'available'
              }`}
              onClick={() => handleSeatClick(index)}
            >
              {index + 1}
            </div>
          ))}
        </div>
      </div>

      <button className="bookingPage__confirmButton" onClick={confirmBooking}>
        Confirm Booking
      </button>
      <Footer />
    </div>
  );
};

export default BookingPage;
