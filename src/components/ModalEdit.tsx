import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Box } from '@mui/system';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import NoteType from '../types/NoteType';
import { getNotesAsyncThunk, noteUpdateAsyncThunk } from '../store/modules/UserLogged';

interface ModalEditProps {
    openModal: boolean;
    actionConfirm: () => void;
    actionCancel: () => void;
    note: NoteType;
}

const ModalEdit: React.FC<ModalEditProps> = ({ openModal, actionCancel, actionConfirm, note }) => {
    const dispatch = useAppDispatch();
    const [noteEdit, setNoteEdit] = useState(note);
    const email = useAppSelector(state => state.userLogged.userLogged.email);

    const handleClose = () => {
        actionCancel();
    };

    const handleConfirm = () => {
        const updateNote = {
            id: noteEdit.id,
            email: email,
            title: noteEdit.title,
            description: noteEdit.description
        };

        dispatch(noteUpdateAsyncThunk(updateNote));
        setTimeout(() => {
            dispatch(getNotesAsyncThunk(updateNote.email));
        }, 200);
        actionConfirm();
    };

    return (
        <Box>
            <Dialog open={openModal} onClose={handleClose}>
                <DialogTitle>Recados</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        value={noteEdit.title}
                        margin="dense"
                        id="noteTitle"
                        label="Titulo do recado"
                        type={'text'}
                        fullWidth
                        variant="standard"
                        onChange={e => setNoteEdit(state => ({ ...state, title: e.target.value }))}
                    />
                    <TextField
                        value={noteEdit.description}
                        margin="dense"
                        id="noteDescription"
                        label="Descrição do recado"
                        type={'text'}
                        fullWidth
                        variant="standard"
                        onChange={e => setNoteEdit(state => ({ ...state, description: e.target.value }))}
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleClose}
                        sx={{
                            color: '#222',
                            '&:hover': {
                                backgroundColor: '#92cb6c',
                                boxShadow: 'none'
                            }
                        }}
                    >
                        Cancelar
                    </Button>
                    <Button
                        onClick={handleConfirm} sx={{
                            color: '#222',
                            '&:hover': {
                                backgroundColor: '#92cb6c',
                                boxShadow: 'none'
                            }
                        }}
                    >
                        Confirmar
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default ModalEdit;
