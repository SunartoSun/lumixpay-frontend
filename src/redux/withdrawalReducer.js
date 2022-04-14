import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from 'src/services/axios';

export const fetchWithdrawalList = createAsyncThunk('withdrawal/fetchWithdrawalList', async (params, { getState }) => {
  const { data } = await api.withdrawal.getWithdrawalList(params);

  return data;
});

export const postWithdrawalApprove = createAsyncThunk('withdrawal/postWithdrawalApprove', async (params, { getState }) => {
  const { data } = await api.withdrawal.withdrawalApprove(params);
  return data;
});

export const postWithdrawalReject = createAsyncThunk('withdrawal/postWithdrawalReject', async (params, { getState }) => {
  const { data } = await api.withdrawal.withdrawalReject(params);
  return data;
});

const initialState = {
  error: false,
  data: null,
  loading: false,
  errorAction: false,
  loadingAction: false,
  refresh: 0,
};

const withdrawalSlice = createSlice({
  name: 'withdrawal',
  initialState,
  reducers: {},
  extraReducers: {
    'auth/signOut': () => {
      return initialState;
    },
    [fetchWithdrawalList.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchWithdrawalList.fulfilled]: (state, action) => {
      state.data = action.payload.result;
      state.loading = false;
      state.error = false;
    },
    [fetchWithdrawalList.rejected]: (state, action) => {
      state.loading = false;
      state.error = true;
    },

    [postWithdrawalApprove.pending]: (state, action) => {
      state.loadingAction = true;
    },
    [postWithdrawalApprove.fulfilled]: (state, action) => {
      state.refresh += 1;
      state.loadingAction = false;
      state.error = false;
    },
    [postWithdrawalApprove.rejected]: (state, action) => {
      state.loadingAction = false;
      state.error = true;
    },

    [postWithdrawalReject.pending]: (state, action) => {
      state.loadingAction = true;
    },
    [postWithdrawalReject.fulfilled]: (state, action) => {
      state.refresh += 1;
      state.loadingAction = false;
      state.error = false;
    },
    [postWithdrawalReject.rejected]: (state, action) => {
      state.loadingAction = false;
      state.error = true;
    },
  },
});

const { actions, reducer } = withdrawalSlice;

export const withdrawalActions = actions;
export default reducer;
