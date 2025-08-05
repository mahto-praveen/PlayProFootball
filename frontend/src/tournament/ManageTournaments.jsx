import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTournaments, togglePublish } from '../redux/tournamentSlice';
import { useNavigate } from 'react-router-dom';

const ManageTournaments = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { tournaments, loading } = useSelector((state) => state.tournament);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getTournaments());
  }, [dispatch]);

  const handleTogglePublish = (tournament) => {
    dispatch(togglePublish({ id: tournament.id, isPublished: tournament.isPublished, token }))
      .then(() => dispatch(getTournaments()));
  };

  const handleEdit = (id) => {
    navigate(`/edit-tournament/${id}`);
  };

  const organizerId = '1';

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Manage Tournaments</h2>
      {loading ? (
        <p>Loading tournaments...</p>
      ) : (
        <div className="space-y-4">
          {tournaments
            .filter((t) => t.organizationId === organizerId)
            .map((tournament) => (
              <div
                key={tournament.id}
                className="p-4 border rounded-lg shadow-sm flex justify-between items-center"
              >
                <div>
                  <h3 className="text-lg font-bold">{tournament.name}</h3>
                  <p>Status: {tournament.status}</p>
                  <p>
                    Visibility:{' '}
                    <span className={tournament.isPublished ? 'text-green-600' : 'text-red-600'}>
                      {tournament.isPublished ? 'Published' : 'Unpublished'}
                    </span>
                  </p>
                </div>
                <div className="space-x-2">
                  <button
                    className="px-3 py-1 bg-yellow-500 text-white rounded"
                    onClick={() => handleEdit(tournament.id)}
                  >
                    Edit
                  </button>
                  <button
                    className={`px-3 py-1 rounded ${
                      tournament.isPublished ? 'bg-red-500' : 'bg-green-500'
                    } text-white`}
                    onClick={() => handleTogglePublish(tournament)}
                  >
                    {tournament.isPublished ? 'Unpublish' : 'Publish'}
                  </button>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default ManageTournaments;
