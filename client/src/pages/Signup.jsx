import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authAPI } from '../services/api';

export default function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
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

    // client-side validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.password) {
      setStatusMsg('All fields are required');
      setIsError(true);
      return;
    }

    if (formData.password.length < 6) {
      setStatusMsg('Password must be at least 6 characters');
      setIsError(true);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setStatusMsg('Passwords do not match');
      setIsError(true);
      return;
    }

    setIsLoading(true);

    try {
      const apiResponse = await authAPI.signup(formData);
      
      // save token and user info
      localStorage.setItem('token', apiResponse.data.token);
      localStorage.setItem('user', JSON.stringify(apiResponse.data.user));

      setStatusMsg('Account created! Redirecting...');
      setIsError(false);

      // go to dashboard after 1 second
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Something went wrong during signup';
      setStatusMsg(errorMsg);
      setIsError(true);
      console.error('Signup error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <h2 className="auth-title">Create Account</h2>

      {statusMsg && (
        <div className={`message ${isError ? 'error' : 'success'}`}>
          {statusMsg}
        </div>
      )}

      <form onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Your name here"
            disabled={isLoading}
          />
        </div>

        <div className="form-group">
          <label>Email Address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="you@example.com"
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
            placeholder="Min 6 characters"
            disabled={isLoading}
          />
        </div>

        <div className="form-group">
          <label>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            placeholder="Re-enter password"
            disabled={isLoading}
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          {isLoading ? <span className="spinner"></span> : 'Create Account'}
        </button>
      </form>

      <div className="link">
        Already have an account? <Link to="/login">Sign in here</Link>
      </div>
    </div>
  );
}
