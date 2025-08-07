import React from 'react';
import { useNavigate } from 'react-router-dom';
import TeamForm from '../components/TeamForm.jsx';
import { createTeam } from '../api/api.jsx';

const CreateTeamPage = () => {
  const navigate = useNavigate();

  const handleSave = async (teamData) => {
    try {
      await createTeam(teamData);
      navigate('/teams');
    } catch (error) {
      console.error('Failed to create team:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Create New Team</h1>
      <TeamForm onSave={handleSave} />
    </div>
  );
};

export default CreateTeamPage;