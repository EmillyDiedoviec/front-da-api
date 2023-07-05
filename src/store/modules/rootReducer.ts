import { combineReducers } from '@reduxjs/toolkit';
import UserSlice from './UsersSlice';
import userLoggedSlice from './UserLogged';

export default combineReducers({
    userLogged: userLoggedSlice,
    users: UserSlice
});
