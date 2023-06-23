import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import UserType from '../../types/UserType';
import NoteType from '../../types/NoteType';


interface userloggedstate {
    user: UserType;
}
const initialState: userloggedstate = {
    user: { email: '', password: '', notes: [] }
};
export const userLoggedSlice = createSlice({
    name: 'userLogged',
    initialState,
    reducers: {
        setUserLogged: (state, action: PayloadAction<UserType>) => {
            return { user: action.payload };
        },

        logout: () => {
            return initialState;
        },
        addNewTask: (state, action: PayloadAction<NoteType>) => {
            state.user.notes.push(action.payload);
        },
        updateTask: (state, action: PayloadAction<NoteType>) => {
            const note = action.payload;
            const index = state.user.notes.findIndex(item => item.id === note.id);

            state.user.notes[index] = note;
        },
        deleteTask: (state, action: PayloadAction<number>) => {
            const id = action.payload;
            const index = state.user.notes.findIndex(item => item.id === id);

            state.user.notes.splice(index, 1);
        }
    }
});

export default userLoggedSlice.reducer;

export const { setUserLogged, logout, addNewTask, updateTask, deleteTask } = userLoggedSlice.actions;