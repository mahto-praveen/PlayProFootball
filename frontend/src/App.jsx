import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import OrganizerRoute from "./components/OrganizerRoute";
import TournamentPage from "./tournament/TournamentPage";
import CreateTournamentPage from "./tournament/CreateTournament";
import ManageTournamentsPage from "./tournament/ManageTournamentsPage";
import ManageTournaments from "./tournament/ManageTournaments";
import EditTournamentPage from "./tournament/EditTournamentPage";
import TournamentTabsPage from "./tournament/TournamentTabsPage";

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
          path="/create-tournament"
          element={
            <OrganizerRoute>
              <CreateTournamentPage />
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

        <Route path="*" element={<TournamentPage />} />
      </Routes>
    </>
  );
}

export default App;
