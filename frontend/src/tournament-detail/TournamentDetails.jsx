import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const TournamentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const role = parseInt(localStorage.getItem("role"), 10);
  const token = localStorage.getItem("token");

  const [tournament, setTournament] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("overview");
  const [fixtures, setFixtures] = useState([]);
  const [standings, setStandings] = useState([]);
  const [teams, setTeams] = useState([]);
  const [teamMap, setTeamMap] = useState({}); // mapping for quick name lookup

  useEffect(() => {
    fetchTournament();
    fetchTeams(); // always fetch teams so results/standings can resolve names
  }, [id]);

  const fetchTournament = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8082/api/tournaments/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTournament(res.data);
    } catch (err) {
      setError("Failed to load tournament");
    } finally {
      setLoading(false);
    }
  };

  const fetchFixtures = async () => {
    try {
      const res = await axios.get(
        `https://localhost:7006/api/tournaments/${id}/matches`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setFixtures(res.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchStandings = async () => {
    try {
      const res = await axios.get(
        `https://localhost:7006/api/tournaments/${id}/standings`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setStandings(res.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchTeams = async () => {
    try {
      const res = await axios.get(
        `https://localhost:7006/api/tournaments/${id}/teams`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTeams(res.data || []);
      // create a quick lookup table for teamId -> teamName
      const map = {};
      res.data.forEach((team) => {
        map[team.id] = team.name;
      });
      setTeamMap(map);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (activeTab === "fixtures" || activeTab === "results") fetchFixtures();
    if (activeTab === "standings") fetchStandings();
  }, [activeTab]);

  if (loading) return <div className="p-10 text-white">Loading...</div>;
  if (error) return <div className="p-10 text-red-500">{error}</div>;
  if (!tournament) return null;

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="space-y-4">
            <h1 className="text-4xl font-bold">{tournament.name}</h1>
            <p className="text-lg">
              📍 {tournament.city}, {tournament.stateName}
            </p>
            <p className="text-md">
              🗓️ {new Date(tournament.startDate).toDateString()} →{" "}
              {new Date(tournament.endDate).toDateString()}
            </p>
            <p className="text-md text-gray-300">{tournament.description}</p>
          </div>
        );

      case "fixtures":
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">📅 Fixtures</h2>
      {fixtures.length === 0 ? (
        <p className="text-gray-400">No fixtures yet.</p>
      ) : (
        <div className="grid gap-4">
          {fixtures.map((match) => {
            const statusColors = {
              Completed: "bg-green-600",
              Scheduled: "bg-yellow-500",
              InProgress: "bg-blue-500",
              Cancelled: "bg-red-500"
            };
            const statusClass =
              statusColors[match.status] || "bg-gray-500";

            return (
              <div
                key={match.id}
                className="bg-gray-800 p-4 rounded-lg shadow-lg flex flex-col items-center"
              >
                <div className="flex items-center justify-between w-full">
                  <span className="text-lg font-bold">
                    {teamMap[match.teamAId] || match.teamAId}
                  </span>
                  <span className="text-gray-400 font-semibold">VS</span>
                  <span className="text-lg font-bold">
                    {teamMap[match.teamBId] || match.teamBId}
                  </span>
                </div>

                <div className="mt-2 text-gray-300 text-sm">
                  🗓 {new Date(match.scheduledAt).toLocaleString()}
                </div>

                <div className={`mt-3 px-3 py-1 rounded-full text-sm font-semibold text-white ${statusClass}`}>
                  {match.status}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );

     case "results":
  const results = fixtures.filter(
    (m) => m.status?.toLowerCase() === "completed"
  );
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">🏆 Results</h2>
      {results.length === 0 ? (
        <p className="text-gray-400">No results yet.</p>
      ) : (
        <div className="grid gap-4">
          {results.map((match) => {
            const winnerId = match.winnerTeamId;
            return (
              <div
                key={match.id}
                className="bg-gray-800 p-4 rounded-lg shadow-lg flex flex-col items-center"
              >
                {/* Teams & Scores */}
                <div className="flex items-center justify-between w-full">
                  <div
                    className={`flex flex-col items-center w-1/3 ${
                      winnerId === match.teamAId ? "text-green-400 font-bold" : "text-gray-300"
                    }`}
                  >
                    <span className="text-lg">{teamMap[match.teamAId] || match.teamAId}</span>
                    <span className="mt-1 px-3 py-1 bg-gray-700 rounded-lg text-xl font-semibold">
                      {match.scoreA}
                    </span>
                  </div>

                  <span className="text-gray-400 font-semibold">VS</span>

                  <div
                    className={`flex flex-col items-center w-1/3 ${
                      winnerId === match.teamBId ? "text-green-400 font-bold" : "text-gray-300"
                    }`}
                  >
                    <span className="text-lg">{teamMap[match.teamBId] || match.teamBId}</span>
                    <span className="mt-1 px-3 py-1 bg-gray-700 rounded-lg text-xl font-semibold">
                      {match.scoreB}
                    </span>
                  </div>
                </div>

                {/* Winner */}
                <div className="mt-3 px-4 py-1 bg-green-600 text-white rounded-full text-sm font-semibold">
                  Winner: {teamMap[winnerId] || winnerId}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );

     case "standings":
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">📊 Standings</h2>
      {standings.length === 0 ? (
        <p className="text-gray-400">No standings available.</p>
      ) : (
        <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-700">
          <table className="w-full text-sm text-gray-300">
            <thead className="bg-gray-900 text-white">
              <tr>
                <th className="p-3 text-left">#</th>
                <th className="p-3 text-left">Team</th>
                <th className="p-3">Played</th>
                <th className="p-3">Won</th>
                <th className="p-3">Drawn</th>
                <th className="p-3">Lost</th>
                <th className="p-3">Points</th>
              </tr>
            </thead>
            <tbody>
              {standings.map((s, index) => {
                let bgClass = index % 2 === 0 ? "bg-gray-800" : "bg-gray-850";
                if (index === 0) bgClass = "bg-yellow-600 text-black font-bold";
                else if (index === 1) bgClass = "bg-gray-500 text-white font-bold";
                else if (index === 2) bgClass = "bg-amber-700 text-white font-bold";

                return (
                  <tr
                    key={s.teamId}
                    className={`${bgClass} border-t border-gray-700 hover:bg-gray-700 transition-colors`}
                  >
                    <td className="p-3 font-bold">{index + 1}</td>
                    <td className="p-3 flex items-center gap-2">
                      <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-600 text-white font-semibold">
                        {teamMap[s.teamId]?.[0] || s.teamName?.[0] || "?"}
                      </div>
                      {teamMap[s.teamId] || s.teamName || s.teamId}
                    </td>
                    <td className="p-3 text-center">{s.played}</td>
                    <td className="p-3 text-center">{s.won}</td>
                    <td className="p-3 text-center">{s.drawn}</td>
                    <td className="p-3 text-center">{s.lost}</td>
                    <td className="p-3 text-center font-extrabold">{s.points}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );

case "teams":
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">👥 Teams</h2>
      {teams.length === 0 ? (
        <p className="text-gray-400">No teams registered.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {teams.map((team) => (
            <div
              key={team.id}
              className="bg-gray-800 rounded-xl p-5 flex flex-col items-center text-center shadow-md hover:shadow-lg hover:bg-gray-700 transition-all duration-300"
            >
              {/* Team Logo / Initial */}
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gray-600 text-white text-xl font-bold mb-3">
                {team.name?.[0] || "?"}
              </div>

              {/* Team Name */}
              <h3 className="text-lg font-semibold text-white">{team.name}</h3>

              {/* Manager */}
              <p className="text-sm text-gray-400">Manager: {team.managerName || "N/A"}</p>

              {/* Optional: Team Stats */}
              {team.wins !== undefined && (
                <div className="mt-3 text-sm text-gray-300">
                  🏆 Wins: {team.wins} | ❌ Losses: {team.losses}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 p-6 flex flex-col border-r border-gray-700">
        <h2 className="text-xl font-bold mb-6">🏟 Tournament Menu</h2>
        {["overview", "fixtures", "results", "standings", "teams"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`mb-2 text-left px-3 py-2 rounded-lg transition ${
              activeTab === tab ? "bg-blue-600" : "hover:bg-gray-700"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
        {(role === 1 || role === 2) && (
          <button
            onClick={() => navigate(`/edit-tournament/${id}`)}
            className="mt-6 bg-green-600 hover:bg-green-500 px-4 py-2 rounded-lg font-semibold"
          >
            ✏ Edit Tournament
          </button>
        )}
        <button
          onClick={() => window.history.back()}
          className="mt-4 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg"
        >
          ⬅ Back to List
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto">{renderContent()}</div>
    </div>
  );
};

export default TournamentDetails;
