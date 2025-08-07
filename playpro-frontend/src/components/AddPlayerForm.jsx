import React, { useState } from 'react';
import { addPlayerToTeam } from '../api/api.jsx';

const AddPlayerForm = ({ teamId, onPlayerAdded, onCancel }) => {
  const [player, setPlayer] = useState({
    name: '',
    age: '',
    position: '',
    teamId: teamId,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPlayer({ ...player, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addPlayerToTeam(player);
      onPlayerAdded();
    } catch (error) {
      console.error('Failed to add player:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md max-w-sm mx-auto mt-4">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Add Player</h3>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Player Name</label>
        <input
          type="text"
          name="name"
          value={player.name}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Age</label>
        <input
          type="number"
          name="age"
          value={player.age}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Position</label>
        <input
          type="text"
          name="position"
          value={player.position}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Player
        </button>
      </div>
    </form>
  );
};

export default AddPlayerForm;