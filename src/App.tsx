import { CssBaseline, ThemeProvider } from '@mui/material';
import darkTheme from './main/theme/darkTheme';
import lightTheme from './main/theme/lightTheme';
import HomePage from './pages/HomePage';
import { Provider, useSelector } from 'react-redux';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import AppShell from './components/appshell';
import store from 'main/redux/store';

const MainApp = () => {
    const currentTheme = useSelector((state: any) => state.theme.darkMode);
    return (
        <ThemeProvider theme={currentTheme ? lightTheme : darkTheme}>
            <CssBaseline />
            <BrowserRouter>
                <AppShell>
                    <Routes>
                        <Route path='/' element={<HomePage />} />
                    </Routes>
                </AppShell>
            </BrowserRouter>
        </ThemeProvider>
    );
};

const App = () => {
    return (
        <Provider store={store}>
            <MainApp />
        </Provider>
    );
};

export default App;
