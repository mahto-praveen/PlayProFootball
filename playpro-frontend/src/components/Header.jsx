import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-gray-800 text-white p-4 shadow-md">
      <nav className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">PlayPro League</Link>
        <ul className="flex space-x-4">
          <li><Link to="/teams" className="hover:text-gray-400">Teams</Link></li>
          <li><Link to="/teams/new" className="hover:text-gray-400">+ New Team</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;