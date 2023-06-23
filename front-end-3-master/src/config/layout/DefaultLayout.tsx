import { Container, Grid } from '@mui/material';
import React from 'react';
import ResponsiveAppBar from '../../components/AppBarDefault';

interface DefaultLayoutProps {
    component: React.FC;
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ component: Component }) => {
    return (
        <Grid container style={{ height: '100vh', maxWidth: '100vw' }}>
            <Grid item xs={12}>
                <ResponsiveAppBar />
                {/*  /* emailUsuarioLogado={usuarioLogado.email} */}
            </Grid>

            <Grid item xs={12}>
                <Component />
            </Grid>
        </Grid>
    );
};

export default DefaultLayout;
