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
    email: string;
    password: string;
}

interface userCreate {
    email: string;
    password: string;
    repassword: string;
}

interface noteCreate {
    title: string;
    description: string;
    email: string;
}

export const loginAsyncThunk = createAsyncThunk('login', async ({ email, password }: userLogin) => {
    const response = await api.post('/login', {
        email,
        password
    });
    console.log(response);
    return response.data;
});

export const userCreateAsyncThunk = createAsyncThunk(
    'userCreate',
    async ({ email, password, repassword }: userCreate) => {
        const response = await api.post('/users', {
            email,
            password,
            repassword
        });
        console.log(response);

        return response.data;
    }
);

export const noteCreateAsyncThunk = createAsyncThunk('note', async (newTask: noteCreate) => {
    const email = newTask.email;
    console.log(newTask);

    try {
        const response = await api.post(`/tasks/${email}`, {
            title: newTask.title,
            description: newTask.description
        });
        console.log(response);

        return response.data;
    } catch (error) {
        console.error('Erro ao criar tarefa:', error);
        throw error;
    }
});

export const userSlice = createSlice({
    name: 'User',
    initialState,
    extraReducers(builder) {
        builder.addCase(loginAsyncThunk.fulfilled, (state, action) => {
            state.user.email = action.payload.email;
            state.user.password = action.payload.password;
        });
        builder.addCase(noteCreateAsyncThunk.fulfilled, (state, action) => {
            state.user.notes.push(action.payload);
        });
    },
    reducers: {
        logout: () => {
            return initialState;
        }
    }
});

export default userSlice.reducer;

export const { logout } = userSlice.actions;