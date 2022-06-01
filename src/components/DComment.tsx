import { Avatar, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { alpha } from '@mui/material/styles';
import { useTheme } from '@mui/system';
import React from 'react';

const DComment = () => {
    const theme = useTheme();
    return (
        <Box sx={{ display: 'flex' }}>
            <Box
                sx={{
                    width: 'fit-content',
                    height: '100%',
                    padding: '10px',
                    textAlign: 'center',
                    marginRight: '20px',
                }}
            >
                <Box
                    sx={{
                        width: '100%',
                        height: '100%',
                        marginBottom: '10px',
                        boxShadow: '0px 0px 0px 3px #FF3396',
                        borderRadius: '50%',
                        padding: '2px',
                    }}
                >
                    <Avatar sx={{ height: '100px', width: '100px' }}>H</Avatar>
                </Box>
                <Typography variant='body1'>John Doe</Typography>
            </Box>
            <Box
                sx={{
                    padding: '20px',
                    backgroundColor: alpha('#193F4F', 0.4),
                    borderRadius: '15px',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingBottom: '20px',
                    }}
                >
                    <Box
                        sx={{
                            backgroundColor: '#9133FF',
                            padding: '5px 10px',
                            width: 'fit-content',
                            borderRadius: theme.shape.borderRadius,
                            boxShadow: '0px 0px 0px 3px #AD66FF',
                        }}
                    >
                        <Typography variant='body2'>Featured Review</Typography>
                    </Box>
                    <Box
                        sx={{
                            backgroundColor: '#FF3396',
                            padding: '2px 5px',
                            width: 'fit-content',
                            borderRadius: theme.shape.borderRadius,
                            display: 'flex',
                            alignItems: 'center',
                            boxShadow: '0px 0px 0px 3px #FF66B0',
                        }}
                    >
                        <i style={{ color: '#FFD333' }} className='ri-star-fill'></i>
                        <Typography sx={{ padding: '0px 7px' }} variant='body2'>
                            7.1
                        </Typography>
                    </Box>
                </Box>
                <Typography variant='body2'>
                    When I watched the first season when it was originally aired, it had some
                    serious fan following, but I won&apos;t say it was very very famous at the time.
                    Now, after the second season, seems everything has changed.
                </Typography>
                <Box sx={{ paddingTop: '10px', textAlign: 'end' }}>
                    <Typography variant='body2'>4 September 2017</Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default DComment;
