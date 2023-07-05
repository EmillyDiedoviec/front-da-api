import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import UserType from '../../types/UserType';
import api from '../../services/api';

interface usersState {
    users: UserType[]
}

const initialState: usersState = {
    users: []
};

export const getUsersAsyncThunk = createAsyncThunk('getUsers', async () => {
    const response = await api.get('/users');
    console.log(response.data);
    return response.data;
    
});

export const usersSlice = createSlice({
    name: 'user',
    initialState,
    extraReducers(builder) {
        builder.addCase(getUsersAsyncThunk.fulfilled,(state, action) =>{
            state.users = action.payload;
        });
    },
    reducers: {}
}

);

export default usersSlice.reducer;