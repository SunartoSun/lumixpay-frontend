import { combineReducers } from '@reduxjs/toolkit';
import alertReducer from './alertReducer';
import authReducer from './authReducer';
import userReducer from './userReducer';
import appStateReducer from './appStateReducer';
import dashboardReducer from './dashboardReducer';
import depositReducer from './depositReducer';
import merchantReducer from './merchantReducer';
import withdrawalReducer from './withdrawalReducer';
import storage from 'redux-persist/lib/storage';

const appReducer = combineReducers({
  appState: appStateReducer,
  alert: alertReducer,
  auth: authReducer,
  dashboard: dashboardReducer,
  deposit: depositReducer,
  merchant: merchantReducer,
  user: userReducer,
  withdrawal: withdrawalReducer,
});

const rootReducer = (state, action) => {
  if (action.type === '"auth/signOut') {
    state = undefined;
    storage.removeItem('persist:root');
  }

  return appReducer(state, action);
};

export default rootReducer;
