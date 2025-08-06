import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  const token = useSelector(state => state.auth.token);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // If no token, send back to login
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await fetch('http://localhost:8081/api/auth/profile', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        if (!res.ok) {
          if (res.status === 401) {
            // token invalid or expired
            navigate('/login');
            return;
          }
          throw new Error(`Error ${res.status}`);
        }
        const data = await res.json();
        setUser(data);
      } catch (err) {
        setError('Failed to load profile.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading your profile…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="bg-white max-w-xl mx-auto shadow-lg rounded-xl p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Profile Details</h1>
        
        <div className="space-y-4">
          <div>
            <label className="text-gray-600">Username</label>
            <p className="text-lg font-medium">{user.username}</p>
          </div>

          <div>
            <label className="text-gray-600">Email</label>
            <p className="text-lg font-medium">{user.email}</p>
          </div>

          <div>
            <label className="text-gray-600">Phone Number</label>
            <p className="text-lg font-medium">{user.phoneno}</p>
          </div>

          <div>
            <label className="text-gray-600">Role</label>
            <p className="text-lg font-medium">
              {user.role === 2 ? 'Organization' : 'User'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
