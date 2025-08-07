import React from 'react';
import { Link } from 'react-router-dom';

const TeamCard = ({ team, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-between">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">{team.teamName}</h2>
        <p className="mt-2 text-gray-600">
          <span className="font-medium">Manager:</span> {team.managerName}
        </p>
        <p className="text-gray-600">
          <span className="font-medium">City:</span> {team.cityName}
        </p>
        <p className="text-gray-600">
          <span className="font-medium">Players:</span> {team.playerCount}
        </p>
      </div>
      <div className="mt-4 flex space-x-2">
        <Link to={`/teams/${team.teamId}`} className="flex-1 text-center bg-gray-200 text-gray-800 py-2 px-4 rounded hover:bg-gray-300 transition-colors duration-200">
          View
        </Link>
        <Link to={`/teams/${team.teamId}/edit`} className="flex-1 text-center bg-yellow-400 text-yellow-900 py-2 px-4 rounded hover:bg-yellow-500 transition-colors duration-200">
          Edit
        </Link>
        <button onClick={() => onDelete(team.teamId)} className="flex-1 text-center bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition-colors duration-200">
          Delete
        </button>
      </div>
    </div>
  );
};

export default TeamCard;