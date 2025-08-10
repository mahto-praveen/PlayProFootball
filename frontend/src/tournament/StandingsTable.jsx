import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StandingsTable = ({ tournamentId }) => {
  const [standings, setStandings] = useState([]);

  useEffect(() => {
    axios.get(`/api/tournaments/${tournamentId}/standings`).then(res => setStandings(res.data));
  }, [tournamentId]);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Standings</h2>
      <table className="table-auto w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Team</th>
            <th className="p-2 border">Played</th>
            <th className="p-2 border">Won</th>
            <th className="p-2 border">Drawn</th>
            <th className="p-2 border">Lost</th>
            <th className="p-2 border">GF</th>
            <th className="p-2 border">GA</th>
            <th className="p-2 border">Points</th>
          </tr>
        </thead>
        <tbody>
          {standings.map((s, idx) => (
            <tr key={idx}>
              <td className="p-2 border">{s.teamName}</td>
              <td className="p-2 border">{s.played}</td>
              <td className="p-2 border">{s.won}</td>
              <td className="p-2 border">{s.drawn}</td>
              <td className="p-2 border">{s.lost}</td>
              <td className="p-2 border">{s.goalsFor}</td>
              <td className="p-2 border">{s.goalsAgainst}</td>
              <td className="p-2 border">{s.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StandingsTable;