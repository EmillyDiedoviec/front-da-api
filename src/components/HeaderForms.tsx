import { Avatar, Typography } from '@mui/material';
import React from 'react';

interface HeaderFormsProps {
  title: string;
  icon: React.ReactNode;
  color: string;
}

const HeaderForms: React.FC<HeaderFormsProps> = ({ title, icon, color }) => {
    return (
        <>
            <Avatar sx={{bgcolor: color, width:'55px', height:'55px', marginBottom:'5px'}}>
                {icon}
            </Avatar>
            <Typography variant='h4'>{title}</Typography>
        </>
    );
};

export default HeaderForms;
