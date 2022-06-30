import { Alert, Box, Button, Snackbar, TextField } from '@mui/material';
import React, { SyntheticEvent, useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

const GDrivePage = (props: any) => {
    const [searchParams] = useSearchParams();
    const tempAuthCode = searchParams.get('code') || '';
    const state = searchParams.get('state');

    const [refresh, setRefresh] = useState<number>(0);
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [authCode] = useState<string>(tempAuthCode);
    const [openSnackBar, setOpenSnackBar] = useState(
        !!new URLSearchParams(window.location.search).get('gdrive_accessToken'),
    );

    const { config, updateConfig, updateStateConfig } = props;

    useEffect(() => {
        if (state) {
            const stateConfig = JSON.parse(state) || {};
            const newConfig = JSON.parse(sessionStorage.getItem(stateConfig.uid) || config);
            updateStateConfig(newConfig);
            setIsLoaded(true);
        } else {
            setIsLoaded(true);
        }
        if (authCode && isLoaded) {
            tradeAuthCode();
        }
        window.history.pushState({}, document.title, '/settings/gdrive');
    }, [state, isLoaded]);

    const objToFormEncoded = (object: object) => {
        return Object.entries(object)
            .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
            .join('&');
    };

    const tradeAuthCode = async () => {
        const body = {
            grant_type: 'authorization_code',
            redirect_uri: `${window.location.origin}/callback`,
            code: authCode,
        };
        await requestTokens(body);
    };

    const requestTokens = async (body: any) => {
        const response = await fetch('https://accounts.google.com/o/oauth2/token', {
            method: 'POST',
            headers: {
                Authorization: `Basic ${btoa(`${config.client_id}:${config.client_secret}`)}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: objToFormEncoded(body),
        });
        if (!response.ok) {
            const responseText = await response.text();
            console.error(responseText);
        }
        try {
            const { access_token, refresh_token } = await response.json();
            handleChangeAccessToken({ target: { value: access_token } });
            handleChangeRefreshToken({ target: { value: refresh_token } });
        } catch (err) {
            const responseText = await response.text();
            console.error(responseText);
        }
    };

    const handleCloseSnackBar = (event?: SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackBar(false);
    };

    const handleChangeClientId = (event: any) => {
        var newConfig = config;
        newConfig['client_id'] = event.target.value;
        updateConfig(newConfig);
        setRefresh(refresh + 1);
    };

    const handleChangeClientSecret = (event: any) => {
        var newConfig = config;
        newConfig['client_secret'] = event.target.value;
        updateConfig(newConfig);
        setRefresh(refresh + 1);
    };

    const handleChangeAccessToken = (event: any) => {
        var newConfig = config;
        newConfig['access_token'] = event.target.value;
        updateConfig(newConfig);
        setRefresh(refresh + 1);
    };

    const handleChangeRefreshToken = (event: any) => {
        var newConfig = config;
        newConfig['refresh_token'] = event.target.value;
        updateConfig(newConfig);
        setRefresh(refresh + 1);
    };

    const textFieldStyles = {
        marginBottom: '20px',
    };

    return (
        <Box>
            <Snackbar
                open={openSnackBar}
                autoHideDuration={2000}
                onClose={handleCloseSnackBar}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert onClose={handleCloseSnackBar} severity='success' sx={{ width: '100%' }}>
                    All Tokens Generated Successfully!
                </Alert>
            </Snackbar>
            <Link style={{ textDecoration: 'none', width: '100%', color: '#ffffff' }} to='tokens'>
                <Button variant='contained' sx={{ marginBottom: '20px' }}>
                    Auto Generate Google Drive Tokens
                </Button>
            </Link>
            <Box>
                <TextField
                    sx={textFieldStyles}
                    fullWidth
                    label='Client ID'
                    value={config.client_id}
                    onChange={handleChangeClientId}
                />
                <TextField
                    sx={textFieldStyles}
                    fullWidth
                    label='Client Secret'
                    value={config.client_secret}
                    onChange={handleChangeClientSecret}
                />
                <TextField
                    sx={textFieldStyles}
                    fullWidth
                    label='Access Token'
                    value={config.access_token}
                    onChange={handleChangeAccessToken}
                />
                <TextField
                    sx={textFieldStyles}
                    fullWidth
                    label='Refresh token'
                    value={config.refresh_token}
                    onChange={handleChangeRefreshToken}
                />
            </Box>
        </Box>
    );
};
export default GDrivePage;
