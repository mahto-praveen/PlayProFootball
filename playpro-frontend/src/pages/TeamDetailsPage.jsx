import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getTeamDetails } from '../api/api.jsx';

const TeamDetailsPage = () => {
  const { id } = useParams();
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDetails = useCallback(async () => {
    try {
      const response = await getTeamDetails(id);
      setTeam(response.data);
    } catch (error) {
      console.error('Failed to fetch team details:', error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchDetails();
  }, [fetchDetails]);

  if (loading) {
    return <div className="container mx-auto p-4 text-center">Loading...</div>;
  }

  if (!team) {
    return <div className="container mx-auto p-4 text-center">Team not found.</div>;
  }

  return (
    <div className="min-h-[80vh] flex items-start justify-center bg-gray-100 py-8">
      <div className="bg-white rounded-lg shadow-md p-8 max-w-2xl w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{team.teamName}</h1>
        <div className="mb-6 space-y-2">
          <p>
            <span className="font-semibold">Manager:</span> {team.managerName}
          </p>
          <p>
            <span className="font-semibold">Phone:</span> {team.phone}
          </p>
          <p>
            <span className="font-semibold">City:</span> {team.cityName}
          </p>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-4">Players</h2>
        {team.players && team.players.length > 0 ? (
          <ul className="divide-y divide-gray-200 mb-4">
            {team.players.map((player, index) => (
              <li key={index} className="py-2">
                <span className="font-medium">{player.name}</span>
                <span className="text-gray-600"> (Age: {player.age}, Position: {player.position})</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 mb-4">No players in this team.</p>
        )}

        <div className="mt-6 flex justify-end">
          <Link
            to="/teams"
            className="bg-gray-200 text-gray-800 py-2 px-4 rounded hover:bg-gray-300 font-medium"
          >
            Back to Teams
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TeamDetailsPage;
