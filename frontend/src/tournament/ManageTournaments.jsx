import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTournaments, togglePublish } from '../redux/tournamentSlice';
import { useNavigate } from 'react-router-dom';

export default function ManageTournaments() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { tournaments, loading } = useSelector((s) => s.tournament);
  const token = useSelector((s) => s.auth.token);

  // hardcoded for now; later extract from JWT or Redux
  const organizerId = 1;

  useEffect(() => {
    dispatch(getTournaments(organizerId));
  }, [dispatch, organizerId]);

  const handleToggle = (t) => {
    dispatch(togglePublish({ id: t.id, isPublished: t.published }))
      .then(() => dispatch(getTournaments(organizerId)));
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Manage Tournaments</h2>
      {loading ? (
        <p>Loading…</p>
      ) : (
        <div className="space-y-4">
          {tournaments.length === 0 && <p>No tournaments found.</p>}
          {tournaments.map((t) => (
            <div
              key={t.id}
              className="p-4 border rounded-lg shadow-sm flex justify-between items-center"
            >
              <div>
                <h3 className="text-lg font-bold">{t.name}</h3>
                <p>Status: {t.status}</p>
                <p>
                  Visibility:{' '}
                  <span className={t.published ? 'text-green-600' : 'text-red-600'}>
                    {t.published ? 'Published' : 'Unpublished'}
                  </span>
                </p>
              </div>
              <div className="space-x-2">
                <button
                  className="px-3 py-1 bg-yellow-500 text-white rounded"
                  onClick={() => navigate(`/edit-tournament/${t.id}`)}
                >
                  Edit
                </button>
                <button
                  className={`px-3 py-1 rounded ${
                    t.published ? 'bg-red-500' : 'bg-green-500'
                  } text-white`}
                  onClick={() => handleToggle(t)}
                >
                  {t.published ? 'Unpublish' : 'Publish'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
