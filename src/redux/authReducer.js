import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signIn: (state, action) => {
      state.data = action.payload;
    },
    signOut: (state, action) => {
      console.log('action', action);
      console.log('state', state);
      state.data = null;
    },
  },
});

const { actions, reducer } = authSlice;

export const authActions = actions;
export default reducer;
