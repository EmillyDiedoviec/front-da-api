import NoteType from './NoteType';

type UserType = {
    email: string;
    password: string;
    notes: NoteType[];
};

export default UserType;
