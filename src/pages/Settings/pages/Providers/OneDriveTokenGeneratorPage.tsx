import { Box, Button, Typography, useTheme } from '@mui/material';
import TextField from '@mui/material/TextField';
import React, { useState } from 'react';

import guid from '../../../../utilities/guid';

const OneDriveTokenGenerator = (props: any) => {
    const { config } = props;
    const theme = useTheme();

    const [clientId, setClientId] = useState<string>(config.onedrive.client_id || '');

    const objToFormEncoded = (object: object) => {
        return Object.entries(object)
            .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
            .join('&');
    };

    const getAuthCode = async (event: any) => {
        event.preventDefault();
        const state = {
            uid: guid(),
            provider: 'onedrive',
            setup: window.location.pathname.includes('setup'),
        };
        const query = objToFormEncoded({
            response_type: 'code',
            redirect_uri: `${window.location.origin}/callback`,
            client_id: clientId,
            scope: 'Files.Read Files.ReadWrite Files.Read.All Files.ReadWrite.All Sites.Read.All offline_access',
            code_challenge: 'ehti8jnG5bgwl38yzORUxLr3c9FJdFv37ScKK6SJDV8',
            code_challenge_method: 'S256',
            access_type: 'offline',
            prompt: 'consent',
            state: JSON.stringify(state),
        });
        sessionStorage.setItem(state.uid, JSON.stringify(config));
        window.location.href = `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?${query}`;
    };

    const handleChangeClientId = (event: any) => {
        setClientId(event.target.value);
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
                Generate OneDrive Tokens
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
                        label='Scope'
                        variant='outlined'
                        value='Files.Read Files.ReadWrite Files.Read.All Files.ReadWrite.All Sites.Read.All offline_access'
                        disabled
                    />
                </Box>
                <Button type='submit'>Submit</Button>
            </form>
        </Box>
    );
};

export default OneDriveTokenGenerator;
