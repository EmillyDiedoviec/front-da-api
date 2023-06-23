import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';

const settings = ['Logout'];

const ResponsiveAppBar: React.FC = () => {
    const navigate = useNavigate();
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        navigate('/login');
    };

    const handleClose = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar position="static" sx={{ backgroundColor: '#222122', position: 'fixed'}}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>

                    <Box sx={{ flexGrow: 1, display: 'flex' }}>
                        RECADOS
                    </Box>

                    <Typography
                        variant="body1"
                        component="a"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', sm: 'flex', alignSelf: 'center' },

                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Bem vindo(a)
                    </Typography>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar sx={{ color: '#9dd07b', bgcolor: '#65864f' }} src="/static/images/avatar/2.jpg" />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleClose}
                        >
                            {settings.map((setting) => (
                                <MenuItem key={setting}>
                                    <Typography onClick={handleCloseUserMenu} textAlign="center">
                                        {setting}
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default ResponsiveAppBar;
