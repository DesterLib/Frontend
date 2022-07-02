import Box from '@mui/material/Box';
import React, { useState } from 'react';

import DTextField from '../../../../components/DTextField';

const AppPage = (props: any) => {
    const textFiledStyles = {
        marginBottom: '20px',
    };
    const [refresh, setRefresh] = useState<number>(0);

    const { config, updateConfig } = props;

    const handleChangeName = (event: any) => {
        var newConfig = config;
        newConfig['name'] = event.target.value;
        updateConfig(newConfig);
        setRefresh(refresh + 1);
    };

    const handleChangeTitle = (event: any) => {
        var newConfig = config;
        newConfig['title'] = event.target.value;
        updateConfig(newConfig);
        setRefresh(refresh + 1);
    };

    const handleChangeDescription = (event: any) => {
        var newConfig = config;
        newConfig['description'] = event.target.value;
        updateConfig(newConfig);
        setRefresh(refresh + 1);
    };

    const handleChangeDomain = (event: any) => {
        var newConfig = config;
        newConfig['domain'] = event.target.value;
        updateConfig(newConfig);
        setRefresh(refresh + 1);
    };

    const handleChangeSecretKey = (event: any) => {
        var newConfig = config;
        newConfig['secret_key'] = event.target.value;
        updateConfig(newConfig);
        setRefresh(refresh + 1);
    };

    return (
        <Box sx={{ maxWidth: '700px', margin: 'auto', marginTop: '20px' }}>
            <DTextField
                sx={textFiledStyles}
                helperText='Enter the name of your Dester instance'
                fullWidth
                placeholder='App Name'
                variant='outlined'
                onChange={handleChangeName}
                value={config.name || ''}
            />
            <DTextField
                sx={textFiledStyles}
                helperText='Enter the Title for your Dester instance'
                fullWidth
                placeholder='App Title'
                variant='outlined'
                onChange={handleChangeTitle}
                value={config.title || ''}
            />
            <DTextField
                sx={textFiledStyles}
                helperText='Enter the description for your Dester instance'
                fullWidth
                placeholder='App Description'
                variant='outlined'
                onChange={handleChangeDescription}
                value={config.description || ''}
            />
            <DTextField
                sx={textFiledStyles}
                helperText='Enter the domain where Dester will be deployed'
                fullWidth
                placeholder='Domain'
                variant='outlined'
                onChange={handleChangeDomain}
                value={config.domain || ''}
            />
            <DTextField
                sx={textFiledStyles}
                helperText='Enter a password to access the settings page with'
                fullWidth
                placeholder='Secret Key'
                variant='outlined'
                onChange={handleChangeSecretKey}
                value={config.secret_key || ''}
            />
        </Box>
    );
};

export default AppPage;
