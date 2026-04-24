import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userAPI } from '../services/api';

export default function Dashboard() {
  const [userData, setUserData] = useState(null);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  const [statusMsg, setStatusMsg] = useState('');
  const [isError, setIsError] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editFormData, setEditFormData] = useState({ name: '', email: '' });
  const [isUpdating, setIsUpdating] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        const tokenExists = localStorage.getItem('token');
        if (!tokenExists) {
          navigate('/login');
          return;
        }

        const apiResponse = await userAPI.getProfile();
        console.log('User profile loaded:', apiResponse.data.user);
        
        setUserData(apiResponse.data.user);
        setEditFormData({
          name: apiResponse.data.user.name,
          email: apiResponse.data.user.email,
        });
      } catch (err) {
        console.error('Error loading profile:', err);
        setStatusMsg('Failed to load your profile');
        setIsError(true);
      } finally {
        setIsLoadingProfile(false);
      }
    };

    loadUserProfile();
  }, [navigate]);

  const handleLogoutClick = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setStatusMsg('Logged out successfully!');
    setIsError(false);
    
    setTimeout(() => {
      navigate('/login');
    }, 800);
  };

  const handleEditModeToggle = () => {
    setIsEditMode(!isEditMode);
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateProfile = async () => {
    if (!editFormData.name.trim() || !editFormData.email.trim()) {
      setStatusMsg('Name and email cannot be empty');
      setIsError(true);
      return;
    }

    setIsUpdating(true);
    setStatusMsg('');
    setIsError(false);

    try {
      const apiResponse = await userAPI.updateProfile(editFormData);
      setUserData(apiResponse.data.user);
      setStatusMsg('Profile updated successfully!');
      setIsError(false);
      setIsEditMode(false);
      console.log('Profile updated:', apiResponse.data.user);
    } catch (err) {
      console.error('Error updating profile:', err);
      setStatusMsg(err.response?.data?.message || 'Could not update profile');
      setIsError(true);
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoadingProfile) {
    return (
      <div className="loading">
        <span className="spinner"></span>
        <p className="loading-text">Loading your profile...</p>
      </div>
    );
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div>
          <h1>Dashboard</h1>
          <p className="subtitle">Welcome back, {userData?.name}!</p>
        </div>
        <button className="btn btn-logout" onClick={handleLogoutClick}>
          Logout
        </button>
      </div>

      {statusMsg && (
        <div className={`message ${isError ? 'error' : 'success'}`}>
          {statusMsg}
        </div>
      )}

      {userData && (
        <div className="profile-card">
          <div className="card-header">
            <h2>Your Profile</h2>
            {!isEditMode && (
              <button className="btn btn-secondary-small" onClick={handleEditModeToggle}>
                Edit Profile
              </button>
            )}
          </div>

          {!isEditMode ? (
            <div className="profile-info">
              <div className="info-row">
                <span className="info-label">Name:</span>
                <span className="info-value">{userData.name}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Email:</span>
                <span className="info-value">{userData.email}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Member Since:</span>
                <span className="info-value">{formatDate(userData.memberSince)}</span>
              </div>
            </div>
          ) : (
            <div className="edit-form">
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={editFormData.name}
                  onChange={handleEditInputChange}
                  placeholder="Your name"
                  disabled={isUpdating}
                />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={editFormData.email}
                  onChange={handleEditInputChange}
                  placeholder="your@email.com"
                  disabled={isUpdating}
                />
              </div>
              <div className="edit-actions">
                <button
                  className="btn btn-primary"
                  onClick={handleUpdateProfile}
                  disabled={isUpdating}
                >
                  {isUpdating ? 'Saving...' : 'Save Changes'}
                </button>
                <button
                  className="btn btn-cancel"
                  onClick={handleEditModeToggle}
                  disabled={isUpdating}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="account-stats">
        <div className="stat-card">
          <h3>Account Status</h3>
          <p className="stat-value">✓ Active</p>
        </div>
        <div className="stat-card">
          <h3>Email Verified</h3>
          <p className="stat-value">
            {userData.emailVerified ? '✓ Yes' : '✗ No'}
          </p>
        </div>
        <div className="stat-card">
          <h3>Last Login</h3>
          <p className="stat-value">Now</p>
        </div>
      </div>

      {!userData.emailVerified && (
        <div className="verify-email-card">
          <p>Your email is not verified yet. Verify now to secure your account.</p>
          <button className="btn btn-primary" onClick={async () => {
            try {
              const response = await userAPI.verifyEmail();
              setUserData(response.data.user);
              setStatusMsg('Email verified successfully');
              setIsError(false);
            } catch (err) {
              console.error('Error verifying email:', err);
              setStatusMsg(err.response?.data?.message || 'Could not verify email');
              setIsError(true);
            }
          }}>
            Verify Email
          </button>
        </div>
      )}

      <div className="tips-section">
        <h3>Quick Tips</h3>
        <ul>
          <li>Verify your email after login to keep your account secure.</li>
          <li>Update your profile details so your internship submission stays accurate.</li>
          <li>Remember to logout when using shared or public devices.</li>
        </ul>
      </div>
    </div>
  );
}
