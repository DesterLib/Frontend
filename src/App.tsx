import { CssBaseline, ThemeProvider } from '@mui/material';
import HomePage from 'pages/HomePage';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const App = () => {
    return (
        <ThemeProvider theme='light'>
            <CssBaseline />
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<HomePage />} />
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
};

export default App;
