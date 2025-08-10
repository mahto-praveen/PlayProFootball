import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTournament } from '../api/tournamentAPI';
import axios from 'axios';

export default function CreateTournament() {
  // const testToken = "mytoken";
  const token = localStorage.getItem('token');
  const organizationId = localStorage.getItem('organizationId');
      console.log("Organization ID from localStorage:", organizationId);

  const navigate = useNavigate();
  
  // Form state
  const [form, setForm] = useState({
  name: '',
  description: '',
  stateId: '',
  city: '',
  startDate: '',
  endDate: '',
  type: '',
  registrationDeadline: '',
});


  // Lookup data
  const [states, setStates] = useState([]);
  const types = [
    'FIVE_VS_FIVE',
    'SEVEN_VS_SEVEN',
    'ELEVEN_VS_ELEVEN',
    'KNOCKOUT',
    'ROUND_ROBIN',
  ];

  // Load states for dropdown
  useEffect(() => {
    axios
      .get('http://localhost:8082/api/states')
      .then(res => setStates(res.data))
      .catch(err => console.error('Failed to load states', err));
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    console.log("Organization ID from localStorage:", organizationId);
    e.preventDefault();
      const payload = {
      name: form.name,
      description: form.description,
      state: { id: parseInt(form.stateId) },
      city: form.city,
      startDate: form.startDate,
      endDate: form.endDate,
      type: form.type,
      registrationDeadline: form.registrationDeadline,
      organization: organizationId ? { oid: parseInt(organizationId) } : null,  // will be replaced with actual org ID later
      };


    try {
      await createTournament(payload, localStorage.getItem('token'));
      // await createTournament(payload, token);
      navigate('/tournaments');
    } catch (err) {
      console.error('Create failed', err);
      alert('Failed to create tournament');
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-12 p-8 bg-white rounded-2xl shadow-xl">
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <span className="mr-2 text-2xl">⚽</span> New Tournament
      </h1>
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium mb-1">Tournament's Name</label>
          <input
            name="name"
            type="text"
            required
            value={form.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            name="description"
            required
            value={form.description}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2"
          />
        </div>

        {/* State & City */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">State</label>
            <select
              name="stateId"
              required
              value={form.stateId}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-2 bg-white"
            >
              <option value="">Select State</option>
              {states.map(s => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">City</label>
            <input
              name="city"
              type="text"
              required
              value={form.city}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-2"
            />
          </div>
        </div>

        {/* Dates */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Start Date</label>
            <input
              name="startDate"
              type="date"
              required
              value={form.startDate}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">End Date</label>
            <input
              name="endDate"
              type="date"
              required
              value={form.endDate}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-2"
            />
          </div>
            {/* Registration Date */}
            <div>
              <label className="block text-sm font-medium mb-1">Registration Date</label>
              <input
                name="registrationDeadline"
                type="date"
                required
                value={form.registrationDeadline}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded p-2"
              />
            </div>
        </div>

        {/* Type */}
        <div>
          <label className="block text-sm font-medium mb-1">Type</label>
          <select
            name="type"
            required
            value={form.type}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2 bg-white"
          >
            <option value="">Select Type</option>
            {types.map(t => (
              <option key={t} value={t}>{t.replace(/_/g, ' ')}</option>
            ))}
          </select>
        </div>

        {/* Actions */}
        <div className="flex gap-4 mt-6">
          <button
            type="submit"
            className="bg-purple-800 text-white px-6 py-2 rounded-lg hover:bg-purple-900"
          >
            Create
          </button>
          <button
            type="button"
            onClick={() => navigate('/tournaments')}
            className="bg-gray-300 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
