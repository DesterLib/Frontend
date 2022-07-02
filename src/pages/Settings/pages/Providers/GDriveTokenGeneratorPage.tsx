import { Box, Button, Typography, useTheme } from '@mui/material';
import TextField from '@mui/material/TextField';
import React, { useState } from 'react';

import guid from '../../../../utilities/guid';

const GDriveTokenGenerator = (props: any) => {
    const { config } = props;
    const theme = useTheme();

    const [clientId, setClientId] = useState<string>(config.gdrive.client_id || '');
    const [clientSecret, setClientSecret] = useState<string>(config.gdrive.client_secret || '');

    const objToFormEncoded = (object: object) => {
        return Object.entries(object)
            .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
            .join('&');
    };

    const getAuthCode = async (event: any) => {
        event.preventDefault();
        const state = {
            uid: guid(),
            provider: 'gdrive',
            setup: window.location.pathname.includes('setup'),
        };
        const query = objToFormEncoded({
            response_type: 'code',
            redirect_uri: `${window.location.origin}/callback`,
            client_id: clientId,
            scope: 'https://www.googleapis.com/auth/drive',
            access_type: 'offline',
            prompt: 'consent',
            state: JSON.stringify(state),
        });
        sessionStorage.setItem(state.uid, JSON.stringify(config));
        window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?${query}`;
    };

    const handleChangeClientId = (event: any) => {
        setClientId(event.target.value);
    };

    const handleChangeClientSecret = (event: any) => {
        setClientSecret(event.target.value);
    };

    const boxContainer = {
        padding: '20px',
        borderRadius: theme.shape.borderRadius,
        maxWidth: '1000px',
        margin: 'auto auto',
        marginTop: '40px',
    };

    const textFieldStyles = {
        marginBottom: '20px',
    };

    return (
        <Box sx={boxContainer}>
            <Typography sx={{ margin: '20px 0px 40px 0px' }} variant='h3'>
                Generate Google Drive Tokens
            </Typography>
            <form onSubmit={getAuthCode} method='POST'>
                <Box>
                    <TextField
                        sx={textFieldStyles}
                        fullWidth
                        label='Client Id'
                        variant='outlined'
                        value={clientId}
                        onChange={handleChangeClientId}
                    />
                    <TextField
                        sx={textFieldStyles}
                        fullWidth
                        label='Client Secret'
                        variant='outlined'
                        value={clientSecret}
                        onChange={handleChangeClientSecret}
                    />
                    <TextField
                        sx={textFieldStyles}
                        fullWidth
                        label='Scope'
                        variant='outlined'
                        value='https://www.googleapis.com/auth/drive'
                        disabled
                    />
                </Box>
                <Button type='submit'>Submit</Button>
            </form>
        </Box>
    );
};

export default GDriveTokenGenerator;
