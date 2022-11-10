import { configureStore } from '@reduxjs/toolkit'

import { getDefaultUserState } from './store/reducers/userSlice';
import { rootReducer } from './store/reducers/rootReducer';


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
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
