import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import NoteType from '../../types/NoteType';
import api from '../../services/api';

interface noteState {
    note: NoteType;
}
const initialState: noteState = {
    note: {
        title: '',
        description: '',
        id: '',
        archived: false
    }
};

interface noteCreate {
    title: string;
    description: string;
    email: string;
}

export const noteCreateAsyncThunk = createAsyncThunk('note', async (newnote: noteCreate) => {
    const email = newnote.email;

    try {
        const response = await api.post(`/tasks/${email}`, {
            title: newnote.title,
            description: newnote.description
        });
        console.log(response);

        return response.data;
    } catch (error) {
        console.error('Erro ao criar tarefa:', error);
        throw error;
    }
});

export const noteSlice = createSlice({
    name: 'note',
    initialState,
    extraReducers(builder) {
        builder.addCase(noteCreateAsyncThunk.fulfilled, (state, action) => {
            state.note.title = action.payload.title;
            state.note.description = action.payload.description;
        });
    },
    reducers: {}
});

export default noteSlice.reducer;