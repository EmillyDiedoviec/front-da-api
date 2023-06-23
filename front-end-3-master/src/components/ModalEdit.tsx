import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Box } from '@mui/system';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { updateUser } from '../store/modules/UserSlice';
import { updateTask } from '../store/modules/UserLoggedSlice';
import NoteType from '../types/NoteType';


interface ModalEditProps {
    openModal: boolean;
    actionConfirm: () => void;
    actionCancel: () => void;
    note: NoteType;
}

const ModalEdit: React.FC<ModalEditProps> = ({ openModal, actionCancel, actionConfirm, note }) => {
    const dispatch = useAppDispatch();
    const[noteEdit, setNoteEdit] = useState(note);
    const userLogged = useAppSelector(state => state.userLogged.user);

    useEffect(() => {
        dispatch(updateUser({ id: userLogged.email, changes: userLogged }));
    }, [userLogged]);

    const handleClose = () => {
        actionCancel();
    };

    const handleConfirm = () => {
        dispatch(updateTask(noteEdit));
        actionConfirm();
    };

    return (
        <Box>
            <Dialog open={openModal} onClose={handleClose}>
                <DialogTitle>Recados</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        value={noteEdit.note}
                        margin="dense"
                        id="noteTitle"
                        label="Titulo do recado"
                        type={'text'}
                        fullWidth
                        variant="standard"
                        onChange={e => setNoteEdit(state => ({ ...state, note: e.target.value}))}
                    />
                    <TextField
                        value={noteEdit.description}
                        margin="dense"
                        id="noteDescription"
                        label="Descrição do recado"
                        type={'text'}
                        fullWidth
                        variant="standard"
                        onChange={e => setNoteEdit(state => ({ ...state, description: e.target.value}))}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} sx={{ color: '#222', '&:hover': {
                        backgroundColor: '#92cb6c',
                        boxShadow: 'none',}}}>
                            Cancelar
                    </Button>
                    <Button onClick={handleConfirm} sx={{ color: '#222', '&:hover': {
                        backgroundColor: '#92cb6c',
                        boxShadow: 'none',}}}>
                            Confirmar
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default ModalEdit;