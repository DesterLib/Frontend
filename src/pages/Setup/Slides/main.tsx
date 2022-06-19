import { Box, TextField, Typography } from '@mui/material';
import React from 'react';

const MainSlide = () => {
    return (
        <Box sx={{ padding: '20px', maxWidth: '500px', margin: 'auto', textAlign: 'center' }}>
            <Typography variant='h5'>Provide your Dester Instance details</Typography>
            <Box sx={{ padding: '20px' }}>
                <TextField
                    fullWidth
                    sx={{ margin: '20px auto' }}
                    id='outlined-basic'
                    label='App Name'
                    variant='outlined'
                ></TextField>
                <TextField
                    fullWidth
                    sx={{ marginBottom: '20px' }}
                    id='outlined-basic'
                    label='App Title'
                    variant='outlined'
                ></TextField>
                <TextField
                    fullWidth
                    sx={{ marginBottom: '20px' }}
                    id='outlined-basic'
                    label='App Description'
                    variant='outlined'
                ></TextField>
                <TextField
                    required
                    fullWidth
                    sx={{ marginBottom: '20px' }}
                    id='outlined-basic'
                    label='App Domain'
                    variant='outlined'
                ></TextField>
            </Box>
        </Box>
    );
};

export default MainSlide;
