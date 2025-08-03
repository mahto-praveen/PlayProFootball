import React, { useState } from 'react';
import { createTournament } from '../api/tournamentAPI';

const CreateTournamentForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    state: '',
    city: '',
    startDate: '',
    endDate: '',
    type: '',
  });

  const token = localStorage.getItem('token'); // assuming token is stored here

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createTournament(formData, token);
      alert('Tournament created!');
      setFormData({ title: '', state: '', city: '', startDate: '', endDate: '', type: '' });
    } catch (err) {
      console.error(err);
      alert('Failed to create tournament.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-gray-800 text-white rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-6">➕ Create New Tournament</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input name="title" type="text" placeholder="Tournament Title" value={formData.title} onChange={handleChange} className="p-2 rounded text-black" required />

        <input name="state" type="text" placeholder="State" value={formData.state} onChange={handleChange} className="p-2 rounded text-black" required />

        <input name="city" type="text" placeholder="City" value={formData.city} onChange={handleChange} className="p-2 rounded text-black" required />

        <input name="startDate" type="date" value={formData.startDate} onChange={handleChange} className="p-2 rounded text-black" required />

        <input name="endDate" type="date" value={formData.endDate} onChange={handleChange} className="p-2 rounded text-black" required />

        <select name="type" value={formData.type} onChange={handleChange} className="p-2 rounded text-black" required>
          <option value="">Select Type</option>
          <option value="Knockout">Knockout</option>
          <option value="League">League</option>
        </select>

        <button type="submit" className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg">
          Create Tournament
        </button>
      </form>
    </div>
  );
};

export default CreateTournamentForm;
