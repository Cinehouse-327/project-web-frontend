import React, { useState } from 'react';
import './MovieReview.css';
// Review Component to display each review
const Review = ({ review }) => {
  return (
    <div className="review">
      <div className="user-photo">
        <img src={review.userPhoto} alt="User Photo" width="60" height="60" />
      </div>
      <div className="review-content">
        <div className="review-header">
          <div className="user-name">{review.name}</div>
          <div className="review-date">{review.date}</div>
        </div>
        <div className="review-stars">{'★'.repeat(review.rating)}</div>
        <div className="review-text">{review.content}</div>
      </div>
    </div>
  );
};

// Modal for Review Form
const ReviewFormModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    rating: '',
    detail: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ title: '', rating: '', detail: '' });
    onClose();
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

// Main MovieReview Component
const MovieReview = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviews, setReviews] = useState([
    {
      name: 'Yusuf Sarkar',
      date: 'August 15, 2022',
      rating: 5,
      content: 'Avengers Age of Ultron is an excellent sequel and a worthy MCU title! The action is amazing and the characters are fantastic...',
      userPhoto: 'https://upload.wikimedia.org/wikipedia/commons/a/a1/Muhammad_Yunus_at_the_UNGA79_-_2024_%28cropped%29.jpg',
    },
    {
      name: 'Donald Trump',
      date: 'October 21, 2018',
      rating: 5,
      content: 'This is by far one of my favorite movies from the MCU. Lorem ipsum text ever since the 1500s...',
      userPhoto: 'https://www.economist.com/cdn-cgi/image/width=1424,quality=80,format=auto/content-assets/images/20240706_USP503.jpg',
    },
    {
      name: 'Modi Sarkar',
      date: 'November 5, 2024',
      rating: 5,
      content: 'Avengers Age of Ultron is an excellent sequel and a worthy MCU title! The action is amazing and the characters are fantastic...',
      userPhoto: 'https://www.newsonair.gov.in/wp-content/uploads/2024/08/3-Prime-Minister-Narendra-Modi-File-photo.jpeg',
    },
  ]);

  const handleAddReview = (review) => {
    const newReview = {
      name: 'Anonymous', // Default name
      date: new Date().toLocaleDateString(),
      rating: parseInt(review.rating),
      content: review.detail,
      userPhoto: 'https://via.placeholder.com/60', // Placeholder photo
    };
    setReviews((prev) => [newReview, ...prev]);
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
        {/* Movie Title and Subtitle */}
        <div className="movie-title">Spider-Man: Far From Home</div>
        <div className="movie-subtitle">2021</div>

        {/* Overall Rating */}
        <div className="overall-rating">
          <div className="overall">Overall Rating:</div>
          <div className="rating-value">8.1/10</div>
          <div className="stars">★★★★★★★★☆☆</div>
          <button
            className="write-review-button"
            onClick={() => setIsModalOpen(true)}
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
