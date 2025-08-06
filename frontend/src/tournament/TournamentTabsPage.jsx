import React, { useState } from "react";
import { useParams } from "react-router-dom";
import TeamManager from "./TeamManager";
import MatchScheduler from "./MatchScheduler";
import StandingsTable from "./StandingsTable";

const TournamentTabsPage = () => {
  const { tournamentId } = useParams();
  const [activeTab, setActiveTab] = useState("teams");

  const renderTab = () => {
    switch (activeTab) {
      case "teams":
        return <TeamManager tournamentId={tournamentId} />;
      case "matches":
        return <MatchScheduler tournamentId={tournamentId} />;
      case "standings":
        return <StandingsTable tournamentId={tournamentId} />;
      default:
        return null;
    }
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Tournament Manager</h1>

      <div className="flex justify-center space-x-4 mb-6">
        <button
          onClick={() => setActiveTab("teams")}
          className={`px-4 py-2 rounded-md ${
            activeTab === "teams" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          Teams
        </button>
        <button
          onClick={() => setActiveTab("matches")}
          className={`px-4 py-2 rounded-md ${
            activeTab === "matches" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          Matches
        </button>
        <button
          onClick={() => setActiveTab("standings")}
          className={`px-4 py-2 rounded-md ${
            activeTab === "standings" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          Standings
        </button>
      </div>

      <div>{renderTab()}</div>
    </div>
  );
};

export default TournamentTabsPage;