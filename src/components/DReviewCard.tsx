import { Avatar, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { alpha } from '@mui/material/styles';
import { useTheme } from '@mui/system';
import React from 'react';

import { APP_API_PATH, APP_API_VERSION_PATH, APP_POSTER_QUALITY } from '../config';

const DReviewCard = ({ item }: any) => {
    const theme = useTheme();
    var avatar_path = '';
    if (item.author_details.avatar_path && item.author_details.avatar_path.startsWith('/')) {
        avatar_path = (item.author_details.avatar_path || '/').substring(1);
    }
    if (avatar_path.length && !avatar_path.startsWith('https://')) {
        avatar_path =
            APP_API_PATH +
            APP_API_VERSION_PATH +
            '/assets/image/' +
            APP_POSTER_QUALITY +
            item.author_details.avatar_path;
    }

    return (
        <Box sx={{ display: 'flex', marginBottom: '10px' }}>
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
                    <Avatar sx={{ height: '100px', width: '100px' }} src={avatar_path}></Avatar>
                </Box>
                <Typography variant='body1'>
                    {item.author_details.name || item.author || item.author_details.username}
                </Typography>
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
                    {item.author_details.rating ? (
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
                            <Typography noWrap sx={{ padding: '0px 7px' }} variant='body2'>
                                {item.author_details.rating}
                            </Typography>
                        </Box>
                    ) : null}
                </Box>
                <Box sx={{ overflow: 'hidden', maxHeight: '100px' }}>
                    <Typography variant='body2'>{item.content}</Typography>
                </Box>
                <Box sx={{ paddingTop: '10px', textAlign: 'end' }}>
                    <Typography variant='body2'>
                        {new Date(
                            Date.parse(item.updated_at || item.created_at),
                        ).toLocaleDateString('en-US')}
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default DReviewCard;
