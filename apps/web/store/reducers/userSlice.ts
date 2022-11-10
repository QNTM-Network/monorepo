import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  IUserLogin,
  IDailyCount,
} from 'ui'

interface IUserSlice extends IUserLogin {
  isAuth?: boolean;
  loggedIn?: boolean;
  count: IDailyCount[];
}

export const getDefaultUserState = () => ({
  email: '',
  name: '',
  address: '',
  count: '',
  loggedIn: false
});

export const userSlice = createSlice({
  name: 'profile',
  initialState: getDefaultUserState(),
  reducers: {
    setUser: (state, action: PayloadAction<IUserLogin>) => {
      state.email = action.payload.email;
      state.address = action.payload.address;
      state.name = action.payload.name;
      // @ts-ignore
      state.count = action.payload.count;
      state.loggedIn = true;

    },

    unsetUser: (state) => {
      state.email = '';
      state.address = '';
      state.loggedIn = false;
      state.name = '';
    },
  },
});

export const userReducer = userSlice.reducer;
export const {
  setUser,
  unsetUser,
} = userSlice.actions;
