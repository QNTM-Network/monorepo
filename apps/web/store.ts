import { configureStore } from '@reduxjs/toolkit'


import {userReducer }from './store/reducers/userSlice'


const initializeStore = (preloadedState?: any) =>
  configureStore({
    reducer: {
      user: userReducer,
    },
  });

export const store = initializeStore();
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
