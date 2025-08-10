import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MatchModal from './MatchModal';

const MatchScheduler = ({ tournamentId }) => {
  const [matches, setMatches] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState(null);

  const fetchMatches = async () => {
    const res = await axios.get(`/api/tournaments/${tournamentId}/matches`);
    setMatches(res.data);
  };

  useEffect(() => {
    debugger
    fetchMatches();
    debugger
  }, [tournamentId]);

  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Scheduled Matches</h2>
        <button className="bg-green-500 text-white px-4 py-2" onClick={() => { setSelectedMatch(null); setOpen(true); }}>Add Match</button>
      </div>

      <ul className="mt-4">
        {matches.map(m => (
          <li
            key={m.id}
            className="p-2 border flex justify-between cursor-pointer"
            onClick={() => { setSelectedMatch(m); setOpen(true); }}
          >
            {m.teamAId} vs {m.teamBId} on {new Date(m.scheduledAt).toLocaleString()} — {m.status}
          </li>
        ))}
      </ul>

      {open && (
        <MatchModal
          tournamentId={tournamentId}
          match={selectedMatch}
          onClose={() => { setOpen(false); setSelectedMatch(null); fetchMatches(); }}
        />
      )}
    </div>
  );
};

export default MatchScheduler;
