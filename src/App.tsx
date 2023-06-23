import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import AppRoutes from './routes/AppRoutes';
import { persistor, store } from './store/store';
import { CssBaseline } from '@mui/material';

function App() {
    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <CssBaseline>
                    <AppRoutes />
                </CssBaseline>
            </PersistGate>
        </Provider>
    );
}

export default App;