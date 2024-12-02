import React, { useState } from 'react';

/**
 * @file EditProfile.jsx
 * @description This component allows users to view and update their profile information, 
 * including personal details, contact information, and account settings.
 */

const EditProfile = () => {
  const [profile, setProfile] = useState({
    firstName: 'Akif',
    lastName: 'Zahin',
    email: 'akif.zahin@northsouth.edu',
    address: '',
    contactNumber: '',
    city: 'Dhaka',
    state: 'Uttara',
    password: '********'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Profile updated:', profile);
  };

  return (
    <div className="edit-profile-container">
      <div className="profile-header">
        <h2 className="profile-title">Edit profile</h2>
        <div className="profile-image">
          <img src="/api/placeholder/48/48" alt="Profile" />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="form-container">
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">First Name</label>
            <input
              type="text"
              className="form-input"
              value={profile.firstName}
              onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Last Name</label>
            <input
              type="text"
              className="form-input"
              value={profile.lastName}
              onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-input"
            value={profile.email}
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Address</label>
          <textarea
            className="form-textarea"
            value={profile.address}
            onChange={(e) => setProfile({ ...profile, address: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Contact Number</label>
          <input
            type="tel"
            className="form-input"
            value={profile.contactNumber}
            onChange={(e) => setProfile({ ...profile, contactNumber: e.target.value })}
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">City</label>
            <select className="form-select" value={profile.city} onChange={(e) => setProfile({ ...profile, city: e.target.value })}>
              <option value="Dhaka">Dhaka</option>
              {/* Add more cities as needed */}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">State</label>
            <select className="form-select" value={profile.state} onChange={(e) => setProfile({ ...profile, state: e.target.value })}>
              <option value="Uttara">Uttara</option>
              {/* Add more states as needed */}
            </select>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-input"
            value={profile.password}
            onChange={(e) => setProfile({ ...profile, password: e.target.value })}
          />
        </div>

        <div className="button-group">
          <button type="button" className="btn btn-cancel">
            Cancel
          </button>
          <button type="submit" className="btn btn-save">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;