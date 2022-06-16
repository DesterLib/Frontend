import { IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import {
    APP_API_PATH,
    APP_API_VERSION_PATH,
    APP_BACKDROP_QUALITY,
    APP_POSTER_QUALITY,
} from '../../config';

const SeasonPage = () => {
    const theme = useTheme();
    const { seriesId, seasonNumber } = useParams();
    const [data, setData] = useState<any>({});
    const [item, setItem] = useState<any>({});
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const navigate = useNavigate();
    const location: any = useLocation();

    useEffect(() => {
        if (location.state) {
            setData(location.state.data);
            setItem(location.state.data.seasons[location.state.seasonKey]);
            setIsLoaded(true);
        } else {
            navigate(`/serie/${seriesId}`);
        }
    }, [seriesId, seasonNumber]);

    return isLoaded ? (
        <Box
            sx={{
                background: `linear-gradient(0deg, ${theme.palette.background.default} 0%, ${alpha(
                    theme.palette.background.default,
                    0.7,
                )} 100%), url(${
                    APP_API_PATH +
                    APP_API_VERSION_PATH +
                    '/assets/image/' +
                    APP_BACKDROP_QUALITY +
                    data.backdrop_path
                }) no-repeat center center / cover`,
            }}
        >
            <Box
                sx={{
                    paddingTop: '100px',
                    width: '100%',
                    display: 'flex',
                    textAlign: 'center',
                    flexDirection: 'column',
                }}
            >
                <Box sx={{ width: '100%', marginBottom: '20px' }}>
                    <Typography sx={{ fontWeight: '700' }} variant='h4'>
                        {data.title}
                    </Typography>
                </Box>
                <Box sx={{ width: '100%', marginBottom: '20px' }}>
                    <Typography sx={{ fontWeight: '500' }} variant='h5'>
                        {item.name}
                    </Typography>
                </Box>
                <Box sx={{ maxWidth: '220px', margin: 'auto' }}>
                    <img
                        style={{ borderRadius: '10px' }}
                        width='100%'
                        src={item.poster_path}
                        alt=''
                    />
                </Box>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    maxWidth: 'calc(100% - 80px)',
                    margin: 'auto',
                }}
            >
                <Link style={{ textDecoration: 'none', color: theme.palette.text.primary }} to=''>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton
                            sx={{
                                backgroundColor: theme.palette.background.paper,
                                marginRight: '10px',
                            }}
                        >
                            <i className='ri-arrow-left-s-line'></i>
                        </IconButton>
                        <Typography>Previous Season</Typography>
                    </Box>
                </Link>
                <Link style={{ textDecoration: 'none', color: theme.palette.text.primary }} to=''>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography>Next Season</Typography>
                        <IconButton
                            sx={{
                                backgroundColor: theme.palette.background.paper,
                                marginLeft: '10px',
                            }}
                        >
                            <i className='ri-arrow-right-s-line'></i>
                        </IconButton>
                    </Box>
                </Link>
            </Box>
        </Box>
    ) : null;
};

export default SeasonPage;
