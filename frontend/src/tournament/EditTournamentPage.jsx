import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function EditTournamentPage() {
  const { id } = useParams();
  const navigate = useNavigate();

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

  const [states, setStates] = useState([]);

  const types = [
    'FIVE_VS_FIVE',
    'SEVEN_VS_SEVEN',
    'ELEVEN_VS_ELEVEN',
    'KNOCKOUT',
    'ROUND_ROBIN',
  ];

  const token = localStorage.getItem('token');

  useEffect(() => {
    // Load tournament details
    axios
      .get(`http://localhost:8082/api/tournaments/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const t = res.data;
        setForm({
          name: t.name || '',
          description: t.description || '',
          stateId: t.stateId || '',
          city: t.city || '',
          startDate: t.startDate || '',
          endDate: t.endDate || '',
          type: t.type || '',
          registrationDeadline: t.registrationDeadline || '',
        });
      })
      .catch((err) => {
        console.error('Failed to load tournament:', err);
      });

    // Load states lookup data (replace with your actual API)
    axios
      .get('http://localhost:8082/api/states', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setStates(res.data);
      })
      .catch((err) => {
        console.error('Failed to load states:', err);
      });
  }, [id, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare payload matching expected backend format
    const payload = {
      name: form.name,
      description: form.description,
      city: form.city,
      startDate: form.startDate,
      endDate: form.endDate,
      type: form.type,
      registrationDeadline: form.registrationDeadline,
    };

    try {
      await axios.put(
        `http://localhost:8082/api/tournaments/${id}`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate('/manage-tournaments');
    } catch (error) {
      console.error('Failed to update tournament:', error);
      alert('Update failed. Please try again.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-12 p-8 bg-white rounded-2xl shadow-xl">
      <h1 className="text-3xl font-bold mb-6">Edit Tournament</h1>
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            name="name"
            type="text"
            required
            value={form.name}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full border rounded p-2"
            rows={4}
          />
        </div>

        {/* State */}
        <div>
          <label className="block text-sm font-medium mb-1">State</label>
          <select
            name="stateId"
            value={form.stateId}
            onChange={handleChange}
            className="w-full border rounded p-2"
          >
            <option value="">Select State</option>
            {states.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        {/* City */}
        <div>
          <label className="block text-sm font-medium mb-1">City</label>
          <input
            name="city"
            type="text"
            value={form.city}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>

        {/* Start Date */}
        <div>
          <label className="block text-sm font-medium mb-1">Start Date</label>
          <input
            name="startDate"
            type="date"
            required
            value={form.startDate}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>

        {/* End Date */}
        <div>
          <label className="block text-sm font-medium mb-1">End Date</label>
          <input
            name="endDate"
            type="date"
            required
            value={form.endDate}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>

        {/* Type */}
        <div>
          <label className="block text-sm font-medium mb-1">Type</label>
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          >
            <option value="">Select Type</option>
            {types.map((type) => (
              <option key={type} value={type}>
                {type.replace(/_/g, ' ')}
              </option>
            ))}
          </select>
        </div>

        {/* Registration Deadline */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Registration Deadline
          </label>
          <input
            name="registrationDeadline"
            type="date"
            required
            value={form.registrationDeadline}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>

        {/* Actions */}
        <div className="flex gap-4 mt-6">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg"
          >
            Save Changes
          </button>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="bg-gray-300 px-6 py-2 rounded-lg"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
