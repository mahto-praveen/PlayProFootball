import React, { useState, useEffect } from 'react';
import TeamManager from './TeamManager';
import MatchScheduler from './MatchScheduler';
import StandingsTable from './StandingsTable';

const TournamentFixturesPage = ({ tournamentId }) => {
  const [tab, setTab] = useState(0);

  const handleChange = (_, newValue) => setTab(newValue);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Tournament Fixtures</h1>
      <Tabs value={tab} onChange={handleChange}>
        <Tab label="Teams" />
        <Tab label="Matches" />
        <Tab label="Standings" />
      </Tabs>

      <div className="mt-4">
        {tab === 0 && <TeamManager tournamentId={tournamentId} />}
        {tab === 1 && <MatchScheduler tournamentId={tournamentId} />}
        {tab === 2 && <StandingsTable tournamentId={tournamentId} />}
      </div>
    </div>
  );
};

export default TournamentFixturesPage;
