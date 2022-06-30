import { Box, TextField, Typography } from '@mui/material';
import React from 'react';

const AdditionalSlide = () => {
    return (
        <Box sx={{ padding: '20px', maxWidth: '500px', margin: 'auto', textAlign: 'center' }}>
            <Typography variant='h5'>Additional Details for Dester to work correctly</Typography>
            <Box sx={{ padding: '20px' }}>
                <TextField
                    fullWidth
                    required
                    sx={{ margin: '10px auto' }}
                    id='outlined-basic'
                    label='TMDb API Key'
                    variant='outlined'
                ></TextField>
            </Box>
        </Box>
    );
};

export default AdditionalSlide;
