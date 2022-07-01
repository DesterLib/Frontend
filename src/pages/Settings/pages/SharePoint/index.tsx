import { Box, TextField } from '@mui/material';
import React, { useState } from 'react';

const SharePointPage = (props: any) => {
    const [refresh, setRefresh] = useState<number>(0);

    const { config, updateConfig } = props;

    const handleChangeClientId = (event: any) => {
        var newConfig = config;
        newConfig['client_id'] = event.target.value;
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
export default SharePointPage;
