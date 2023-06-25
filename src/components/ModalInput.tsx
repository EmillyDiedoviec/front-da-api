import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Box } from '@mui/system';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import NoteType from '../types/NoteType';
import { getTaskAsyncThunk, noteCreateAsyncThunk } from '../store/modules/UserSlice';

interface ModalInputsProps {
    openModal: boolean;
    actionConfirm: () => void;
    actionCancel: () => void;
}

const ModalInputs: React.FC<ModalInputsProps> = ({ openModal, actionCancel, actionConfirm }) => {
    const dispatch = useAppDispatch();
    const [note, setNote] = useState({} as NoteType);
    const email = useAppSelector(state => state.users.user.email);

    const handleClose = () => {
        setNote({
            id: '',
            title: '',
            description: '',
            archived: false
        });
        actionCancel();
    };

    const handleChange = (ev: { target: { name: string; value: string } }) => {
        setNote(state => ({ ...state, [ev.target.name]: ev.target.value }));
    };


    const handleConfirm = () => {
        setNote({
            id: '',
            title: '',
            description: '',
            archived: false
        });

        const newTask = {
            title: note.title,
            description: note.description,
            email
        };

        dispatch(noteCreateAsyncThunk(newTask))
            .then(() => {
                // Recado criado com sucesso, faça qualquer ação adicional necessária
                dispatch(getTaskAsyncThunk(email)); // Atualizar a lista de recados após a criação do novo recado
                actionCancel(); // Fechar o modal após a criação do novo recado
            })
            .catch((error) => {
                // Lidar com qualquer erro que ocorrer durante a criação do recado
                console.error('Erro ao criar recado:', error);
            });
    };

    return (
        <Box>
            <Dialog open={openModal} onClose={handleClose}>
                <DialogTitle>Recados</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        value={note.title}
                        margin="dense"
                        id="noteTitle"
                        label="Titulo do recado"
                        type={'text'}
                        fullWidth
                        name="title"
                        variant="standard"
                        onChange={handleChange}
                    />
                    <TextField
                        value={note.description}
                        margin="dense"
                        id="noteDescription"
                        label="Descrição do recado"
                        type={'text'}
                        fullWidth
                        name="description"
                        variant="standard"
                        onChange={handleChange}
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
                        onClick={handleConfirm}
                        sx={{
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

export default ModalInputs;
