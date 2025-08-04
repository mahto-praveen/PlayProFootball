import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Or use Redux action if using
    navigate('/login');
  };

  return (
    <nav className="bg-gray-800 text-white px-6 py-4 shadow-md">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">
          <Link to="/dashboard" className="hover:text-yellow-300">PlayPro</Link>
        </h1>

        <div className="space-x-4">
          <Link to="/dashboard" className="hover:text-yellow-300">Dashboard</Link>
          <Link to="/profile" className="hover:text-yellow-300">Profile</Link>
          <Link to="/tournaments" className="hover:text-yellow-300">Tournaments</Link>
          <Link to="/create-tournament" className="text-white bg-green-600 px-3 py-1 rounded hover:bg-green-700">
           + New Tournament
          </Link>
          <button onClick={handleLogout} className="hover:text-red-400">Logout</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
