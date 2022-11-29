import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  IUserLogin,
} from 'ui'

interface IUserSlice extends IUserLogin {
  isAuth?: boolean;
}

export const getDefaultUserState = () => ({
  address: '',
  dailyCount: [],
  loggedIn: false
});

export const userSlice = createSlice({
  name: 'profile',
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
});

export const userReducer = userSlice.reducer;
export const {
  setUser,
  unsetUser,
} = userSlice.actions;
