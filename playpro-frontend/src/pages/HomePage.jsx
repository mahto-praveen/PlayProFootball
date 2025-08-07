import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getTeams, deleteTeam } from '../api/api';
import TeamCard from '../components/TeamCard';

const HomePage = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      const response = await getTeams();
      setTeams(response.data);
    } catch (error) {
      console.error('Failed to fetch teams:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this team?')) {
      try {
        await deleteTeam(id);
        fetchTeams(); // Refresh list after deletion
      } catch (error) {
        console.error('Failed to delete team:', error);
      }
    }
  };

  if (loading) {
    return <div className="container mx-auto p-4 text-center">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">All Teams</h1>
        <Link to="/teams/new" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors duration-200">+ New Team</Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teams.length === 0 ? (
          <p className="col-span-full text-center text-gray-500">No teams found.</p>
        ) : (
          teams.map(team => (
            <TeamCard key={team.teamId} team={team} onDelete={handleDelete} />
          ))
        )}
      </div>
    </div>
  );
};

export default HomePage;