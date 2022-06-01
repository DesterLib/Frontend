import { Box, TextField } from '@mui/material';
import React, { useState } from 'react';

const HomePage = () => {
    const textFiledStyles = {
        marginBottom: '20px',
    };

    var tempAppName = localStorage.getItem('app_name') || '';
    var tempAppTitle = localStorage.getItem('app_description') || '';
    var tempAppDescription = localStorage.getItem('app_description') || '';
    var tempAppDomain = localStorage.getItem('app_domain') || '';

    const [appName, setAppName] = useState(tempAppName);
    const [appTitle, setAppTitle] = useState(tempAppTitle);
    const [appDescription, setAppDescription] = useState(tempAppDescription);
    const [appDomain, setAppDomain] = useState(tempAppDomain);

    const handleChangeName = (event: any) => {
        setAppName(event.target.value);
        localStorage.setItem('app_name', event.target.value);
    };

    const handleChangeTitle = (event: any) => {
        setAppTitle(event.target.value);
        localStorage.setItem('app_title', event.target.value);
    };

    const handleChangeDescription = (event: any) => {
        setAppDescription(event.target.value);
        localStorage.setItem('app_description', event.target.value);
    };

    const handleChangeDomain = (event: any) => {
        setAppDomain(event.target.value);
        localStorage.setItem('app_domain', event.target.value);
    };

    return (
        <Box>
            <TextField
                sx={textFiledStyles}
                helperText='Enter the name of your Dester instance'
                fullWidth
                label='App Name'
                variant='outlined'
                onChange={handleChangeName}
                value={appName}
            />
            <TextField
                sx={textFiledStyles}
                helperText='Enter the Title for your Dester instance'
                fullWidth
                label='App Title'
                variant='outlined'
                onChange={handleChangeTitle}
                value={appTitle}
            />
            <TextField
                sx={textFiledStyles}
                helperText='Enter the description for your Dester instance'
                fullWidth
                label='App Description'
                variant='outlined'
                onChange={handleChangeDescription}
                value={appDescription}
            />
            <TextField
                sx={textFiledStyles}
                helperText='Enter the domain where Dester will be deployed'
                fullWidth
                label='Domain'
                variant='outlined'
                onChange={handleChangeDomain}
                value={appDomain}
            />
        </Box>
    );
};

export default HomePage;
