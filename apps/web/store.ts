import {configureStore, ThunkAction} from '@reduxjs/toolkit';
import {Action} from 'redux';
import {createWrapper} from 'next-redux-wrapper';
import { userReducer } from './store/reducers/userSlice';




const makeStore = () => configureStore({
  reducer: {
    user: userReducer, 
  },
  devTools: true
});


export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action>;


export const wrapper = createWrapper(makeStore, { debug: true });
