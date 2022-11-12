import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'

import { getDefaultUserState } from './store/reducers/userSlice';
import { rootReducer } from './store/reducers/rootReducer';
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

const persistConfig = {
  key: 'root',
  storage,
}


const getDefaultStates = () => ({
  user: getDefaultUserState(),
});

const initializeStore = (preloadedState?: any) =>
  configureStore({
    reducer: {
      reducer: rootReducer,
      preloadedState: preloadedState || getDefaultStates(),
    },
  });


export const store = initializeStore();
export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
