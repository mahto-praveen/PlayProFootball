import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector(state => state.auth);

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    phoneno: '',
    role: 3, // Default role = User
    organizationName: '',
  });

  const [validationError, setValidationError] = useState('');

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'role' ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    // Validation
    if (!formData.email.includes('@')) {
      setValidationError('Email must contain @ symbol.');
      return;
    }

    if (!/^\d{10}$/.test(formData.phoneno)) {
      setValidationError('Phone number must be exactly 10 digits.');
      return;
    }

    setValidationError('');

    const payload = {
      ...formData,
      phoneno: Number(formData.phoneno),
    };

    const res = await dispatch(register(payload));
    if (res.meta.requestStatus === 'fulfilled') {
       navigate('/login', { state: { successMessage: '🎉 Registration successful! Please log in to continue.' } });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-tr from-blue-100 to-purple-200">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-purple-700">
          Register for <span className="italic font-serif">PlayProFootball</span>
        </h2>

        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleChange}
          className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
          required
        />

        <input
          type="tel"
          name="phoneno"
          placeholder="Phone Number"
          onChange={handleChange}
          className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
          required
        />

        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full px-4 py-2 mb-6 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
        >
          <option value={2}>Organization</option>
          <option value={3}>User</option>
        </select>

        {formData.role == 2 && (
          <input
            type="text"
            name="organizationName"
            placeholder="Organization Name"
            onChange={handleChange}
            className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          />
        )}


        {validationError && (
          <p className="text-red-500 text-center text-sm mb-4">{validationError}</p>
        )}

        <button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-lg"
        >
          {loading ? 'Registering...' : 'Register'}
        </button>

        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      </form>
    </div>
  );
};

export default Register;
