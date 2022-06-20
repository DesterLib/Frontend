import { Box, TextField, Typography } from '@mui/material';
import React from 'react';

import DButton from '../../../components/DButton';

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
                <Box sx={{ marginTop: '10px' }}>
                    <Typography variant='body1'>Google Provider Details</Typography>
                    <TextField
                        fullWidth
                        required
                        sx={{ margin: '10px auto' }}
                        id='outlined-basic'
                        label='Google API CLient ID'
                        variant='outlined'
                    ></TextField>
                    <TextField
                        fullWidth
                        required
                        sx={{ margin: '10px auto' }}
                        id='outlined-basic'
                        label='Google API CLient Secret'
                        variant='outlined'
                    ></TextField>
                    <Box sx={{ marginBottom: '20px' }}>
                        <DButton fullwidth>
                            Auto Generate: Refresh Token, Access Token, Auth Token
                        </DButton>
                    </Box>
                    <TextField
                        fullWidth
                        required
                        sx={{ margin: '10px auto' }}
                        id='outlined-basic'
                        label='Google API Refresh Token'
                        variant='outlined'
                    ></TextField>
                    <TextField
                        fullWidth
                        required
                        sx={{ margin: '10px auto' }}
                        id='outlined-basic'
                        label='Google API Access Token'
                        variant='outlined'
                    ></TextField>
                    <TextField
                        fullWidth
                        required
                        sx={{ margin: '10px auto' }}
                        id='outlined-basic'
                        label='Google API Auth Token'
                        variant='outlined'
                    ></TextField>
                </Box>
            </Box>
        </Box>
    );
};

export default AdditionalSlide;
