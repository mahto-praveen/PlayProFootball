import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

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
    registrationDate: '',
  });
  const [states, setStates] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    // 1) load tournament
    axios
      .get(`http://localhost:8082/api/tournaments/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const t = res.data;
        setForm({
          name: t.name,
          description: t.description,
          stateId: t.stateId,
          city: t.city,
          startDate: t.startDate,
          endDate: t.endDate,
          type: t.type,
          registrationDate: t.registrationDate,
        });
      });

    // 2) load states
    axios
      .get('http://localhost:8082/api/states')
      .then((res) => setStates(res.data));
  }, [id, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // pull orgId from JWT to attach
    const payload = {
      ...form,
      state: { id: parseInt(form.stateId) },
      organizationId: jwtDecode(token).organizationId,
    };

    await axios.put(
      `http://localhost:8082/api/tournaments/${id}`,
      payload,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    navigate('/manage-tournaments');
  };

  return (
    <div className="max-w-2xl mx-auto mt-12 p-8 bg-white rounded-2xl shadow-xl">
      <h1 className="text-3xl font-bold mb-6">Edit Tournament</h1>
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Same inputs as your Create form */}
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
        {/* … repeat for description, city, dates, type, registrationDate … */}
        {/* State */}
        <div>
          <label className="block text-sm font-medium mb-1">State</label>
          <select
            name="stateId"
            value={form.stateId}
            onChange={handleChange}
            className="w-full border rounded p-2"
          >
            <option value="">Select</option>
            {states.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        {/* Registration Date */}
        <div>
          <label className="block text-sm font-medium mb-1">Registration Deadline</label>
          <input
            name="registrationDate"
            type="date"
            required
            value={form.registrationDate}
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
