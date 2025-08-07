import React, { useState, useEffect } from 'react';
import { getCities, getTeamDetails } from '../api/api.jsx';
import { useParams } from 'react-router-dom';

const TeamForm = ({ onSave }) => {
  const { id } = useParams();
  const isEditing = !!id;

  const [team, setTeam] = useState({
    teamName: '',
    managerName: '',
    phone: '',
    cityId: '',
  });
  const [players, setPlayers] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cityResponse = await getCities();
        setCities(cityResponse.data);

        if (isEditing) {
          const teamResponse = await getTeamDetails(id);
          setTeam({
            teamName: teamResponse.data.teamName,
            managerName: teamResponse.data.managerName,
            phone: teamResponse.data.phone,
            cityId: teamResponse.data.city.cityid,
          });
          setPlayers(teamResponse.data.players || []);
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };
    fetchData();
  }, [id, isEditing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTeam({ ...team, [name]: value });
  };

  const handlePlayerChange = (index, e) => {
    const { name, value } = e.target;
    const updatedPlayers = [...players];
    updatedPlayers[index][name] = value;
    setPlayers(updatedPlayers);
  };

  const addPlayer = () => {
    setPlayers([...players, { name: '', age: '', position: '' }]);
  };

  const removePlayer = (index) => {
    setPlayers(players.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...team, players });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-8 rounded-lg shadow-md w-full"
      style={{ overflow: 'visible' }}
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        {isEditing ? "Edit Team" : "Create New Team"}
      </h2>

      {/* Team Name */}
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Team Name</label>
        <input
          type="text"
          name="teamName"
          value={team.teamName}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      {/* Manager Name */}
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Manager Name</label>
        <input
          type="text"
          name="managerName"
          value={team.managerName}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      {/* Phone */}
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Phone</label>
        <input
          type="text"
          name="phone"
          value={team.phone}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      {/* City */}
      <div className="mb-6">
        <label className="block text-gray-700 font-bold mb-2">City</label>
        <select
          name="cityId"
          value={team.cityId}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="" disabled>Select a city</option>
          {cities.map(city => (
            <option key={city.cityid} value={city.cityid}>{city.cityname}</option>
          ))}
        </select>
      </div>

      {/* Players Section */}
      <div className="mb-6 border-t pt-4">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Players</h3>
        {players.map((player, index) => (
          <div
            key={index}
            className="flex flex-wrap gap-2 mb-2 w-full"
          >
            <input
              type="text"
              name="name"
              placeholder="Player Name"
              value={player.name}
              onChange={e => handlePlayerChange(index, e)}
              className="flex-1 px-3 py-2 border rounded-md"
              required
            />
            <input
              type="number"
              name="age"
              placeholder="Age"
              value={player.age}
              onChange={e => handlePlayerChange(index, e)}
              className="flex-1 px-3 py-2 border rounded-md"
              required
              min="0"
            />
            <input
              type="text"
              name="position"
              placeholder="Position"
              value={player.position}
              onChange={e => handlePlayerChange(index, e)}
              className="flex-1 px-3 py-2 border rounded-md"
              required
            />
            <button
              type="button"
              onClick={() => removePlayer(index)}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors duration-200"
              title="Remove player"
            >
              -
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addPlayer}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors duration-200 mt-2"
        >
          + Add Player
        </button>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md font-bold hover:bg-blue-700 transition-colors duration-200"
      >
        {isEditing ? "Update Team" : "Create Team"}
      </button>
    </form>
  );
};

export default TeamForm;
