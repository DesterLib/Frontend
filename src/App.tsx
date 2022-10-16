import { CssBaseline, ThemeProvider } from '@mui/material';
import darkTheme from './app/theme/darkTheme';
import lightTheme from './app/theme/lightTheme';
import { Provider, useSelector } from 'react-redux';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import AppShell from './components/appshell';
import store from 'app/redux/store';
import app from 'app/config';

const MainApp = () => {
    const currentTheme = useSelector((state: any) => state.theme.darkMode);
    return (
        <ThemeProvider theme={currentTheme ? lightTheme : darkTheme}>
            <CssBaseline />
            <BrowserRouter>
                <AppShell>
                    <Routes>
                        {app &&
                            app.routes &&
                            app.routes.map((route, key) => (
                                <Route key={key} path={route.path} element={<route.element />} />
                            ))}
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
