import type { NextPage } from 'next';
import DNavbar from '../main/components/main/DNavbar';
import DCarousel from '../main/components/main/DCarousel';
import Box from '@mui/material/Box';
import DBottomBar from '../main/components/main/DBottomBar';
import DSlider from '../main/components/repeat/DSlider';
import { useTheme } from '@mui/system';
import React from 'react';
import fetch from 'node-fetch';
import { APP_API_PATH } from '../main/config';

export async function getServerSideProps() {
    const res = await fetch(`${APP_API_PATH}/api/v1/home`);
    const data = (await res.json()) || null;
    // if(!data.success){
    //   return {
    //     props: {
    //       error: data.error
    //     }
    //   }
    // }
    console.log(res);
    return {
        props: {
            data,
        },
    };
}

const Home: NextPage = ({ colorModeContext, themeMode, data }: any) => {
    const theme = useTheme();

    // const [carouselData, setCarouselData] = React.useState({});

    // useEffect(() => {
    //   const fetchMovies = () => {

    //   }
    // }, [])

    return (
        <Box>
            <DNavbar colorModeContext={colorModeContext} themeMode={themeMode} />
            <Box
                sx={{
                    marginTop: 'calc(60px + 20px)',
                    marginBottom: '100px',
                    [theme.breakpoints.down('md')]: {
                        marginTop: '60px',
                    },
                }}
            >
                <React.Fragment>
                    <DCarousel itemData={data.data.carousel} />
                    <DSlider title='Popular Movies' itemData={data.data.top_rated_movies} />
                    <DSlider title='Newly Added Movies' itemData={data.data.newly_added_movies} />
                    <DSlider title='Newly Added Episodes' itemData={data.data.new_episodes} />
                    <DSlider title='Popular TV Shows' itemData={data.data.top_rated_series} />
                </React.Fragment>
            </Box>
            <DBottomBar />
        </Box>
    );
};

export default Home;
