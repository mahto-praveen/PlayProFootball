import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MatchModal = ({ match, tournamentId, onClose }) => {
  const [formData, setFormData] = useState({ teamAId: '', teamBId: '', date: '', scoreA: '', scoreB: '' });
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    axios.get(`/api/tournaments/${tournamentId}/teams`).then(res => setTeams(res.data));
    if (match) {
      setFormData(match);
    }
  }, [match]);

  const saveMatch = async () => {
    if (match?.id) {
      await axios.put(`/api/matches/${match.id}`, formData);
    } else {
      await axios.post(`/api/tournaments/${tournamentId}/matches`, formData);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded w-[400px]">
        <h3 className="text-lg font-bold mb-2">{match ? 'Edit Match' : 'Add Match'}</h3>
        <select className="border p-2 w-full mb-2" value={formData.teamAId} onChange={e => setFormData({ ...formData, teamAId: e.target.value })}>
          <option value="">Select Team A</option>
          {teams.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
        </select>
        <select className="border p-2 w-full mb-2" value={formData.teamBId} onChange={e => setFormData({ ...formData, teamBId: e.target.value })}>
          <option value="">Select Team B</option>
          {teams.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
        </select>
        <input className="border p-2 w-full mb-2" type="date" value={formData.date} onChange={e => setFormData({ ...formData, date: e.target.value })} />
        <input className="border p-2 w-full mb-2" type="number" placeholder="Score A" value={formData.scoreA} onChange={e => setFormData({ ...formData, scoreA: e.target.value })} />
        <input className="border p-2 w-full mb-2" type="number" placeholder="Score B" value={formData.scoreB} onChange={e => setFormData({ ...formData, scoreB: e.target.value })} />
        <div className="flex justify-end gap-2">
          <button className="bg-gray-300 px-4 py-2" onClick={onClose}>Cancel</button>
          <button className="bg-blue-600 text-white px-4 py-2" onClick={saveMatch}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default MatchModal;