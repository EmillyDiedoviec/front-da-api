import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import UserType from '../../types/UserType';
import api from '../../services/api';

interface userstate {
    userLogged: UserType;
}
const initialState: userstate = {
    userLogged: { email: '', password: '', notes: [] }
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

interface noteDelete {
    email: string,
    id: string,
}

interface noteUpdate {
    id:string,
    email: string,
    title: string,
    description: string
}


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

export const loginAsyncThunk = createAsyncThunk('login', async ({ email, password }: userLogin) => {
    const response = await api.get(`users/login/${email}/${password}`, {
    });
    console.log(response);
    return response.data;
});

export const noteCreateAsyncThunk = createAsyncThunk('note', async (newTask: noteCreate) => {
    const email = newTask.email;
    console.log(newTask);

    try {
        const response = await api.post(`/tasks/${email}`, {
            title: newTask.title,
            description: newTask.description
        });
        

        return response.data;
    } catch (error) {
        console.error('Erro ao criar tarefa:', error);
        throw error;
    }
});

export const getNotesAsyncThunk = createAsyncThunk(
    'getTask',
    async (email: string) => {
        console.log(email);
        const response = await api.get(`/tasks/${email}`);
        return response.data;
    }); 

export const noteDeleteAsyncThunk = createAsyncThunk(
    'taskDelete',
    async ({ email,id }: noteDelete) => {
        console.log(id);
        const response = await api.delete(`/tasks/${email}/${id}`);
        return response.data;
    });

export const noteUpdateAsyncThunk = createAsyncThunk(
    'taskUpdate',
    async ({ email,id,description,title }: noteUpdate) => {
        console.log(id);
        const response = await api.put(`/tasks/${email}/${id}`,{
            title,
            description
        });
        return response.data;
    });

export const noteArchiveAsyncThunk = createAsyncThunk(
    'taskArchive',
    async ({ email,id }: noteDelete) => {
        console.log(id);
        const response = await api.put(`/tasks/${email}/${id}/archived`);
        console.log(response.data);
        return response.data;
    });

export const userLoggedSlice = createSlice({
    name: 'userLogged',
    initialState,
    extraReducers(builder) {
        builder.addCase(loginAsyncThunk.fulfilled, (state, action) => {
            state.userLogged.email = action.payload.email;
            state.userLogged.password = action.payload.password;
        });
        builder.addCase(noteCreateAsyncThunk.fulfilled, (state, action) => {
            state.userLogged.notes.push(action.payload);
        });
        builder.addCase(getNotesAsyncThunk.fulfilled, (state, action) =>{
            state.userLogged.notes = action.payload;
        });
    },
    reducers: {
        logout: () => {
            return initialState;
        }
    }
});

export default userLoggedSlice.reducer;

export const { logout } = userLoggedSlice.actions;