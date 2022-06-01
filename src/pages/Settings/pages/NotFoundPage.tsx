import { Box, Typography } from '@mui/material';
import React from 'react';

import Error from '../assets/error.png';

const NotFoundPage = () => {
    return (
        <Box sx={{ maxWidth: '300px', width: '100%' }}>
            <Box>
                <img style={{ width: '100%' }} src={Error} alt='' />
            </Box>
            <Box sx={{ backgroundColor: '#06131c', borderRadius: '10px', padding: '15px 20px' }}>
                <Typography variant='h5'>404 - You Lost ?</Typography>
            </Box>
        </Box>
    );
};

export default NotFoundPage;
