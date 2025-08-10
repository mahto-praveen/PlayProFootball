import React, { useState } from 'react';
import TeamManager from './TeamManager';
import MatchScheduler from './MatchScheduler';
import StandingsTable from './StandingsTable';

const TournamentFixturesPage = ({ tournamentId }) => {
  const [tab, setTab] = useState(0);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Tournament Fixtures</h1>
      <div className="flex gap-2 mb-4">
        <button className={`px-4 py-2 rounded ${tab === 0 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`} onClick={() => setTab(0)}>Teams</button>
        <button className={`px-4 py-2 rounded ${tab === 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`} onClick={() => setTab(1)}>Matches</button>
        <button className={`px-4 py-2 rounded ${tab === 2 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`} onClick={() => setTab(2)}>Standings</button>
      </div>
      <div>
        {tab === 0 && <TeamManager tournamentId={tournamentId} />}
        {tab === 1 && <MatchScheduler tournamentId={tournamentId} />}
        {tab === 2 && <StandingsTable tournamentId={tournamentId} />}
      </div>
    </div>
  );
};

export default TournamentFixturesPage;