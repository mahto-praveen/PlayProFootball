import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { fetchTournaments } from '../api/tournamentAPI';
import { Link } from 'react-router-dom';


const TournamentPage = () => {
  const [tournaments, setTournaments] = useState([]);
  const [states, setStates] = useState([]);

  const [nameFilter, setNameFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [stateFilter, setStateFilter] = useState('');
  const [cityFilter, setCityFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');

  const navigate = useNavigate();

  // ✅ Get from localStorage directly
  const token = localStorage.getItem('token');
  const role = parseInt(localStorage.getItem('role'));
  const organizationId = localStorage.getItem('organizationId');

  useEffect(() => {
    (async () => {
      try {
        if (!token) return;

        const tournamentsData = await fetchTournaments(token, role == 2 && organizationId ? organizationId : null);
        setTournaments(tournamentsData);

        const res = await axios.get('http://localhost:8082/api/states');
        setStates(res.data.map((s) => s.name));
      } catch (err) {
        console.error('Error loading data:', err);
      }
    })();
  }, [token, organizationId, role]);

  const filterTournaments = (status) =>
    tournaments.filter((t) => {
      if (t.status.toLowerCase() !== status.toLowerCase()) return false;
      if (nameFilter && !t.name.toLowerCase().includes(nameFilter.toLowerCase())) return false;
      if (dateFilter) {
        const d = new Date(dateFilter);
        const start = new Date(t.startDate), end = new Date(t.endDate);
        if (d < start || d > end) return false;
      }
      if (stateFilter && t.stateName !== stateFilter) return false;
      if (cityFilter && !t.city.toLowerCase().includes(cityFilter.toLowerCase())) return false;
      if (typeFilter && t.type !== typeFilter) return false;
      return true;
    });

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <section className="py-10 px-4 sm:px-10 bg-gradient-to-r from-green-800 to-gray-800">
        <h1 className="text-4xl font-bold mb-4">🏆 Explore Football Tournaments</h1>
      </section>

      <div className="flex flex-col lg:flex-row gap-6 px-4 sm:px-10 py-8">
        <aside className="lg:w-1/4 bg-gray-800 p-6 rounded-xl">
          <h2 className="text-xl font-semibold mb-4">🔍 Filters</h2>
          <div className="flex flex-col gap-4">
            <input type="text" placeholder="By Name" className="px-3 py-2 rounded text-black" value={nameFilter} onChange={(e) => setNameFilter(e.target.value)} />
            <input type="date" className="px-3 py-2 rounded text-black" value={dateFilter} onChange={(e) => setDateFilter(e.target.value)} />
            <div>
              <input list="states" placeholder="Select State" className="w-full px-3 py-2 rounded text-black" value={stateFilter} onChange={(e) => setStateFilter(e.target.value)} />
              <datalist id="states">
                {states.map((s) => (<option key={s} value={s} />))}
              </datalist>
            </div>
            <input type="text" placeholder="By City" className="px-3 py-2 rounded text-black" value={cityFilter} onChange={(e) => setCityFilter(e.target.value)} />
            <select className="px-3 py-2 rounded text-black" value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
              <option value="">Type</option>
              <option value="FIVE_VS_FIVE">5v5</option>
              <option value="SEVEN_VS_SEVEN">7v7</option>
              <option value="ELEVEN_VS_ELEVEN">11v11</option>
              <option value="KNOCKOUT">Knockout</option>
              <option value="ROUND_ROBIN">Round Robin</option>
            </select>
            <button className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg" onClick={() => {}}>Apply Filters</button>
          </div>
        </aside>

        <main className="lg:w-3/4 flex flex-col gap-10">
          <Section title="🟡 Upcoming" data={filterTournaments('Upcoming')} />
          <Section title="🟢 Ongoing" data={filterTournaments('Ongoing')} />
          <Section title="🔴 Finished" data={filterTournaments('Finished')} />
        </main>
      </div>
    </div>
  );
};

const Section = ({ title, data }) => (
  <section>
    <h2 className="text-2xl font-bold mb-4">{title} Tournaments</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.length ? data.map((t) => <TournamentCard key={t.id} tournament={t} />) : <p className="text-gray-400">No tournaments found.</p>}
    </div>
  </section>
);

const TournamentCard = ({ tournament }) => {
  const { id, name, city, stateName, startDate, endDate, status, type } = tournament;
  const statusColor = status === 'Upcoming' ? 'border-yellow-500' : status === 'Ongoing' ? 'border-green-500' : 'border-red-500';

  return (
    <Link to={`/tournament-details/${id}`} className="block">
    <div className={`bg-gray-800 border-l-4 ${statusColor} p-4 rounded-xl shadow-md`}>
      <h3 className="text-xl font-semibold mb-2">{name}</h3>
      <p className="text-sm text-gray-300 mb-1">📍 {city}, {stateName}</p>
      <p className="text-sm text-gray-400 mb-1">🗓️ {new Date(startDate).toDateString()} → {new Date(endDate).toDateString()}</p>
      <span className="text-xs uppercase text-gray-500">{type.replace(/_/g, ' ')}</span>
    </div>
    </Link>
  );
};

export default TournamentPage;
