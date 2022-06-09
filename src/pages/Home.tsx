import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { useTheme } from '@mui/system';
import React, { Fragment, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import DBottomBar from '../components/DBottomBar';
import DCarousel from '../components/DCarousel';
import DSlider from '../components/DSlider';
import { APP_API_PATH } from '../config';

const Home = () => {
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [data, setData] = useState<any>({});
    const theme = useTheme();
    const navigate = useNavigate();

    useEffect(() => {
        const getData = async () => {
            const res = await fetch(`${APP_API_PATH}/api/v1/home`);
            const data = (await res.json()) || null;
            setData(data || { ok: false });
            setIsLoaded(true);
        };
        getData();
    }, []);

    if (isLoaded && data.code == 428) {
        navigate(data.result);
    }

    return isLoaded ? (
        <Box>
            <Box
                sx={{
                    marginTop: 'calc(60px + 20px)',
                    marginBottom: '100px',
                    [theme.breakpoints.down('md')]: {
                        marginTop: '60px',
                    },
                }}
            >
                <Fragment>
                    <DCarousel type='movie' itemData={data.result.carousel} />
                    <DSlider
                        variant='item'
                        title='Popular Movies'
                        itemData={data.result.most_popular_movies}
                        type='movie'
                    />
                    <DSlider
                        variant='item'
                        title='Popular Series'
                        itemData={data.result.most_popular_series}
                        type='serie'
                    />
                    <DSlider
                        variant='item'
                        title='Newly Added Movies'
                        itemData={data.result.newly_added_movies}
                        type='movie'
                    />
                    <DSlider
                        variant='item'
                        title='Newly Released Episodes'
                        itemData={data.result.newly_released_episodes}
                        type='serie'
                    />
                    <DSlider
                        variant='item'
                        title='Newly Added Episodes'
                        itemData={data.result.newly_added_episodes}
                        type='serie'
                    />
                    <DSlider
                        variant='item'
                        title='Top Rated Movies'
                        itemData={data.result.top_rated_movies}
                        type='movie'
                    />
                    <DSlider
                        variant='item'
                        title='Top Rated Series'
                        itemData={data.result.top_rated_series}
                        type='serie'
                    />
                </Fragment>
            </Box>
            <DBottomBar />
        </Box>
    ) : (
        <Box
            sx={{
                width: '100%',
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <CircularProgress />
        </Box>
    );
};

export default Home;
