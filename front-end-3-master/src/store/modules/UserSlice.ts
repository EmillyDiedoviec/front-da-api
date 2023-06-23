import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import UserType from '../../types/UserType';

const adapter = createEntityAdapter<UserType>({
    selectId: (item) => item.email,
});


const usersSlice = createSlice({
    name: 'users',
    initialState:adapter.getInitialState(),
    reducers: {
        updateUser: adapter.updateOne,
        addUser: adapter.addOne,
    },
    
},
);

export const { addUser,updateUser  } = usersSlice.actions;
export const { selectAll: selectAllUsers } = adapter.getSelectors((state: RootState) => state.users);
export default usersSlice.reducer;