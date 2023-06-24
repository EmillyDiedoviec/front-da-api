import { combineReducers } from '@reduxjs/toolkit';
import UserSlice from './UserSlice';

export default combineReducers({
    users: UserSlice
});
