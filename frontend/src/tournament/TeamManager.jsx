import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TeamManager = ({ tournamentId }) => {
  const [teams, setTeams] = useState([]);
  const [newTeam, setNewTeam] = useState({ name: '', manager: '', contact: '' });

  const fetchTeams = async () => {
    const res = await axios.get(`/api/tournaments/${tournamentId}/teams`);
    setTeams(res.data);
  };

  const addTeam = async () => {
    await axios.post(`/api/tournaments/${tournamentId}/teams`, newTeam);
    setNewTeam({ name: '', manager: '', contact: '' });
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
      <h2 className="text-xl font-semibold">Manage Teams</h2>
      <input
        className="border p-2 m-1"
        placeholder="Team Name"
        value={newTeam.name}
        onChange={(e) => setNewTeam({ ...newTeam, name: e.target.value })}
      />
      <input
        className="border p-2 m-1"
        placeholder="Manager"
        value={newTeam.manager}
        onChange={(e) => setNewTeam({ ...newTeam, manager: e.target.value })}
      />
      <input
        className="border p-2 m-1"
        placeholder="Contact"
        value={newTeam.contact}
        onChange={(e) => setNewTeam({ ...newTeam, contact: e.target.value })}
      />
      <button className="bg-blue-500 text-white px-4 py-2 ml-2" onClick={addTeam}>Add</button>
      <ul className="mt-4">
        {teams.map(team => (
          <li key={team.id} className="flex justify-between p-2 border">
            <span>{team.name} - {team.manager}</span>
            <button className="text-red-500" onClick={() => deleteTeam(team.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeamManager;