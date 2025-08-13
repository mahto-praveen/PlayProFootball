import React, { useState } from "react";

export default function AddResultForm({ matchId, onClose, onResultAdded }) {
  const [formData, setFormData] = useState({
    scoreA: "",
    scoreB: "",
    status: "COMPLETED",
    stadium: "",
    matchType: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `https://localhost:7006/api/matches/${matchId}`,
        {
          method: "PUT", // Correct method
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            scoreA: Number(formData.scoreA),
            scoreB: Number(formData.scoreB),
            status: formData.status,
            stadium: formData.stadium,
            matchType: formData.matchType
          })
        }
      );

      if (!res.ok) throw new Error("Failed to add result");
      onResultAdded();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Error adding result");
    }
  };

  return (
    <div className="bg-gray-900 p-6 rounded-lg shadow-lg text-white max-w-md mx-auto">
      <h3 className="text-xl font-bold mb-4">Add Match Result</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="number"
          name="scoreA"
          placeholder="Score A"
          value={formData.scoreA}
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-800 border border-gray-700"
          required
        />
        <input
          type="number"
          name="scoreB"
          placeholder="Score B"
          value={formData.scoreB}
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-800 border border-gray-700"
          required
        />
        <input
          type="text"
          name="stadium"
          placeholder="Stadium"
          value={formData.stadium}
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-800 border border-gray-700"
        />
        <input
          type="text"
          name="matchType"
          placeholder="Match Type"
          value={formData.matchType}
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-800 border border-gray-700"
        />
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg font-semibold w-full"
        >
          Save Result
        </button>
      </form>
      <button
        onClick={onClose}
        className="mt-4 text-gray-400 hover:underline w-full"
      >
        Cancel
      </button>
    </div>
  );
}
