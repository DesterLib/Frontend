import { createTheme } from '@mui/material';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { ThemeProvider } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import { APP_API_PATH, APP_API_VERSION_PATH } from '../../config';
import NavBar from './components/NavBar';
import Auth0Page from './pages/Auth0Page';
import CategoryPage from './pages/CategoryPage';
import GDrive from './pages/GDrive';
import GDriveTokenGeneratorPage from './pages/GDriveTokenGeneratorPage';
import GenerateConfigPage from './pages/GenerateConfigPage';
import HomePage from './pages/HomePage';
import OneDrivePage from './pages/OneDrivePage';
import OtherPage from './pages/OtherPage';
import SharePointPage from './pages/SharePointPage';
import UIPage from './pages/UIPage';

const Settings = () => {
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [config, setConfig] = useState<any>({});
    const [refresh, setRefresh] = useState<number>(0);

    useEffect(() => {
        const getData = async () => {
            const res = await fetch(`${APP_API_PATH}${APP_API_VERSION_PATH}/settings`);
            const data = (await res.json()) || {};
            var tempConfig = data.result || {};
            if (!tempConfig.app) {
                tempConfig['app'] = {};
            }
            if (!tempConfig.auth0) {
                tempConfig['auth0'] = {};
            }
            if (!tempConfig.categories) {
                tempConfig['categories'] = [];
            }
            if (!tempConfig.gdrive) {
                tempConfig['gdrive'] = {};
            }
            if (!tempConfig.onedrive) {
                tempConfig['onedrive'] = {};
            }
            if (!tempConfig.sharepoint) {
                tempConfig['sharepoint'] = {};
            }
            if (!tempConfig.tmdb) {
                tempConfig['tmdb'] = {};
            }
            if (!tempConfig.build) {
                tempConfig['build'] = {};
            }
            if (!tempConfig.rclone) {
                tempConfig['rclone'] = {};
            }
            setConfig(tempConfig);
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

    const setApp = (appConfig: any) => {
        var newConfig = config;
        newConfig['app'] = appConfig;
        setConfig(newConfig);
    };

    const setAuth0 = (auth0Config: any) => {
        var newConfig = config;
        newConfig['auth0'] = auth0Config;
        setConfig(newConfig);
    };

    const setCategories = (categoriesConfig: any) => {
        var newConfig = config;
        newConfig['categories'] = categoriesConfig;
        setConfig(newConfig);
    };

    const setUi = (uiConfig: any) => {
        var newConfig = config;
        newConfig['ui'] = uiConfig;
        setConfig(newConfig);
    };

    const setGdrive = (gdriveConfig: any) => {
        var newConfig = config;
        newConfig['gdrive'] = gdriveConfig;
        setConfig(newConfig);
    };

    const setOnedrive = (onedriveConfig: any) => {
        var newConfig = config;
        newConfig['onedrive'] = onedriveConfig;
        setConfig(newConfig);
    };

    const setSharepoint = (sharepointConfig: any) => {
        var newConfig = config;
        newConfig['sharepoint'] = sharepointConfig;
        setConfig(newConfig);
    };

    const setTmdb = (tmdbConfig: any) => {
        var newConfig = config;
        newConfig['tmdb'] = tmdbConfig;
        setConfig(newConfig);
    };

    const setBuild = (buildConfig: any) => {
        var newConfig = config;
        newConfig['build'] = buildConfig;
        setConfig(newConfig);
    };

    const handleSave = () => {
        fetch(`${APP_API_PATH}${APP_API_VERSION_PATH}/settings`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(config),
        });
        setRefresh(refresh + 1);
    };

    const handleRebuild = () => {
        fetch(`${APP_API_PATH}${APP_API_VERSION_PATH}/rebuild`);
        setRefresh(refresh + 1);
    };

    return isLoaded ? (
        <ThemeProvider theme={theme}>
            <NavBar handleSave={handleSave}>
                <Routes>
                    <Route
                        path='/'
                        element={
                            <HomePage
                                handleRebuild={handleRebuild}
                                config={config.app}
                                updateConfig={setApp}
                            />
                        }
                    />
                    <Route
                        path='/auth0'
                        element={<Auth0Page config={config.auth0} updateConfig={setAuth0} />}
                    />
                    <Route
                        path='/categories'
                        element={
                            <CategoryPage config={config.categories} updateConfig={setCategories} />
                        }
                    />
                    <Route
                        path='/ui'
                        element={<UIPage config={config.io} updateConfig={setUi} />}
                    />
                    <Route
                        path='/gdrive'
                        element={<GDrive config={config.gdrive} updateConfig={setGdrive} />}
                    />
                    <Route
                        path='/gdrive/tokens'
                        element={<GDriveTokenGeneratorPage config={config.gdrive} />}
                    />
                    <Route
                        path='/onedrive'
                        element={
                            <OneDrivePage config={config.onedrive} updateConfig={setOnedrive} />
                        }
                    />
                    <Route
                        path='/sharepoint'
                        element={
                            <SharePointPage
                                config={config.sharepoint}
                                updateConfig={setSharepoint}
                            />
                        }
                    />
                    <Route
                        path='/other'
                        element={
                            <OtherPage
                                tmdb={config.tmdb}
                                build={config.build}
                                updateTmdb={setTmdb}
                                updateBuild={setBuild}
                            />
                        }
                    />
                    <Route path='/config' element={<GenerateConfigPage data={config} />} />
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
