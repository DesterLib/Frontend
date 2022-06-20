import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import { Helmet } from '../../components/DHelmet';
import DLoader from '../../components/DLoader';
import { APP_API_PATH, APP_API_VERSION_PATH } from '../../config';
import NavBar from './components/NavBar';
import Auth0Page from './pages/Auth0Page';
import CategoryPage from './pages/CategoryPage';
import DevPage from './pages/DevPage';
import GDrive from './pages/GDrive';
import GDriveTokenGeneratorPage from './pages/GDriveTokenGeneratorPage';
import HomePage from './pages/HomePage';
import OneDrivePage from './pages/OneDrivePage';
import OtherPage from './pages/OtherPage';
import SharePointPage from './pages/SharePointPage';
import UIPage from './pages/UIPage';

const Settings = (props: any) => {
    const { colorModeContext, themeMode } = props;

    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [config, setConfig] = useState<any>({});
    const [requestInfo, setRequestInfo] = useState<any>({});
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
                code: data.code,
                message: data.message,
                ok: data.ok,
                time_taken: data.time_taken,
                title: data.title,
                description: data.description,
            };
            setRequestInfo(info);
            setIsLoaded(true);
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
        fetch(`${APP_API_PATH}${APP_API_VERSION_PATH}/settings`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(config),
        });
        setRefresh(refresh + 1);
    };

    return isLoaded ? (
        <Box>
            {' '}
            <Helmet>
                <meta name='description' content={requestInfo.description} />
                <title>{requestInfo.title}</title>
            </Helmet>
            <NavBar
                themeMode={themeMode}
                colorModeContext={colorModeContext}
                handleSave={handleSave}
            >
                <Routes>
                    <Route
                        path='/'
                        element={<HomePage config={config.app} updateConfig={setApp} />}
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
                        element={
                            <GDrive
                                config={config.gdrive}
                                updateConfig={setGdrive}
                                updateStateConfig={setConfig}
                            />
                        }
                    />
                    <Route
                        path='/gdrive/tokens'
                        element={
                            <GDriveTokenGeneratorPage config={config.gdrive} stateConfig={config} />
                        }
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
