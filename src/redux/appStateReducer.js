import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sidebarShow: 'responsive',
  asideShow: false,
  darkMode: false,
};

const appStateSlice = createSlice({
  name: 'appState',
  initialState,
  reducers: {
    toggleNavBar: (state, action) => {
      state.sidebarShow = action.payload.sidebarShow;
    },
    toggleAsideBar: (state, action) => {
      state.asideShow = action.payload.asideShow;
    },
    toggleDarkMode: (state, action) => {
      state.darkMode = action.payload.darkMode;
    },
  },
});

const { actions, reducer } = appStateSlice;

export const appActions = actions;
export default reducer;
