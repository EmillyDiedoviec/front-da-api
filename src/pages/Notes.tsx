import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FolderIcon from '@mui/icons-material/Folder';
import FolderOffIcon from '@mui/icons-material/FolderOff';
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
    Button,
    Container,
    TextField,
    Checkbox,
    ListItemAvatar
} from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import * as React from 'react';
import ModalInputs from '../components/ModalInput';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { useEffect, useState } from 'react';
import NoteType from '../types/NoteType';
import ModalEdit from '../components/ModalEdit';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import { getNotesAsyncThunk, noteArchiveAsyncThunk, noteDeleteAsyncThunk } from '../store/modules/UserLogged';

const Notes: React.FC = () => {
    const [openAdd, setOpenAdd] = useState(false);
    const [openModalEdit, setOpenModalEdit] = useState(false);
    const [noteEdit, setNoteEdit] = useState<NoteType>({} as NoteType);
    const [deleteConfirm, setDeleteConfirm] = useState(false);
    const [thisNote, setThisNote] = useState<NoteType>({} as NoteType);
    const listNotes = useAppSelector(state => state.userLogged.userLogged.notes);
    const email = useAppSelector(state => state.userLogged.userLogged.email);
    const archivedNotes = listNotes.filter(item => item.archived);
    const [showArchived, setShowArchived] = useState(false);
    const [filterTask, setFilterTask] = useState('');
    const user = useAppSelector(state => state.userLogged.userLogged);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user.email) {
            navigate('/login');
        }
    }, []);

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
            dispatch(getNotesAsyncThunk(deleteNote.email));
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

    const noteArchived = (id: string) => {
        if (archivedNotes) {
            dispatch(noteArchiveAsyncThunk({ id: id, email: email }));
            setTimeout(() => {
                dispatch(getNotesAsyncThunk(email));
            }, 200);
        }
    };

    const handleShowArchivedChange = () => {
        setShowArchived(!showArchived);
    };

    return (
        <Grid container sx={{ width: '100%', height: '100vh' }}>
            <Box width="100%" paddingTop="5rem" bgcolor="#65864f">
                <Grid container marginBottom={10}>
                    <Grid item xs={12}>
                        <Container sx={{ marginTop: '20px' }}>
                            <Grid container spacing={3}>
                                <Grid item xs={10} display="flex" justifyContent='flex-start' alignItems="center">
                                    <Typography variant='h4'>Todos os recados {/* TODO se estiver nos arquivados mudar para arquivados */} </Typography>
                                </Grid>
                                <Grid item xs={2} display='flex' justifyContent="flex-end" alignItems="center">
                                    <Box component="form" width="280px" marginX="10px">
                                        <TextField
                                            label="Pesquisar recado"
                                            sx={{'width': '280px',
                                                ':hover': {
                                                    border: '#222122',
                                                },
                                                '& .MuiFilledInput-underline:after': {
                                                    borderBottomColor: '#222122'
                                                },
                                                '& label.Mui-focused': {
                                                    color: '#222122'
                                                },
                                                
                                            }}
                                            variant="filled"
                                            onChange={e => setFilterTask(e.target.value)}
                                            value={filterTask}
                                            InputLabelProps={{
                                                style: { color: 'black' }
                                            }}
                                        />
                                    </Box>
                                </Grid>
                                <Grid container width="100%">
                                    {showArchived
                                        ? archivedNotes.filter(note => {
                                            if (filterTask) {
                                                return note.title.includes(filterTask);
                                            }
                                            return true;
                                        }).map(note => (
                                            <Grid item xs={12} sm={6} md={3} key={note?.id} display="flex" justifyContent='center' flexDirection="row">
                                                <Card
                                                    sx={{
                                                        width: '300px',
                                                        height: '170px',
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
                                                        <ListItemAvatar>
                                                            <IconButton onClick={() => noteArchived(note.id)}>
                                                                {note.archived ? (
                                                                    <>
                                                                        <FolderIcon sx={{color: 'black'}} />
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <FolderOffIcon sx={{color: 'gray'}}/>
                                                                    </>
                                                                )}
                                                            </IconButton>
                                                        </ListItemAvatar>
                                                    </CardActions>
                                                </Card>
                                            </Grid>
                                        ))
                                        :listNotes.filter(note => {
                                            if (filterTask) {
                                                return note.title.includes(filterTask);
                                            }
                                            return true;
                                        }).map(note => (
                                            <Grid item xs={12} sm={6} md={3} key={note?.id} display="flex" justifyContent='center' flexDirection="row">
                                                <Card
                                                    sx={{
                                                        width: '300px',
                                                        height: '170px',
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
                                                    <CardActions sx={{ display: 'flex', marginTop: '-10px', justifyContent: 'space-between', width: '80px'}}>
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
                                                        <ListItemAvatar>
                                                            <IconButton onClick={() => noteArchived(note.id)}>
                                                                {note.archived ? (
                                                                    <>
                                                                        <FolderIcon sx={{color: 'black'}} />
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <FolderOffIcon sx={{color: 'gray'}}/>
                                                                    </>
                                                                )}
                                                            </IconButton>
                                                        </ListItemAvatar>

                                                    </CardActions>
                                                </Card>
                                            </Grid>
                                        ))}
                                
                                </Grid>
                            </Grid>
                        </Container>
                    </Grid>
                </Grid>

            </Box>

            <Grid item xs={12} display="flex" justifyContent="flex-end" sx={{
                position: 'fixed',
                right: '43px',
                bottom: '70px',
                width: '80px',
                height: '80px',}}>
                <Box>
                    <Checkbox 
                        icon={
                            <FolderOffIcon 
                                color='disabled' 
                                sx={{'width': '35px', 'height': '35px'}}/>}

                        checkedIcon={
                            <FolderIcon 
                                sx={{'width': '35px', 'height': '35px', 'color': '#2f4123'}}/>} 
                        checked={showArchived}
                        sx={{'width': '35px', 'height': '35px'}} 
                        onClick={handleShowArchivedChange}/>
                </Box>
            </Grid>
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
                    ':hover': {
                        backgroundColor: '#141313',
                    },
                    boxShadow: '5px 10px 20px rgba(0, 0, 0, 0.301), 5px 10px 20px rgba(0, 0, 0, 0.301),'
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