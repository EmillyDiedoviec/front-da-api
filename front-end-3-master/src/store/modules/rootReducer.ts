import { combineReducers } from '@reduxjs/toolkit';
import UserLoggedSlice from './UserLoggedSlice';
import UserSlice from './UserSlice';


export default combineReducers({
    users: UserSlice,
    userLogged: UserLoggedSlice,
});