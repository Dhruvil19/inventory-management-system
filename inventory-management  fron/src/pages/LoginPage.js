import React, { useState } from 'react';
import API from '../services/api'; // Assuming you have an API setup to handle requests
import { useNavigate } from 'react-router-dom'; // For navigation after login
import './Login.css'; // Import the CSS file here

const Login = () => {
  const [email, setEmail] = useState(''); // Use email state instead of username
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // For redirecting after successful login

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Send API request with email and password
      const response = await API.post('/auth/login', { email, password });

      // Extract token and role from the response
      const { token, role } = response.data;

      // Save the token and role to localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);

      // Redirect user to the dashboard (or any other protected route)
      navigate('/dashboard'); // This assumes you have a Dashboard component to redirect to
    } catch (error) {
      // Handle login errors (invalid credentials or server issues)
      setError('Invalid credentials or server error');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
