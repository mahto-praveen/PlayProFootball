import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from './authSlice';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(login(form));
    if (result.meta.requestStatus === 'fulfilled') {
      navigate('/');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="username" onChange={handleChange} value={form.username} required placeholder="Username" className="w-full p-2 border rounded" />
        <input name="password" type="password" onChange={handleChange} value={form.password} required placeholder="Password" className="w-full p-2 border rounded" />
        <button disabled={loading} className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
}
