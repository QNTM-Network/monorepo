import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  IUserLogin,
} from 'ui'

interface IUserSlice extends IUserLogin {
  isAuth?: boolean;
  loggedIn?: boolean;
}

export const getDefaultUserState = () => ({
  email: '',
  name: '',
  address: '',
  _id: '',
  loggedIn: false
});

export const userSlice = createSlice({
  name: 'profile',
  initialState: getDefaultUserState(),
  reducers: {
    setUser: (state, action: PayloadAction<IUserLogin>) => {
      state.email = action.payload.email;
      state.address = action.payload.address;
      state.name= action.payload.name;
      state.loggedIn = true;

    },

    unsetUser: (state) => {
      state.email = '';
      state.address = '';
      state.loggedIn = false;
      state.name = '';
      state._id = '';
    },
  },
});

export const userReducer = userSlice.reducer;
export const {
  setUser,
  unsetUser,
} = userSlice.actions;
