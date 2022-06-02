import { Box, Button, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import React from 'react';

const GDriveTokenGenerator = (props: any) => {
    const { config } = props;

    const [clientId, setClientId] = React.useState<string>(config.client_id || '');
    const [clientSecret, setClientSecret] = React.useState<string>(config.client_secret || '');

    const objToFormEncoded = (object: object) => {
        return Object.entries(object)
            .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
            .join('&');
    };

    const getAuthCode = async (event: any) => {
        event.preventDefault();
        const query = objToFormEncoded({
            response_type: 'code',
            redirect_uri: `${window.location.origin}/settings/gdrive`,
            client_id: clientId,
            scope: 'https://www.googleapis.com/auth/drive',
            access_type: 'offline',
            prompt: 'consent',
        });
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
        borderRadius: '10px',
        maxWidth: '800px',
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
