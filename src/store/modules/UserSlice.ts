import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import UserType from '../../types/UserType';
import api from '../../services/api';


interface userstate {
    user: UserType;
}
const initialState: userstate = {
    user: { email: '', password: '', notes: [] }
};

interface userLogin {
    email: string,
    password: string
}

interface userCreate {
    email: string,
    password: string,
    repassword: string
}

export const loginAsyncThunk = createAsyncThunk('login', async ({email, password}:userLogin) => {
    const response = await api.post('/login', {
        email,
        password
    });
    console.log(response);
    return response.data;
});

export const userCreateAsyncThunk = createAsyncThunk(
    'userCreate', async ({email, password, repassword}:userCreate) => {
        const response = await api.post('/users', {
            email,
            password,
            repassword
        });
        return response.data;
    }
);

export const userSlice = createSlice({
    name: 'user',
    initialState,
    extraReducers(builder){
        builder.addCase(loginAsyncThunk.fulfilled, (state, action) => {
            state.user.email = action.payload.email;
            state.user.password = action.payload.password;
        });
    },
    reducers: {
        logout: () => {
            return initialState;
        }
    }
});

export default userSlice.reducer;

export const {logout} = userSlice.actions;