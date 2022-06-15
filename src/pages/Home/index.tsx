import React, { Fragment, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DCarousel from '../../components/DCarousel';
import { Helmet } from '../../components/DHelmet';
import DLoader from '../../components/DLoader';
import DSlider from '../../components/DSlider';
import { APP_API_PATH } from '../../config';
import { MainContainer, MainWrapper } from './styles';

// import useNetworkStatus from '../utilities/useNetworkStatus';

const HomePage = () => {
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [data, setData] = useState<any>({});
    const [appInfo, setAppInfo] = useState<any>({});
    const navigate = useNavigate();

    useEffect(() => {
        const getData = async () => {
            const res = await fetch(`${APP_API_PATH}/api/v1/home`);
            const appFetch = await fetch(`${APP_API_PATH}/api/v1/settings`);
            const data = (await res.json()) || null;
            const appData = (await appFetch.json()) || null;
            setData(data.result || { ok: false });
            setAppInfo(appData.result.app || { ok: false });
            setIsLoaded(true);
        };
        getData();
    }, []);

    if (isLoaded && data.code == 428) {
        navigate(data.result);
    }

    console.log(appInfo);

    // const network = useNetworkStatus();

    // console.log(network.online);

    // if (!network.online) return <div>No internet connection</div>;

    return isLoaded ? (
        <MainContainer>
            <Helmet>
                <meta name='description' content={appInfo.description} />
                <title>{appInfo.name}</title>
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
        <DLoader/>
    );
};

export default HomePage;
