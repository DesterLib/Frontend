import { Box, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

import { Helmet } from '../../components/DHelmet';
import DLoader from '../../components/DLoader';
import { APP_API_PATH, APP_API_VERSION_PATH, APP_DESCRIPTION, APP_NAME } from '../../config';
import NavBar from './components/NavBar';
import AppPage from './pages/App';
import Auth0Page from './pages/Auth0';
import CategoriesPage from './pages/Categories';
import DevPage from './pages/Dev';
import InterfacePage from './pages/Interface';
import OtherPage from './pages/Other';
import ProvidersPage from './pages/Providers';
import GDriveTokenGeneratorPage from './pages/Providers/GDriveTokenGeneratorPage';
import OneDriveTokenGenerator from './pages/Providers/OneDriveTokenGeneratorPage';

const Settings = (props: any) => {
    const { colorModeContext, themeMode } = props;
    const navigate = useNavigate();
    const theme = useTheme();

    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [config, setConfig] = useState<any>({});
    const [secretKey, setSecretKey] = useState<string>('');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [requestInfo, setRequestInfo] = useState<any>({});
    const [refresh, setRefresh] = useState<number>(0);

    useEffect(() => {
        const getData = async () => {
            const { value: secretKey } = await Swal.fire({
                title: 'Secret Key',
                input: 'text',
                inputLabel: 'Your secret key',
                inputValue: '',
                showCancelButton: true,
                confirmButtonColor: theme.palette.primary.dark,
            });
            setSecretKey(secretKey);
            const res = await fetch(
                `${APP_API_PATH}${APP_API_VERSION_PATH}/settings?secret_key=${secretKey}`,
            );
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
            if (!tempConfig.subtitles) {
                tempConfig['subtitles'] = {};
            }
            if (!tempConfig.build) {
                tempConfig['build'] = {};
            }
            if (!tempConfig.rclone) {
                tempConfig['rclone'] = {};
            }
            setConfig(tempConfig);
            const info = {
                code: data.code || 500,
                message: data.message || '',
                ok: data.ok || false,
                time_taken: data.time_taken || 0,
                title: data.title,
                description: data.description,
            };
            setRequestInfo(info);
            if (info.ok) {
                setIsLoaded(true);
            } else if (info.code == 401) {
                Swal.fire({
                    title: 'Error!',
                    text: info.message,
                    icon: 'error',
                    confirmButtonText: 'Ok',
                    confirmButtonColor: theme.palette.primary.dark,
                });
                navigate('/');
            } else {
                Swal.fire({
                    title: 'Error!',
                    text: 'Something went wrong.',
                    icon: 'error',
                    confirmButtonText: 'Ok',
                    confirmButtonColor: theme.palette.primary.dark,
                });
            }
        };
        getData();
    }, []);

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

    const setTmdb = (tmdbConfig: any) => {
        var newConfig = config;
        newConfig['tmdb'] = tmdbConfig;
        setConfig(newConfig);
    };

    const setSubtitles = (subtitlesConfig: any) => {
        var newConfig = config;
        newConfig['subtitles'] = subtitlesConfig;
        setConfig(newConfig);
    };

    const setBuild = (buildConfig: any) => {
        var newConfig = config;
        newConfig['build'] = buildConfig;
        setConfig(newConfig);
    };

    const handleSave = () => {
        fetch(`${APP_API_PATH}${APP_API_VERSION_PATH}/settings?secret_key=${secretKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(config),
        });
        setSecretKey(config.app.secret_key || '');
        setRefresh(refresh + 1);
    };

    return isLoaded ? (
        <Box>
            {' '}
            <Helmet>
                <title>{APP_NAME}</title>
                <meta name='description' content={APP_DESCRIPTION} />
            </Helmet>
            <NavBar
                themeMode={themeMode}
                colorModeContext={colorModeContext}
                handleSave={handleSave}
            >
                <Routes>
                    <Route
                        path='/'
                        element={<AppPage config={config.app} updateConfig={setApp} />}
                    />
                    <Route
                        path='/auth0'
                        element={<Auth0Page config={config.auth0} updateConfig={setAuth0} />}
                    />
                    <Route
                        path='/categories'
                        element={
                            <CategoriesPage
                                config={config.categories}
                                updateConfig={setCategories}
                            />
                        }
                    />
                    <Route
                        path='/interface'
                        element={<InterfacePage config={config.ui} updateConfig={setUi} />}
                    />
                    <Route
                        path='/providers'
                        element={<ProvidersPage config={config} updateConfig={setConfig} />}
                    />
                    <Route
                        path='/providers/gdrive'
                        element={
                            <GDriveTokenGeneratorPage config={config} updateConfig={setConfig} />
                        }
                    />
                    <Route
                        path='/providers/onedrive'
                        element={<OneDriveTokenGenerator config={config} />}
                    />
                    <Route
                        path='/other'
                        element={
                            <OtherPage
                                tmdb={config.tmdb}
                                subtitles={config.subtitles}
                                build={config.build}
                                updateTmdb={setTmdb}
                                updateSubtitles={setSubtitles}
                                updateBuild={setBuild}
                            />
                        }
                    />
                    <Route path='/dev' element={<DevPage />} />
                </Routes>
            </NavBar>
        </Box>
    ) : (
        <DLoader />
    );
};

export default Settings;
