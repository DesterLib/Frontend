import { Box, TextField } from '@mui/material';
import React, { useState } from 'react';

const Auth0Page = (props: any) => {
    const textFiledStyles = {
        marginBottom: '20px',
    };
    const [refresh, setRefresh] = useState<number>(0);

    const { config, updateConfig } = props;

    const handleChangeDomain = (event: any) => {
        var newConfig = config;
        newConfig['domain'] = event.target.value;
        updateConfig(newConfig);
        setRefresh(refresh + 1);
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

    return (
        <Box>
            <TextField
                sx={textFiledStyles}
                helperText='Auth0 domain'
                fullWidth
                label='Domain'
                variant='outlined'
                onChange={handleChangeDomain}
                value={config.domain}
            />
            <TextField
                sx={textFiledStyles}
                helperText='Auth0 client id'
                fullWidth
                label='Client Id'
                variant='outlined'
                onChange={handleChangeClientId}
                value={config.client_id}
            />
            <TextField
                sx={textFiledStyles}
                helperText='Auth0 client secret'
                fullWidth
                label='Client Secret'
                variant='outlined'
                onChange={handleChangeClientSecret}
                value={config.client_secret}
            />
        </Box>
    );
};

export default Auth0Page;
