import { Grid,} from '@mui/material';
import React from 'react';
import FingerprintOutlinedIcon from '@mui/icons-material/FingerprintOutlined';
import RegisterCont from '../components/RegisterCard';

const Login: React.FC = () => {
    return (
        <Grid container height="100vh" width="100vw" bgcolor="#65864f">
            <RegisterCont mode='login' icon={<FingerprintOutlinedIcon />} titleButton='Logar' titleHeader='Faça o Login'/>
        </Grid>
    );
    
};

export default Login;
