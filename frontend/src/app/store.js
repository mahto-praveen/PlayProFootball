import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../redux/authSlice.js';
import tournamentReducer from '../redux/tournamentSlice.js';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tournament: tournamentReducer,
  },
});
export default store;