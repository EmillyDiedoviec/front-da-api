import { Alert, AlertTitle } from '@mui/material';
import React from 'react';

interface AlertsProps {
    title: string;
    text: string;
    type: 'error' | 'warning' | 'info' | 'success';
    onClose: () => void;
}

const Alerts: React.FC<AlertsProps> = ({ title, text, type, onClose }) => {
    return (
        <Alert onClose={onClose} severity={type} sx={{width: '400px', height: '90px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <AlertTitle>{title}</AlertTitle>
            {text}
        </Alert>
    );
};

export default Alerts;
