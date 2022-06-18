import { CssBaseline, PaletteMode } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import React, { createContext, useEffect, useMemo, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './MuiClassNameSetup';
import DBottomBar from './components/DBottomBar';
import DNavbar from './components/DNavbar';
import HomePage from './pages/Home';
import MoviePage from './pages/Movie';
import NotFoundPage from './pages/NotFound';
import SeasonPage from './pages/Season';
import SeriePage from './pages/Series';
import Settings from './pages/Settings';
import SetupPage from './pages/Setup';
import darkTheme from './theme/darkTheme';
import lightTheme from './theme/lightTheme';
import DisconnectedPage from './pages/Disconnected';

// eslint-disable-next-line
const ColorModeContext = createContext({ toggleColorMode: () => {} });

const App = () => {
    const [mode, setMode] = useState<PaletteMode>('dark');

    useEffect(() => {
        document.title = 'DesterLib';
        let localTheme = localStorage.getItem('theme') || 'dark';
        localTheme = localTheme === 'light' ? 'light' : 'dark';
        setMode(localTheme as PaletteMode);
    }, []);

    const colorMode = useMemo(
        () => ({
            toggleColorMode: () => {
                let localTheme = localStorage.getItem('theme') || 'dark';
                localTheme = localTheme === 'light' ? 'dark' : 'light';
                localStorage.setItem('theme', localTheme);
                setMode((prevMode: string) => (prevMode === 'light' ? 'dark' : 'light'));
            },
        }),
        [],
    );

    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode,
                    ...(mode === 'light' ? lightTheme.palette : darkTheme.palette),
                },
                typography: {
                    fontFamily: `${
                        mode === 'light'
                            ? lightTheme.typography.fontFamily
                            : darkTheme.typography.fontFamily
                    }`,
                    button: {
                        textTransform: 'none',
                    },
                },
                shape: {
                    borderRadius:
                        mode === 'light'
                            ? lightTheme.shape.borderRadius
                            : darkTheme.shape.borderRadius,
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
                                background: `${
                                    mode === 'light'
                                        ? lightTheme.palette.background.paper
                                        : darkTheme.palette.background.paper
                                } !important`,
                            },
                            list: {
                                padding: 0,
                            },
                        },
                    },
                    MuiMenuItem: {
                        styleOverrides: {
                            root: {
                                borderRadius:
                                    mode === 'light'
                                        ? lightTheme.shape.borderRadius
                                        : darkTheme.shape.borderRadius,
                                transition: '0.2s ease-out',
                            },
                        },
                    },
                },
            }),
        [mode],
    );

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <BrowserRouter>
                    <DNavbar colorModeContext={ColorModeContext} themeMode={mode} />
                    <Routes>
                        <Route path='*' element={<NotFoundPage />} />
                        <Route path='/' element={<HomePage />} />
                        <Route path='/movie/:movieId' element={<MoviePage />} />
                        <Route path='/series/:seriesId' element={<SeriePage />} />
                        <Route
                            path='/series/:seriesId/season/:seasonNumber'
                            element={<SeasonPage />}
                        />
                        <Route path='/settings/*' element={<Settings />} />
                        <Route path='/setup' element={<SetupPage />} />
                        <Route path='/disconnected' element={<DisconnectedPage />} />
                    </Routes>
                    <DBottomBar />
                </BrowserRouter>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
};

export default App;
