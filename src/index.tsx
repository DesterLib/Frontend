import { CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import Home from './pages/Home';
import NotFoundPage from './pages/NotFoundPage';
import './styles/globals.css';

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#33FFC2',
            light: '#66FFD1',
            dark: '#00FFB3',
        },
        secondary: {
            main: '#FF3396',
            light: '#FF66B0',
            dark: '#FF007A',
        },
        background: {
            paper: '#174453',
            default: '#00151C',
        },
    },
    shape: {
        borderRadius: 3,
    },
    typography: {
        fontFamily: '"Rubik", sans-serif',
        button: {
            textTransform: 'none',
        },
    },
    components: {
        MuiMenu: {
            styleOverrides: {
                root: {
                    padding: '20px',
                },
                paper: {
                    margin: '0px',
                    padding: '8px',
                    background: '#174453 !important',
                },
                list: {
                    padding: 0,
                },
            },
        },
        MuiMenuItem: {
            styleOverrides: {
                root: {
                    borderRadius: '5px',
                    transition: '0.2s ease',
                },
            },
        },
    },
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <BrowserRouter>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Routes>
                <Route path='*' element={<NotFoundPage />} />
                <Route path='/' element={<Home />} />
            </Routes>
        </ThemeProvider>
    </BrowserRouter>,
);
