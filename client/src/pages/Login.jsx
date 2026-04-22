import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authAPI } from '../services/api';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [statusMsg, setStatusMsg] = useState('');
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setStatusMsg('');
    setIsError(false);

    if (!formData.email.trim() || !formData.password) {
      setStatusMsg('Please enter your email and password');
      setIsError(true);
      return;
    }

    setIsLoading(true);

    try {
      const apiResponse = await authAPI.login(formData);

      // save token and user info
      localStorage.setItem('token', apiResponse.data.token);
      localStorage.setItem('user', JSON.stringify(apiResponse.data.user));

      setStatusMsg('Login successful! Redirecting...');
      setIsError(false);

      // go to dashboard after 1 second
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Login failed. Try again.';
      setStatusMsg(errorMsg);
      setIsError(true);
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <h2 className="auth-title">Welcome Back</h2>

      {statusMsg && (
        <div className={`message ${isError ? 'error' : 'success'}`}>
          {statusMsg}
        </div>
      )}

      <form onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label>Email Address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="your@email.com"
            disabled={isLoading}
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Enter password"
            disabled={isLoading}
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          {isLoading ? <span className="spinner"></span> : 'Sign In'}
        </button>
      </form>

      <div className="link">
        Don't have an account? <Link to="/signup">Create one here</Link>
      </div>
    </div>
  );
}
