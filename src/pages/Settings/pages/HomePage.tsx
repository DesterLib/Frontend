import ConstructionIcon from '@mui/icons-material/Construction';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import React, { useState } from 'react';

const HomePage = (props: any) => {
    const textFiledStyles = {
        marginBottom: '20px',
    };
    const [refresh, setRefresh] = useState<number>(0);

    const { config, updateConfig, handleRebuild } = props;

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

    return (
        <Box>
            <TextField
                sx={textFiledStyles}
                helperText='Enter the name of your Dester instance'
                fullWidth
                label='App Name'
                variant='outlined'
                onChange={handleChangeName}
                value={config.name}
            />
            <TextField
                sx={textFiledStyles}
                helperText='Enter the Title for your Dester instance'
                fullWidth
                label='App Title'
                variant='outlined'
                onChange={handleChangeTitle}
                value={config.title}
            />
            <TextField
                sx={textFiledStyles}
                helperText='Enter the description for your Dester instance'
                fullWidth
                label='App Description'
                variant='outlined'
                onChange={handleChangeDescription}
                value={config.description}
            />
            <TextField
                sx={textFiledStyles}
                helperText='Enter the domain where Dester will be deployed'
                fullWidth
                label='Domain'
                variant='outlined'
                onChange={handleChangeDomain}
                value={config.domain}
            />
            <Button
                variant='outlined'
                color='warning'
                startIcon={<ConstructionIcon />}
                onClick={handleRebuild}
            >
                Rebuild Metadata
            </Button>
        </Box>
    );
};

export default HomePage;
