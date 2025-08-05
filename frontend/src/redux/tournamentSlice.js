import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchTournaments, publishTournament, unpublishTournament } from '../api/tournamentAPI';

export const getTournaments = createAsyncThunk('tournament/getAll', fetchTournaments);

export const togglePublish = createAsyncThunk(
  'tournament/togglePublish',
  async ({ id, isPublished, token }) => {
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
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTournaments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTournaments.fulfilled, (state, action) => {
        state.loading = false;
        state.tournaments = action.payload;
      })
      .addCase(getTournaments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(togglePublish.fulfilled, (state) => {
        // Re-fetching handled in component
      });
  },
});

export default tournamentSlice.reducer;
