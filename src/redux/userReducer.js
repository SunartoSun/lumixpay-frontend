import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from 'src/services/axios';

export const userChangePassword = createAsyncThunk('user/userChangePassword', async (params, { getState }) => {
  const { data } = await api.user.userChangePassword(params);
  return data;
});

export const fetchTotalDpWd = createAsyncThunk('user/fetchTotalDpWd', async (params, { getState }) => {
  const { data } = await api.user.getUserTotalDPWD(params);
  return data;
});

const initialState = {
  userData: null,
  permission: [],

  error: false,
  loading: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userData = action.payload;
    },
    setPermission: (state, action) => {
      state.permission = action.payload;
    },
  },
  extraReducers: {
    'auth/signOut': () => {
      return initialState;
    },
    [userChangePassword.pending]: (state, action) => {
      state.loading = true;
    },
    [userChangePassword.fulfilled]: (state, action) => {
      state.data = action.payload.result;
      state.loading = false;
      state.error = false;
    },
    [userChangePassword.rejected]: (state, action) => {
      state.loading = false;
      state.error = true;
    },

    [fetchTotalDpWd.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchTotalDpWd.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = false;
    },
    [fetchTotalDpWd.rejected]: (state, action) => {
      state.loading = false;
      state.error = true;
    },
  },
});

const { actions, reducer } = userSlice;

export const userActions = actions;
export default reducer;
