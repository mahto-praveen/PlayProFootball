// src/pages/Dashboard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome to Your Dashboard</h1>
      <p className="text-gray-600 mb-6">This is where you can view and manage your tournaments, profile, and more.</p>

      <div className="grid gap-4 md:grid-cols-2">
        <Link
          to="/profile"
          className="block bg-white shadow-md rounded-xl p-6 hover:bg-blue-50 transition"
        >
          <h2 className="text-xl font-semibold text-blue-700">Go to Profile</h2>
          <p className="text-gray-600 mt-2">View and update your personal information.</p>
        </Link>

        <Link
          to="/tournaments"
          className="block bg-white shadow-md rounded-xl p-6 hover:bg-green-50 transition"
        >
          <h2 className="text-xl font-semibold text-green-700">View Tournaments</h2>
          <p className="text-gray-600 mt-2">See all ongoing and past tournaments.</p>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
