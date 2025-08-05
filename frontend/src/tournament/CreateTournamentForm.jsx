import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateTournamentForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    location: "",
    startDate: "",
    endDate: "",
    type: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
          const token = localStorage.getItem("token");
          const response = await axios.post(
        "http://localhost:8082/api/tournaments",
        formData,
         {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      );
      console.log("Tournament created:", response.data);
      alert("Tournament Created Successfully!");
      navigate("/tournaments");
    } catch (error) {
      console.error("Error creating tournament:", error);
      alert("Failed to create tournament");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-8 bg-white shadow-md p-6 rounded-xl">
      <h2 className="text-2xl font-bold mb-6 text-center">Create Tournament</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="name" placeholder="Tournament Name" onChange={handleChange} required className="w-full p-2 border rounded" />
        <input type="text" name="description" placeholder="Description" onChange={handleChange} required className="w-full p-2 border rounded" />
        <input type="text" name="location" placeholder="Location" onChange={handleChange} required className="w-full p-2 border rounded" />
        <input type="date" name="startDate" onChange={handleChange} required className="w-full p-2 border rounded" />
        <input type="date" name="endDate" onChange={handleChange} required className="w-full p-2 border rounded" />
        <select name="type" onChange={handleChange} required className="w-full p-2 border rounded">
          <option value="">Select Type</option>
          <option value="5v5">5v5</option>
          <option value="7v7">7v7</option>
          <option value="11v11">11v11</option>
        </select>
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          Create
        </button>
      </form>
    </div>
  );
}

export default CreateTournamentForm;
