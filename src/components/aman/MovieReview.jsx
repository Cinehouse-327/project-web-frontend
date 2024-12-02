import React, { useState, useEffect } from "react";
import axios from "axios";
import "./MovieReview.css";

/**
 * Review Component - Displays a single movie review.
 * @param {Object} props - Component props.
 * @param {Object} props.review - The review data to display.
 * @returns {JSX.Element} The rendered Review component.
 */
const Review = ({ review }) => {
  return (
    <div className="review">
      <div className="user-photo">
        <img
          src="https://www.thedailystar.net/sites/default/files/styles/big_2/public/feature/images/hero_alam-web.jpg"
          alt="User Photo"
          width="60"
          height="60"
        />
      </div>
      <div className="review-content">
        <div className="review-header">
          <div className="user-name">{review.title}</div>
          <div className="review-date">{new Date().toLocaleDateString()}</div>
        </div>
        <div className="review-stars">{"★".repeat(review.rating)}</div>
        <div className="review-text">{review.review}</div>
      </div>
    </div>
  );
};

/**
 * ReviewFormModal - A modal dialog for submitting a new review.
 * @param {Object} props - Component props.
 * @param {boolean} props.isOpen - Whether the modal is open.
 * @param {Function} props.onClose - Function to close the modal.
 * @param {Function} props.onSubmit - Function to submit the review.
 * @returns {JSX.Element|null} The rendered ReviewFormModal component or null if not open.
 */
const ReviewFormModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: "",
    rating: "",
    detail: "",
  });

  // Handle input change for form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ title: "", rating: "", detail: "" }); // Reset form
    onClose(); // Close the modal after submission
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <h2>Write a Review</h2>
        <form onSubmit={handleSubmit} className="review-form">
          <div className="form-group">
            <label>Title of Review</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Rating (1-10)</label>
            <input
              type="number"
              name="rating"
              min="1"
              max="10"
              value={formData.rating}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Detail Review</label>
            <textarea
              name="detail"
              value={formData.detail}
              onChange={handleChange}
              rows="5"
              required
            />
          </div>
          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

/**
 * MovieReview Component - Displays movie details, reviews, and provides an option to write a review.
 * @param {Object} props - Component props.
 * @param {string} props.movieId - The ID of the movie.
 * @param {string} props.userId - The ID of the user.
 * @returns {JSX.Element} The rendered MovieReview component.
 */
const MovieReview = ({ movieId, userId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal open/close state
  const [reviews, setReviews] = useState([]); // Reviews state

  // Fetch reviews for the specific movie when the component mounts
  useEffect(() => {
    const fetchReviews = async () => {
      const movieId = "638a05f28a12345678abcd90";
      try {
        const { data } = await axios.get("http://localhost:3000/review/getreviews", {
          params: { movieId },
        });
        setReviews(data.reviews); // Set reviews to state
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, [movieId]); // Fetch reviews whenever movieId changes

  /**
   * Handle submitting a new review.
   * @param {Object} review - The review data.
   */
  const handleAddReview = async (review) => {
    const newReview = {
      movie_id: movieId,
      user_id: userId,
      title: review.title,
      rating: parseInt(review.rating),
      review: review.detail,
      date: new Date().toLocaleDateString(), // Current date
      userPhoto:
        "https://hips.hearstapps.com/hmg-prod/images/narendra-modi-494107793-600x600.jpg?crop=1xw:1.0xh;center,top&resize=640:*", // Placeholder photo
    };

    try {
      const response = await axios.post(`http://localhost:3000/review/add/${movieId}`, newReview);

      if (response.status === 201) {
        // Add new review to state
        setReviews((prev) => [newReview, ...prev]);
        alert("Review submitted successfully!");
      } else {
        alert("Error submitting review.");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to submit review. Please try again later.");
    }
  };

  return (
    <div className="container">
      {/* Left Side: Movie Poster */}
      <div className="movie-poster">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWNZA7Kyy-Q2hAGDOSKKP6FTFJY1qpUsTttDwaroHljSqjmkJxtH5WaYIPZY9GK3U1gNI&usqp=CAU"
          alt="Movie Poster"
        />
        <button className="book-ticket-button">Book a Ticket</button>
      </div>

      {/* Right Side: Movie Info and Reviews */}
      <div className="movie-info">
        <div className="movie-title">Spider-Man: Far From Home</div>
        <div className="movie-subtitle">2021</div>

        {/* Overall Rating */}
        <div className="overall-rating">
          <div className="overall">Overall Rating:</div>
          <div className="rating-value">8.1/10</div>
          <div className="stars">★★★★★★★★☆☆</div>
          <button
            className="write-review-button"
            onClick={() => setIsModalOpen(true)} // Open modal to write a review
          >
            Write Review
          </button>
        </div>
        <div className="total-reviews">Total Reviews: {reviews.length}</div>

        {/* Review List */}
        <div className="review-list">
          {reviews.map((review, index) => (
            <Review key={index} review={review} />
          ))}
        </div>
      </div>

      {/* Review Form Modal */}
      <ReviewFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddReview}
      />
    </div>
  );
};

export default MovieReview;
