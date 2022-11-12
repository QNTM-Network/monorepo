import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { AppState} from '../../store';

import {
  IUserLogin,
  IDailyCount,
} from 'ui'


export const getDefaultUserState = () => ({
  address: '',
  dailyCount: [],
  loggedIn: false
});

export const userSlice = createSlice({
  name: 'user',
  initialState: getDefaultUserState(),
  reducers: {
    setUser: (state, action: PayloadAction<IUserLogin>) => {
      state.address = action.payload.address;
      // @ts-ignore
      state.dailyCount = action.payload.daily_count;
      state.loggedIn = true;

    },

    unsetUser: (state) => {
      state.address = '';
      state.loggedIn = false;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      if (!action.payload.user.address) {
        return state;
      }
      state.address = action.payload.user.address;
      state.dailyCount = action.payload.user.dailyCount;
      state.loggedIn = action.payload.user.loggedIn;
    },

  },


});

export const selectUser = (state: AppState) => state.user;


export const userReducer = userSlice.reducer;
export const {
  setUser,
  unsetUser,
} = userSlice.actions;
