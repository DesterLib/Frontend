import { Avatar, Box, Typography, alpha } from '@mui/material';
import { useTheme } from '@mui/system';
import React from 'react';

const DPersonCard = ({ item }: any) => {
    const theme = useTheme();
    return (
        <Box sx={{ maxWidth: '140px' }}>
            <Box
                sx={{
                    width: '120px',
                    height: '120px',
                    boxShadow: '0px 0px 0px 3px rgba(0,255,179,1)',
                    borderRadius: '50%',
                    margin: '15px auto',
                    padding: '3px',
                }}
            >
                <Avatar
                    sx={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                    src={item.image}
                    alt={item.name}
                />
            </Box>
            <Box
                sx={{
                    padding: '5px 10px',
                    backgroundColor: alpha(theme.palette.background.paper, 0.5),
                    borderRadius: '10px',
                    border: `2px solid ${alpha(theme.palette.background.paper, 0.3)}`,
                    textAlign: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                <Typography noWrap variant='body1'>{item.name}</Typography>
                <Typography
                    noWrap
                    sx={{ color: alpha(theme.palette.text.primary, 0.7), fontWeight: 'bold' }}
                    variant='body1'
                >
                    As
                </Typography>
                <Typography sx={{ width: 'calc(100% - 20px)' }} noWrap variant='body2'>
                    {item.avatar}
                </Typography>
                <Box
                    sx={{
                        position: 'absolute',
                        bottom: '0px',
                        right: '0px',
                        padding: '0px 5px',
                        borderRadius: '10px 0px 0px 0px',
                        backgroundColor: alpha(theme.palette.primary.main, 0.1),
                        color: theme.palette.primary.main,
                    }}
                >
                    <i className='ri-mic-fill'></i>
                </Box>
            </Box>
        </Box>
    );
};

export default DPersonCard;
