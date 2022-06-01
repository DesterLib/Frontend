import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import React from 'react';
import { Link } from 'react-router-dom';

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
                padding: '20px',
            }}
        >
            <Box>
                <img style={{ width: '100%', maxWidth: '500px' }} src={Error} alt='' />
            </Box>
            <Box
                sx={{
                    backgroundColor: '#174453',
                    borderRadius: '15px',
                    padding: '15px 20px',
                    maxWidth: '500px',
                    width: '100%',
                }}
            >
                <Typography
                    variant='h4'
                    sx={{
                        textAlign: 'center',
                        background: '-webkit-linear-gradient(#14dca0, #03d7fc)',
                        '-webkit-background-clip': 'text',
                        '-webkit-text-fill-color': 'transparent',
                        paddingBottom: '10px',
                    }}
                >
                    404 - You Lost ?
                </Typography>
                <Box
                    sx={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '5px' }}
                >
                    <Link to='/' style={{ textDecoration: 'none' }}>
                        <DButton
                            variant='contained'
                            color='primary'
                            startIcon={
                                <i
                                    style={{ fontSize: '16px', fontWeight: 'bold' }}
                                    className='ri-home-line'
                                ></i>
                            }
                        >
                            Go Home
                        </DButton>
                    </Link>
                    <DButton
                        href='/'
                        variant='contained'
                        color='primary'
                        startIcon={
                            <i
                                style={{ fontSize: '16px', fontWeight: 'bold' }}
                                className='ri-search-2-line'
                            ></i>
                        }
                    >
                        Search
                    </DButton>
                </Box>
            </Box>
        </Box>
    );
};

export default NotFoundPage;
