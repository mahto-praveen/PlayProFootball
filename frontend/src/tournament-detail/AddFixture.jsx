import React, { useState } from "react";
import axios from "axios";

const AddFixture = ({ tournamentId, teams = [], onClose, onAdded }) => {
  const token = localStorage.getItem("token");

  const [form, setForm] = useState({
    teamAId: "",
    teamBId: "",
    scheduledAt: "", // value from <input type="datetime-local">
    stadium: "",
    matchType: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // simple validation
    if (!form.teamAId || !form.teamBId) { setError("Please select both teams."); return; }
    if (form.teamAId === form.teamBId) { setError("Team A and Team B must be different."); return; }
    if (!form.scheduledAt) { setError("Please pick date & time for the match."); return; }
    if (!form.stadium) { setError("Please enter stadium."); return; }
    if (!form.matchType) { setError("Please enter match type."); return; }

    setLoading(true);
    try {
      // convert datetime-local to ISO
      const iso = new Date(form.scheduledAt).toISOString();

      const payload = {
        teamAId: Number(form.teamAId),
        teamBId: Number(form.teamBId),
        scheduledAt: iso,
        stadium: form.stadium,
        matchType: form.matchType
      };

      await axios.post(
        `https://localhost:7006/api/tournaments/${tournamentId}/matches`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // success
      onAdded && onAdded();
    } catch (err) {
      console.error(err);
      const msg = err?.response?.data?.message || err.message || "Failed to add match";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-gray-900 text-white rounded-xl shadow-xl w-full max-w-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Add Match Fixture</h3>
          <button
            onClick={onClose}
            className="text-gray-300 hover:text-white p-1 rounded"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm text-gray-300 mb-1">Team A</label>
              <select
                name="teamAId"
                value={form.teamAId}
                onChange={handleChange}
                className="w-full p-2 rounded bg-gray-800 border border-gray-700"
                required
              >
                <option value="">Select Team A</option>
                {teams.map(t => (
                  <option key={t.id} value={t.id}>{t.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-1">Team B</label>
              <select
                name="teamBId"
                value={form.teamBId}
                onChange={handleChange}
                className="w-full p-2 rounded bg-gray-800 border border-gray-700"
                required
              >
                <option value="">Select Team B</option>
                {teams.map(t => (
                  <option key={t.id} value={t.id}>{t.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">Scheduled At</label>
            <input
              type="datetime-local"
              name="scheduledAt"
              value={form.scheduledAt}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-800 border border-gray-700"
              required
            />
            <p className="text-xs text-gray-500 mt-1">Local time will be converted to ISO (UTC) when saved.</p>
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">Stadium</label>
            <input
              name="stadium"
              value={form.stadium}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-800 border border-gray-700"
              placeholder="e.g. Ahmedabad"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">Match Type</label>
            <input
              name="matchType"
              value={form.matchType}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-800 border border-gray-700"
              placeholder="e.g. semifinal"
              required
            />
          </div>

          {error && <div className="text-red-400 text-sm">{error}</div>}

          <div className="flex justify-end gap-3 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600"
              disabled={loading}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-green-600 rounded hover:bg-green-500 disabled:opacity-60"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Match"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddFixture;
