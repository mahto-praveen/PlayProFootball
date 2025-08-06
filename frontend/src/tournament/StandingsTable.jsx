import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StandingsTable = ({ tournamentId }) => {
  const [standings, setStandings] = useState([]);

  useEffect(() => {
    axios.get(`/api/tournaments/${tournamentId}/standings`).then(res => setStandings(res.data));
  }, [tournamentId]);

  return (
    <div>
      <h2 className="text-xl font-semibold">Standings</h2>
      <table className="table-auto w-full mt-4 border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Team</th>
            <th className="p-2 border">Played</th>
            <th className="p-2 border">Wins</th>
            <th className="p-2 border">Losses</th>
            <th className="p-2 border">Points</th>
          </tr>
        </thead>
        <tbody>
          {standings.map((s, index) => (
            <tr key={index}>
              <td className="p-2 border">{s.teamName}</td>
              <td className="p-2 border">{s.played}</td>
              <td className="p-2 border">{s.wins}</td>
              <td className="p-2 border">{s.losses}</td>
              <td className="p-2 border">{s.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StandingsTable;