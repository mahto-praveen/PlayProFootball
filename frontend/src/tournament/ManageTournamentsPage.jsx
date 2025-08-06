import React, { useEffect, useState } from 'react';
import {
  fetchTournaments,
  publishTournament,
  unpublishTournament,
} from '../api/tournamentAPI';

const ManageTournamentsPage = () => {
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem('token');

  useEffect(() => {
    loadTournaments();
  }, []);

  const loadTournaments = async () => {
    try {
      setLoading(true);
      const data = await fetchTournaments();
      setTournaments(data);
    } catch (err) {
      console.error('Failed to fetch tournaments:', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePublish = async (id) => {
    try {
      await publishTournament(id, token);
      alert('Tournament published successfully!');
      loadTournaments();
    } catch (err) {
      console.error('Publish failed:', err);
      alert('Error publishing tournament');
    }
  };

  const handleUnpublish = async (id) => {
    try {
      await unpublishTournament(id, token);
      alert('Tournament unpublished successfully!');
      loadTournaments();
    } catch (err) {
      console.error('Unpublish failed:', err);
      alert('Error unpublishing tournament');
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Tournaments</h2>
      {loading ? (
        <p>Loading tournaments...</p>
      ) : (
        <table className="min-w-full border text-sm">
          <thead className="bg-gray-200 text-left">
            <tr>
              <th className="border px-3 py-2">Name</th>
              <th className="border px-3 py-2">City</th>
              <th className="border px-3 py-2">Start</th>
              <th className="border px-3 py-2">End</th>
              <th className="border px-3 py-2">Status</th>
              <th className="border px-3 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {tournaments.map((tournament) => (
              <tr key={tournament.id}>
                <td className="border px-3 py-2">{tournament.name}</td>
                <td className="border px-3 py-2">{tournament.city}</td>
                <td className="border px-3 py-2">{tournament.startDate}</td>
                <td className="border px-3 py-2">{tournament.endDate}</td>
                <td className="border px-3 py-2">
                  {tournament.published ? 'Published' : 'Unpublished'}
                </td>
                <td className="border px-3 py-2 space-x-2">
                  {tournament.published ? (
                    <button
                      onClick={() => handleUnpublish(tournament.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Unpublish
                    </button>
                  ) : (
                    <button
                      onClick={() => handlePublish(tournament.id)}
                      className="bg-green-600 text-white px-3 py-1 rounded"
                    >
                      Publish
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ManageTournamentsPage;
