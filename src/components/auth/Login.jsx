import React, { useState } from 'react';
import './Login.css';
import Header from './home/pageComponents/Header';
import Footer from './home/pageComponents/Footer';

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

 
  const handleChange = (event) => {

  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });
      const result = await response.json();
      if (result.success) {
        dispatch(loginSuccess({ userId: result.userId }));
        alert(`Login successful! User ID: ${result.userId}`);
        navigate('/'); 
      } else {
        alert(result.message || 'Login failed!');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred.');
    }
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  return (
    <div className="login-container">
      <Header />
      <div className="login-form-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={credentials.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={credentials.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Login</button>
        </form>
        <div className="register-message">
          <p>
            Don't have an account?{' '}
            <button onClick={handleRegisterClick} className="register-btn">
              Register here
            </button>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
