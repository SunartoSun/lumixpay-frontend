/* eslint-disable func-names */
/* eslint-disable object-shorthand */
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from './rootReducer';
import createEncryptor, { encryptTransform } from 'redux-persist-transform-encrypt';

// const encryptor = createEncryptor({
//   secretKey: 'lh-w',
//   onError: function (error) {
//     // Handle the error.
//     console.log('create encryptor error', error);
//   },
// });

const persistConfig = {
  key: 'root',
  storage,
  blacklist: [],
  transforms: [
    encryptTransform({
      secretKey: 'lh-w',
      onError: function (error) {
        // Handle the error.
        console.log('create encryptor error', error);
      },
    }),
  ],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

export const persistor = persistStore(store);
