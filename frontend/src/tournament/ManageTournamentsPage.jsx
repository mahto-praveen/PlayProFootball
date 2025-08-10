import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  fetchTournaments,
  publishTournament,
  unpublishTournament,
} from '../api/tournamentAPI';

const ManageTournamentsPage = () => {
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const token = useSelector((state) => state.auth.token);
  const organizationId = useSelector((state) => state.auth.organizationId);

  useEffect(() => {
    loadTournaments();
  }, [token]);

  const loadTournaments = async () => {
    try {
      setLoading(true);
      const data = await fetchTournaments(token, organizationId);
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

  const handleEdit = (id) => {
    navigate(`/edit-tournament/${id}`);
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h2 className="text-4xl font-extrabold mb-8 text-gray-900 tracking-wide">
        Manage Tournaments
      </h2>

      {loading ? (
        <p className="text-gray-600 text-lg">Loading tournaments...</p>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow-lg border border-gray-300 bg-white">
          <table className="min-w-full border-collapse table-auto text-gray-700">
            <thead className="bg-gray-100">
              <tr>
                {['Name', 'City', 'Start', 'End', 'Status', 'Actions'].map((heading) => (
                  <th
                    key={heading}
                    className="border-b border-gray-300 px-6 py-4 text-center font-semibold text-sm uppercase tracking-wider select-none"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {tournaments.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center py-8 text-gray-500 italic">
                    No tournaments found.
                  </td>
                </tr>
              )}

              {tournaments.map((tournament, idx) => (
                <tr
                  key={tournament.id}
                  className={`${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-gray-200 cursor-pointer transition-colors duration-200`}
                >
                  <td className="border px-6 py-4 text-center whitespace-nowrap font-medium">
                    {tournament.name}
                  </td>
                  <td className="border px-6 py-4 text-center whitespace-nowrap">
                    {tournament.city}
                  </td>
                  <td className="border px-6 py-4 text-center whitespace-nowrap">
                    {tournament.startDate}
                  </td>
                  <td className="border px-6 py-4 text-center whitespace-nowrap">
                    {tournament.endDate}
                  </td>
                  <td className="border px-6 py-4 text-center">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xm font-bold ${
                        tournament.published
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {tournament.published ? 'Published' : 'Unpublished'}
                    </span>
                  </td>
                  <td className="border px-6 py-4 text-center">
                    <div className="inline-flex space-x-3 justify-center">
                      {tournament.published ? (
                        <button
                          onClick={() => handleUnpublish(tournament.id)}
                          className="min-w-[100px] px-4 py-2 bg-red-500 hover:bg-red-600 focus:ring-2 focus:ring-red-300 focus:outline-none text-white font-semibold rounded-md whitespace-nowrap transition"
                          type="button"
                        >
                          Unpublish
                        </button>
                      ) : (
                        <button
                          onClick={() => handlePublish(tournament.id)}
                          className="min-w-[100px] px-4 py-2 bg-green-600 hover:bg-green-700 focus:ring-2 focus:ring-green-300 focus:outline-none text-white font-semibold rounded-md whitespace-nowrap transition"
                          type="button"
                        >
                          Publish
                        </button>
                      )}

                      <button
                        onClick={() => handleEdit(tournament.id)}
                        className="min-w-[80px] px-4 py-2 bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-300 focus:outline-none text-white font-semibold rounded-md whitespace-nowrap transition"
                        type="button"
                      >
                        Edit
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageTournamentsPage;
