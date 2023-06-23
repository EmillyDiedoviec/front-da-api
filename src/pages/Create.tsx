import { Grid } from '@mui/material';
import React from 'react';

import PersonAddAlt1OutlinedIcon from '@mui/icons-material/PersonAddAlt1Outlined';
import RegisterCont from '../components/RegisterCard';


const Create: React.FC = () => {
    return (
        <Grid container height="100vh" width="100vw" bgcolor="#65864f">
            <RegisterCont mode='create' icon={<PersonAddAlt1OutlinedIcon />} titleButton='Cadastrar' titleHeader='Criar conta'/>
        </Grid>
    );
};

export default Create;
