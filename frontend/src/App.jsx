import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import OrganizerRoute from "./components/OrganizerRoute";
import TournamentPage from "./tournament/TournamentPage";
import CreateTournament from "./tournament/CreateTournament";
import ManageTournamentsPage from "./tournament/ManageTournamentsPage";
import EditTournamentPage from "./tournament/EditTournamentPage";
import TournamentTabsPage from "./tournament/TournamentTabsPage";
import MatchModal from "./tournament/MatchModal";
import MatchScheduler from "./tournament/MatchScheduler";
import StandingsTable from "./tournament/StandingsTable";
import TeamManager from "./tournament/TeamManager";
import TournamentFixturesPage from "./tournament/TournamentFixturesPage";
import TournamentDetails from './tournament-detail/TournamentDetails';


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/tournaments"
          element={
            <ProtectedRoute>
              <TournamentPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/create-tournament"
          element={
            <OrganizerRoute>
              <CreateTournament />
            </OrganizerRoute>
          }
        />

        <Route
          path="/manage-tournaments"
          element={
            <OrganizerRoute>
              <ManageTournamentsPage />
            </OrganizerRoute>
          }
        />

        <Route
          path="/edit-tournament/:id"
          element={
            <OrganizerRoute>
              <EditTournamentPage />
            </OrganizerRoute>
          }
        />

        <Route
          path="/manage/tournament/:tournamentId"
          element={
            <ProtectedRoute>
              <TournamentTabsPage />
            </ProtectedRoute>
          }
        />

         <Route path="/tournament-details/:id" element={<TournamentDetails />} />

        {/* Direct routes for testing tournament components */}
        <Route path="/test/tournament-tabs/:tournamentId" element={<TournamentTabsPage />} />
        <Route path="/test/team-manager/:tournamentId" element={<TeamManager tournamentId={1} />} />
        <Route path="/test/match-scheduler/:tournamentId" element={<MatchScheduler tournamentId={1} />} />
        <Route path="/test/standings-table/:tournamentId" element={<StandingsTable tournamentId={1} />} />
        <Route path="/test/match-modal/:tournamentId" element={<MatchModal tournamentId={1} onClose={() => {}} />} />
        <Route path="/test/tournament-fixtures/:tournamentId" element={<TournamentFixturesPage tournamentId={1} />} />
     
        {/* Fallback route */}
        <Route
          path="*"
          element={
            <ProtectedRoute>
              <TournamentPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;