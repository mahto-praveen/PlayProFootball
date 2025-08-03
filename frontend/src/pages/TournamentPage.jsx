import React from 'react';

const TournamentPage = () => {
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
            <input
              type="text"
              placeholder="By Name"
              className="px-3 py-2 rounded text-black"
            />
            <input type="date" className="px-3 py-2 rounded text-black" />

            {/* State Dropdown */}
            <select className="px-3 py-2 rounded text-black">
              <option>Select State</option>
              <option>Maharashtra</option>
              <option>Karnataka</option>
              <option>Delhi</option>
              <option>Tamil Nadu</option>
              <option>West Bengal</option>
            </select>

            {/* City Dropdown */}
            <select className="px-3 py-2 rounded text-black">
              <option>Select City</option>
              <option>Mumbai</option>
              <option>Pune</option>
              <option>Bangalore</option>
              <option>Chennai</option>
              <option>Kolkata</option>
              <option>Delhi</option>
            </select>

            {/* Type Dropdown */}
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

        {/* Tournament Sections */}
        <main className="lg:w-3/4 flex flex-col gap-10">
          {/* Upcoming */}
          <section>
            <h2 className="text-2xl font-bold mb-4">🟢 Upcoming Tournaments</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((id) => (
                <TournamentCard key={id} status="upcoming" />
              ))}
            </div>
          </section>

          {/* Ongoing */}
          <section>
            <h2 className="text-2xl font-bold mb-4">🔴 Ongoing Tournaments</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[4, 5].map((id) => (
                <TournamentCard key={id} status="ongoing" />
              ))}
            </div>
          </section>

          {/* Finished */}
          <section>
            <h2 className="text-2xl font-bold mb-4">🟡 Finished Tournaments</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[6, 7, 8].map((id) => (
                <TournamentCard key={id} status="finished" />
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

const TournamentCard = ({ status }) => {
  const statusColor =
    status === 'upcoming'
      ? 'border-green-500'
      : status === 'ongoing'
      ? 'border-red-500'
      : 'border-yellow-500';

  return (
    <div className={`bg-gray-800 border-l-4 ${statusColor} p-4 rounded-xl shadow-md`}>
      <h3 className="text-xl font-semibold mb-2">Champions Cup</h3>
      <p className="text-sm text-gray-300 mb-1">📍 Mumbai, Maharashtra</p>
      <p className="text-sm text-gray-400">🗓️ Starts: 20th Aug 2025</p>
    </div>
  );
};

export default TournamentPage;
