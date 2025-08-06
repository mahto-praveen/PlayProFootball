import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import TournamentPage from "./tournament/TournamentPage";
import CreateTournamentPage from "./tournament/CreateTournament";
import ManageTournamentsPage from "./tournament/ManageTournamentsPage";
import ManageTournaments from "./tournament/ManageTournaments";
import EditTournamentPage from "./tournament/EditTournamentPage";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/tournaments" element={<TournamentPage />} />
        <Route path="/manage-tournaments1" element={<ManageTournamentsPage />} />
        <Route path="/manage-tournaments" element={<ManageTournaments />} />
        <Route path="/edit-tournament/:id" element={<EditTournamentPage />} />

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
          path="/tournaments/create"
          element={
            <CreateTournamentPage />
          }
        />

        <Route path="*" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
