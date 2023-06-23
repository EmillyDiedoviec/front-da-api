import { combineReducers } from '@reduxjs/toolkit';
import UserSlice from './UserSlice';
import NotesSlice from './NotesSlice';


export default combineReducers({
    users: UserSlice,
    notes: NotesSlice
});