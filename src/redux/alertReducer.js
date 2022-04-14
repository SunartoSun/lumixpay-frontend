import { createSlice } from '@reduxjs/toolkit';

/**
 * {
 *   status: 'sucess' | 'error'
 *   title: 'string',
 *   message: 'string' | reactNode (because there's a hyperlink),
 * }
 */

export const STATUS_TYPE = {
  SUCCESS: 'success',
  ERROR: 'error',
};

const initialState = {
  messageStack: [],
  isShowing: false,
};

const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    addAlert: (state, action) => {
      state.messageStack.push(action.payload);
    },
    addErrorAlert: (state, action) => {
      state.messageStack.push({ status: STATUS_TYPE.ERROR, ...action.payload });
    },
    addSuccessAlert: (state, action) => {
      state.messageStack.push({ status: STATUS_TYPE.SUCCESS, ...action.payload });
    },
    dismissAlert: (state) => {
      if (state.messageStack.length > 0) state.messageStack.shift();
    },
    clear: (state) => {
      state.messageStack = [];
    },
    toggle: (state, action) => {
      console.log('call toggle', action);
      state.isShowing = action.payload;
    },
  },
});

const { actions, reducer } = alertSlice;

export const alertActions = actions;
export default reducer;
