import { Box, Typography } from '@mui/material';
import React from 'react';

import Error from '../assets/error.png';
import DButton from '../components/DButton';

const NotFoundPage = () => {
    return (
        <Box
            sx={{
                width: '100%',
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
            }}
        >
            <Box>
                <img style={{ width: '100%', maxWidth: '500px' }} src={Error} alt='' />
            </Box>
            <Box sx={{ backgroundColor: '#06131c', borderRadius: '10px', padding: '15px 20px' }}>
                <Typography variant='h5' style={{ textAlign: 'center' }}>
                    404 - You Lost ?
                </Typography>
            </Box>
            <DButton
                href='/'
                variant='contained'
                color='primary'
                startIcon={<i style={{ fontSize: '16px' }} className='ri-home-2-fill'></i>}
            >
                GO HOME
            </DButton>
        </Box>
    );
};

export default NotFoundPage;
