import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';
import { useAppDispatch } from '../store/hooks';
import Alerts from './Alerts';
import { getNotesAsyncThunk, loginAsyncThunk, userCreateAsyncThunk } from '../store/modules/UserLogged';

interface FormProps {
    textButton: string;
    mode: 'login' | 'create';
}

const Form: React.FC<FormProps> = ({ textButton, mode }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repassword, setRepassword] = useState('');
    const [errorEmail, setErrorEmail] = useState(false);
    const [errorPassword, setErrorPassword] = useState(false);
    const [errorRepassword, setErrorRepassword] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const userlogged = useAppSelector(state => state.userLogged.userLogged);
    const listUsers =  useAppSelector(state => state.users.users);
    
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [alertSucess, setAlertSucess] = useState(false);
    const [alertError, setAlertError] = useState(false);
    const [alertErrorExist, setAlertErrorExist] = useState(false);

    useEffect(() => {
        if (mode === 'create') {
            const emailValid = email.includes('.com') || (email.includes('.com.br') && email.includes('@'));
            // TODO fazer verificação de email com maiscula e miniscula

            if (email.length > 0) {
                setErrorEmail(!emailValid);
            }

            const passwordValid = password.length >= 6;
            if (password.length > 0) {
                setErrorPassword(!passwordValid);
            }

            const repasswordValid = password === repassword;
            if (repassword.length > 0) {
                setErrorRepassword(!repasswordValid);
            }

            setDisabled(!(emailValid && passwordValid && repasswordValid));
        }
    }, [email, password, repassword, mode]);

    useEffect(() => {
        if (userlogged.email) {
            navigate('/notes');
        }
    }, [userlogged]);

    function handleSubmit(evento: React.FormEvent<HTMLFormElement>) {
        evento.preventDefault();

        if (mode === 'login') {
            const user = {
                email: email,
                password: password
            };

            const userExist = listUsers.find(
                (value) =>
                    value.email === user.email &&
                            value.password === user.password
            );
            if (!userExist) {
                setAlertError(true);
                setTimeout(() => {
                    setAlertError(false);
                }, 5000);
                return;
            } 

            dispatch(loginAsyncThunk(user));
            dispatch(getNotesAsyncThunk(email));
        } else {
            const newUser = {
                email,
                password,
                repassword,
            };

            const retorno = listUsers.some(
                (value) => value.email === newUser.email
            );
            if (retorno) {
                setAlertErrorExist(true);
                setTimeout(() => {
                    setAlertErrorExist(false);
                }, 5000);
                return;
            }
        
            setAlertSucess(true);
            setTimeout(() => {
                setAlertSucess(false);
            }, 5000);
            
            dispatch(userCreateAsyncThunk({ email, password, repassword }));

            setTimeout(() => {
                navigate('/login');
            }, 1000);
        }
    }

    return (
        <Box component="form" marginTop={2} width="100%" height="100%" onSubmit={ev => handleSubmit(ev)}>
            <TextField
                error={errorEmail}
                helperText={errorEmail ? 'E-mail inválido' : ''}
                value={email}
                variant="outlined"
                type="email"
                required
                id="email"
                label="E-mail"
                fullWidth
                onChange={ev => setEmail(ev.target.value)}
                sx={{ my: '5px' }}
            />

            <TextField
                error={errorPassword}
                helperText={errorPassword ? 'Senha deve conter ao menos 6 caracteres' : ''}
                value={password}
                variant="outlined"
                type="password"
                required
                id="password"
                label="Senha"
                fullWidth
                onChange={ev => setPassword(ev.target.value)}
                sx={{ my: '5px' }}
            />

            {mode === 'create' && (
                <TextField
                    error={errorRepassword}
                    helperText={errorRepassword ? 'As senhas não coincidem' : ''}
                    value={repassword}
                    margin="normal"
                    variant="outlined"
                    type="password"
                    required
                    id="repassword"
                    label="Repetir Senha"
                    fullWidth
                    onChange={ev => setRepassword(ev.target.value)}
                    sx={{ my: '5px' }}
                />
            )}

            <Grid container justifyContent="center">
                <Grid item xs={12} textAlign="center">
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={disabled}
                        sx={{
                            my: 3,
                            padding: '10px',
                            borderRadius: '8px',
                            width: '70%',
                            backgroundColor: '#9dd07b',
                            color: 'black',
                            fontSize: '20px',
                            boxShadow: 'none',
                            '&:hover': {
                                backgroundColor: '#92cb6c',
                                boxShadow: 'none'
                            }
                        }}
                    >
                        {textButton}
                    </Button>
                </Grid>

                <Grid item xs={12} textAlign="end">
                    {mode === 'login' ? (
                        <Typography textAlign="center" variant="body1">
                            <Link style={{ color: 'black', textDecoration: 'none' }} to="/">
                                Não tem uma conta? Cadastre-se!
                            </Link>
                        </Typography>
                    ) : (
                        <Typography textAlign="center" variant="body1">
                            <Link style={{ color: 'black', textDecoration: 'none' }} to="/login">
                                Já tem uma conta? Entre agora mesmo!
                            </Link>
                        </Typography>
                    )}
                </Grid>
            </Grid>
            <Box sx={{ position: 'absolute', top: '10px', right: '10px' }}>
                {alertSucess && (
                    <Alerts
                        onClose={() => setAlertSucess(false)}
                        text="Conta criada com sucesso!"
                        title="Sucesso!!!"
                        type="success"
                    />
                )}

                {alertError && (
                    <Alerts
                        onClose={() => setAlertError(false)}
                        text="E-mail ou senha incorretos!"
                        title="!ERRO!"
                        type="error"
                    />
                )}

                {alertErrorExist && (
                    <Alerts
                        onClose={() => setAlertErrorExist(false)}
                        text="E-mail já cadastrado!"
                        title="!ERRO!"
                        type="error"
                    />
                )}
            </Box>
        </Box>
    );
};

export default Form;
