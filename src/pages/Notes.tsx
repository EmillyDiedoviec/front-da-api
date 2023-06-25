import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FolderIcon from '@mui/icons-material/Folder';
import {
    Grid,
    Box,
    Typography,
    IconButton,
    Fab,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button
} from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import * as React from 'react';
import ModalInputs from '../components/ModalInput';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { useState } from 'react';
import NoteType from '../types/NoteType';
import ModalEdit from '../components/ModalEdit';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import { getTaskAsyncThunk, noteArchiveAsyncThunk, noteDeleteAsyncThunk } from '../store/modules/UserSlice';

const Notes: React.FC = () => {
    const [openAdd, setOpenAdd] = useState(false);
    const [openModalEdit, setOpenModalEdit] = useState(false);
    const [noteEdit, setNoteEdit] = useState<NoteType>({} as NoteType);
    const [deleteConfirm, setDeleteConfirm] = useState(false);
    const [thisNote, setThisNote] = useState<NoteType>({} as NoteType);
    const listNotes = useAppSelector(state => state.users.user.notes);
    const email = useAppSelector(state => state.users.user.email);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    /*     React.useEffect(() => {
        if (!userLogged) {
            navigate('/login');
        }
    }, []); */

    const handleClose = () => {
        setOpenAdd(false);
    };
    const addNotes = () => {
        setOpenAdd(false);
    };
    const openModalImput = () => {
        setOpenAdd(true);
    };

    const handleDelete = (item: NoteType) => {
        setThisNote(item);
        setDeleteConfirm(true);
    };

    const handleDeleteConfirm = () => {
        const deleteNote = {
            id: thisNote?.id,
            email
        };

        dispatch(noteDeleteAsyncThunk(deleteNote));
        setTimeout(() => {
            dispatch(getTaskAsyncThunk(deleteNote.email));
        }, 500);
        setDeleteConfirm(false);
    };

    const handleDeleteCancel = () => {
        setDeleteConfirm(false);
    };

    const handleEdit = (item: NoteType) => {
        setNoteEdit(item);
        setOpenModalEdit(true);
    };

    const handleCloseEdit = () => {
        setOpenModalEdit(false);
    };

    const addNotesEdit = () => {
        setOpenModalEdit(false);
    };

    const taskarchive = (id: string) => {
        const task = listNotes.find(item => item.id === id);
        if (task) {
            dispatch(noteArchiveAsyncThunk({ id: id, email: email }));
            setTimeout(() => {
                dispatch(getTaskAsyncThunk(email));
            }, 200);
        }
    };

    return (
        <Grid container sx={{ width: '100%', height: '100vh' }}>
            <Box width="100%" paddingTop="5rem" bgcolor="#65864f">
                <Grid container width="100%">
                    {listNotes.map(note => (
                        <Grid item xs={12} sm={6} md={3} key={note?.id} display="flex" justifyContent='center' flexDirection="row">
                            <Card
                                sx={{
                                    width: '310px',
                                    height: '180px',
                                    marginY: '25px',
                                    marginX: '15px',
                                    border: '8px double #65864f'
                                }}
                            >
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div" sx={{ wordWrap: 'break-word' }}>
                                        {note.title}
                                    </Typography>

                                    <Typography variant="body2" color="text.secondary" sx={{ wordWrap: 'break-word' }}>
                                        {note.description}
                                    </Typography>
                                </CardContent>
                                <CardActions sx={{ display: 'flex', marginTop: '-10px'}}>
                                    <IconButton 
                                        aria-label="edit"
                                        onClick={() => handleEdit(note)}>
                                        <EditIcon sx={{ color: '#424242'}} />
                                    </IconButton>
                                    <IconButton 
                                        aria-label="delete"
                                        onClick={() => handleDelete(note)}>
                                        <DeleteIcon sx={{ color: '#e40101'}} />
                                    </IconButton>
                                    <IconButton size="small" onClick={() => taskarchive(note.id)}>
                                        <FolderIcon />
                                    </IconButton>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>

            <Fab
                onClick={openModalImput}
                color="info"
                aria-label="add"
                sx={{
                    position: 'fixed',
                    right: '20px',
                    bottom: '20px',
                    bgcolor: '#222',
                    width: '80px',
                    height: '80px',
                    boxShadow: '5px 10px 20px rgba(0, 0, 0, 0.301), 5px 10px 20px rgba(0, 0, 0, 0.301);'
                }}
            >
                {<AddIcon fontSize="large" />}
            </Fab>
            {openModalEdit && (
                <ModalEdit
                    openModal={openModalEdit}
                    actionConfirm={addNotesEdit}
                    actionCancel={handleCloseEdit}
                    note={noteEdit}
                />
            )}

            <ModalInputs openModal={openAdd} actionConfirm={addNotes} actionCancel={handleClose} />

            <Dialog open={deleteConfirm} onClose={handleDeleteCancel}>
                <DialogTitle>Confirmar exclusão</DialogTitle>
                <DialogContent>Deseja mesmo excluir o recado {thisNote?.title}?</DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleDeleteCancel}
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
                    <Button onClick={handleDeleteConfirm} 
                        sx={{
                            color: '#cb1f1f',
                            '&:hover': { color: '#000000', backgroundColor: '#cb1f1f', boxShadow: 'none' }
                        }}
                    >
                        Excluir
                    </Button>
                </DialogActions>
            </Dialog>
        </Grid>
    );
};

export default Notes;
