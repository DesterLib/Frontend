import React, { Fragment, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import DCarousel from '../../components/DCarousel';
import { Helmet } from '../../components/DHelmet';
import DLoader from '../../components/DLoader';
import DSlider from '../../components/DSlider';
import { APP_DESCRIPTION, APP_NAME } from '../../config';
import { get } from '../../utilities/requests';
import { MainContainer, MainWrapper } from './styles';

// import useNetworkStatus from '../utilities/useNetworkStatus';

const HomePage = () => {
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [data, setData] = useState<any>({});
    const [requestInfo, setRequestInfo] = useState<any>({});
    const navigate = useNavigate();

    useEffect(() => {
        get('/home', setData, setRequestInfo, setIsLoaded);
    }, []);

    if (requestInfo.code === 428) {
        navigate('/setup');
    }

    return isLoaded ? (
        <MainContainer>
            <Helmet>
                <title>{APP_NAME}</title>
                <meta name='description' content={APP_DESCRIPTION} />
            </Helmet>
            <MainWrapper>
                <Fragment>
                    <DCarousel itemData={data.carousel} />
                    <DSlider
                        variant='item'
                        title='Popular Movies'
                        itemData={data.most_popular_movies}
                        type='movie'
                    />
                    <DSlider
                        variant='item'
                        title='Popular Series'
                        itemData={data.most_popular_series}
                        type='series'
                    />
                    <DSlider
                        variant='item'
                        title='Newly Added Movies'
                        itemData={data.newly_added_movies}
                        type='movie'
                    />
                    <DSlider
                        variant='item'
                        title='Newly Released Episodes'
                        itemData={data.newly_released_episodes}
                        type='series'
                    />
                    <DSlider
                        variant='item'
                        title='Newly Added Episodes'
                        itemData={data.newly_added_episodes}
                        type='series'
                    />
                    <DSlider
                        variant='item'
                        title='Top Rated Movies'
                        itemData={data.top_rated_movies}
                        type='movie'
                    />
                    <DSlider
                        variant='item'
                        title='Top Rated Series'
                        itemData={data.top_rated_series}
                        type='series'
                    />
                </Fragment>
            </MainWrapper>
        </MainContainer>
    ) : (
        <DLoader />
    );
};

export default HomePage;
