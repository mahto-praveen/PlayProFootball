import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TeamManager = ({ tournamentId }) => {
  const [teams, setTeams] = useState([]);
  const [newTeam, setNewTeam] = useState({ name: '', managerName: '', contactNo: '' });

  const fetchTeams = async () => {
    const res = await axios.get(`/api/tournaments/${tournamentId}/teams`);
    console.log("API response for teams:", res.data);
    setTeams(res.data.teams);
  };

  const addTeam = async () => {
    await axios.post(`/api/tournaments/${tournamentId}/teams`, newTeam);
    setNewTeam({ name: '', managerName: '', contactNo: '' });
    fetchTeams();
  };

  const deleteTeam = async (teamId) => {
    await axios.delete(`/api/tournaments/${tournamentId}/teams/${teamId}`);
    fetchTeams();
  };

  useEffect(() => {
    fetchTeams();
  }, [tournamentId]);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Manage Teams</h2>
      <div className="flex gap-2 mb-2">
        <input
          className="border p-2"
          placeholder="Team Name"
          value={newTeam.name}
          onChange={e => setNewTeam({ ...newTeam, name: e.target.value })}
        />
        <input
          className="border p-2"
          placeholder="Manager"
          value={newTeam.managerName}
          onChange={e => setNewTeam({ ...newTeam, managerName: e.target.value })}
        />
        <input
          className="border p-2"
          placeholder="Contact"
          value={newTeam.contactNo}
          onChange={e => setNewTeam({ ...newTeam, contactNo: e.target.value })}
        />
        <button className="bg-blue-500 text-white px-4 py-2" onClick={addTeam}>Add</button>
      </div>
      <ul>
        {teams.map(team => (
          <li key={team.id} className="flex justify-between border-b py-1">
            <span>{team.name} - {team.managerName}</span>
            <button className="text-red-500" onClick={() => deleteTeam(team.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeamManager;