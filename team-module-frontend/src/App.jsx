import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import HomePage from './pages/HomePage.jsx';
import TeamDetailsPage from './pages/TeamDetailsPage.jsx';
import CreateTeamPage from './pages/CreateTeamPage.jsx';
import EditTeamPage from './pages/EditTeamPage.jsx';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Header />
        <main className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/teams" element={<HomePage />} />
            <Route path="/teams/new" element={<CreateTeamPage />} />
            <Route path="/teams/:id" element={<TeamDetailsPage />} />
            <Route path="/teams/:id/edit" element={<EditTeamPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;