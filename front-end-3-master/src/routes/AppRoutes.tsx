import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from '../pages/Login';
import DefaultLayout from '../config/layout/DefaultLayout';
import Create from '../pages/Create';
import Notes from '../pages/Notes';

const AppRoutes: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Create />} />
                <Route path="/notes" element={<DefaultLayout component={Notes} />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;
