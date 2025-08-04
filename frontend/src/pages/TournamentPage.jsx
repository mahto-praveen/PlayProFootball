import React, { useEffect, useState } from 'react';
import { fetchTournaments } from '../api/tournamentAPI';

const TournamentPage = () => {
  const [tournaments, setTournaments] = useState([]);

  useEffect(() => {
    const loadTournaments = async () => {
      try {
        const data = await fetchTournaments();
        setTournaments(data);
      } catch (err) {
        console.error("Error fetching tournaments:", err);
      }
    };

    loadTournaments();
  }, []);

  const filterByStatus = (status) => {
    return tournaments.filter((t) =>
      t.status?.toLowerCase() === status.toLowerCase()
    );
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      {/* Hero Section */}
      <section className="py-10 px-4 sm:px-10 bg-gradient-to-r from-green-800 to-gray-800">
        <h1 className="text-4xl font-bold mb-4">🏆 Explore Football Tournaments</h1>
        <input
          type="text"
          placeholder="Search tournaments..."
          className="w-full sm:w-1/2 px-4 py-2 rounded-lg text-black"
        />
      </section>

      <div className="flex flex-col lg:flex-row gap-6 px-4 sm:px-10 py-8">
        {/* Sidebar Filters */}
        <aside className="lg:w-1/4 bg-gray-800 p-6 rounded-xl">
          <h2 className="text-xl font-semibold mb-4">🔍 Filters</h2>
          <div className="flex flex-col gap-4">
            <input type="text" placeholder="By Name" className="px-3 py-2 rounded text-black" />
            <input type="date" className="px-3 py-2 rounded text-black" />
            <select className="px-3 py-2 rounded text-black">
              <option>Select State</option>
              <option>Maharashtra</option>
              <option>Karnataka</option>
              <option>Delhi</option>
            </select>
            <select className="px-3 py-2 rounded text-black">
              <option>Select City</option>
              <option>Mumbai</option>
              <option>Pune</option>
              <option>Bangalore</option>
              <option>Delhi</option>
            </select>
            <select className="px-3 py-2 rounded text-black">
              <option>Type</option>
              <option>Knockout</option>
              <option>League</option>
            </select>
            <button className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg">
              Apply Filters
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="lg:w-3/4 flex flex-col gap-10">
          <Section title="🟡 Upcoming Tournaments" data={filterByStatus("Upcoming")} />
          <Section title="🟢 Ongoing Tournaments" data={filterByStatus("Ongoing")} />
          <Section title="🔴 Finished Tournaments" data={filterByStatus("Finished")} />
        </main>
      </div>
    </div>
  );
};

const Section = ({ title, data }) => (
  <section>
    <h2 className="text-2xl font-bold mb-4">{title}</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.length > 0 ? (
        data.map((tournament) => (
          <TournamentCard key={tournament.id} tournament={tournament} />
        ))
      ) : (
        <p className="text-gray-400">No tournaments found.</p>
      )}
    </div>
  </section>
);

const TournamentCard = ({ tournament }) => {
  const { name, location, startDate, endDate, status } = tournament;

  const statusColor =
    status === 'Upcoming'
      ? 'border-yellow-500'
      : status === 'Ongoing'
      ? 'border-green-500'
      : 'border-red-500';

  return (
    <div className={`bg-gray-800 border-l-4 ${statusColor} p-4 rounded-xl shadow-md`}>
      <h3 className="text-xl font-semibold mb-2">{name}</h3>
      <p className="text-sm text-gray-300 mb-1">📍 {location || "Unknown location"}</p>
      <p className="text-sm text-gray-400">
        🗓️ {new Date(startDate).toDateString()} → {new Date(endDate).toDateString()}
      </p>
    </div>
  );
};

export default TournamentPage;
