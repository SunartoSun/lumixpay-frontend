import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from 'src/services/axios';

export const fetchDepositList = createAsyncThunk('merchant/fetchDepositList', async (params, { getState }) => {
  const { data } = await api.deposit.getDepositList(params);

  return data;
});

const initialState = {
  error: false,
  data: null,
  loading: false,
};

const merchantSlice = createSlice({
  name: 'merchant',
  initialState,
  reducers: {},
  extraReducers: {
    'auth/signOut': () => {
      return initialState;
    },
    [fetchDepositList.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchDepositList.fulfilled]: (state, action) => {
      state.data = action.payload.result;
      state.loading = false;
      state.error = false;
    },
    [fetchDepositList.rejected]: (state, action) => {
      state.loading = false;
      state.error = true;
    },
  },
});

const { actions, reducer } = merchantSlice;

export const merchantActions = actions;
export default reducer;
