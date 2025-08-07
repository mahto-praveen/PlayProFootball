import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import TeamForm from '../components/TeamForm.jsx';
import { updateTeam } from '../api/api.jsx';

const EditTeamPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleSave = async (teamData) => {
    try {
      await updateTeam(id, teamData);
      navigate('/teams');
    } catch (error) {
      console.error('Failed to update team:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Edit Team</h1>
      <TeamForm onSave={handleSave} />
    </div>
  );
};

export default EditTeamPage;