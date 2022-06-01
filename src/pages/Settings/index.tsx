import { createTheme } from '@mui/material';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { ThemeProvider } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import { APP_API_PATH, APP_API_VERSION_PATH } from '../../config';
import NavBar from './components/NavBar';
import CategoryPage from './pages/CategoryPage';
import GDrive from './pages/GDrive';
import GDriveTokenGeneratorPage from './pages/GDriveTokenGeneratorPage';
import GenerateConfigPage from './pages/GenerateConfigPage';
import HomePage from './pages/HomePage';
import UIPage from './pages/UIPage';

const Settings = () => {
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [data, setData] = useState<any>({});

    useEffect(() => {
        const getData = async () => {
            const res = await fetch(`${APP_API_PATH}${APP_API_VERSION_PATH}/settings`);
            const data = (await res.json()) || {};
            setData(data.results || { ok: false });
            setIsLoaded(true);
        };
        getData();
    }, []);

    const theme = createTheme({
        palette: {
            mode: 'dark',
            primary: {
                main: '#14dca0',
            },
            background: {
                default: '#02090f',
                paper: '#06131c',
            },
        },
        shape: {
            borderRadius: 10,
        },
    });

    return isLoaded ? (
        <ThemeProvider theme={theme}>
            <NavBar>
                <Routes>
                    <Route path='/' element={<HomePage data={data} />} />
                    <Route path='/category' element={<CategoryPage data={data} />} />
                    <Route path='/ui' element={<UIPage data={data} />} />
                    <Route path='/gdrive' element={<GDrive data={data} />} />
                    <Route
                        path='/gdrive/tokens'
                        element={<GDriveTokenGeneratorPage data={data} />}
                    />
                    <Route path='/config' element={<GenerateConfigPage data={data} />} />
                </Routes>
            </NavBar>
        </ThemeProvider>
    ) : (
        <Box
            sx={{
                width: '100%',
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <CircularProgress />
        </Box>
    );
};

export default Settings;
