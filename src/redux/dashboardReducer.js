import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from 'src/services/axios';

export const fetchDashboardCard = createAsyncThunk('dashboard/fetchDashboardCard', async (params, { getState }) => {
  const { data } = await api.dashboard.getDashboardCard(params);

  return data;
});

export const fetchDashboardChart = createAsyncThunk('dashboard/fetchDashboardChart', async (params, { getState }) => {
  const { data } = await api.dashboard.getDashboardChart(params);

  return data;
});

const initialState = {
  data: null,
  loading: false,
  error: false,

  dataChart: null,
  loadingChart: false,
  errorChart: false,
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {},
  extraReducers: {
    'auth/signOut': () => {
      return initialState;
    },
    [fetchDashboardCard.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchDashboardCard.fulfilled]: (state, action) => {
      state.data = action.payload.result;
      state.loading = false;
      state.error = false;
    },
    [fetchDashboardCard.rejected]: (state, action) => {
      state.loading = false;
      state.error = true;
    },

    [fetchDashboardChart.pending]: (state, action) => {
      state.loadingChart = true;
    },
    [fetchDashboardChart.fulfilled]: (state, action) => {
      state.dataChart = action.payload.result;
      state.loadingChart = false;
      state.errorChart = false;
    },
    [fetchDashboardChart.rejected]: (state, action) => {
      state.loadingChart = false;
      state.errorChart = true;
    },
  },
});

const { actions, reducer } = dashboardSlice;

export const dashboardActions = actions;
export default reducer;
