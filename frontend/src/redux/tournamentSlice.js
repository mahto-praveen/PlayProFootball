import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchTournaments,
  publishTournament,
  unpublishTournament,
} from '../api/tournamentAPI';

export const getTournaments = createAsyncThunk(
  'tournament/getAll',
  // here payload is orgId
  async (orgId, { getState }) => {
    const token = getState().auth.token;
    return await fetchTournaments(orgId, token);
  }
);

export const togglePublish = createAsyncThunk(
  'tournament/togglePublish',
  async ({ id, isPublished }, { getState }) => {
    const token = getState().auth.token;
    return isPublished
      ? await unpublishTournament(id, token)
      : await publishTournament(id, token);
  }
);

const tournamentSlice = createSlice({
  name: 'tournament',
  initialState: {
    tournaments: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTournaments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTournaments.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.tournaments = payload;
      })
      .addCase(getTournaments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(togglePublish.fulfilled, (state) => {
        /* we’ll re-fetch the list in the component */
      });
  },
});

export default tournamentSlice.reducer;
