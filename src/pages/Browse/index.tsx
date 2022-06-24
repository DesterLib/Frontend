import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import DButton from '../../components/DButton';
import { Helmet } from '../../components/DHelmet';
import DLoader from '../../components/DLoader';
import { get } from '../../utilities/requests';
import { MainContainer } from './styles';

interface BrowseParams {
    query: string;
    genre: string;
    year: number;
    sort: string;
    category: number;
    page: number;
    limit: number;
    mediaType: 'movies' | 'series';
}
const BrowsePage = () => {
    const tempParams: BrowseParams = {
        query: '',
        genre: '',
        year: 0,
        sort: 'title:1',
        category: -1,
        page: 0,
        limit: 20,
        mediaType: 'movies',
    };

    const [data, setData] = useState<any>({});
    const [params, setParams] = useState<BrowseParams>(tempParams);
    const [requestInfo, setRequestInfo] = useState<any>({});
    const [isLoaded, setIsLoaded] = useState<boolean>(false);

    const location: any = useLocation();
    useEffect(() => {
        const wanted_keys = [
            'query',
            'genre',
            'year',
            'sort',
            'category',
            'page',
            'limit',
            'mediaType',
        ];
        if (location.state) {
            for (let i = 0; i < wanted_keys.length; i++) {
                if (location.state[wanted_keys[i]]) {
                    params[wanted_keys[i]] = location.state[wanted_keys[i]];
                }
            }
            setParams(params);
            handleSearch();
        } else {
            setIsLoaded(true);
        }
    }, [location.state]);

    const handleSearch = () => {
        const queryParams = `?query=${encodeURIComponent(params.query)}&genre=${encodeURIComponent(
            params.genre,
        )}&year=${params.year}&sort=${encodeURIComponent(params.sort)}&category=${
            params.category
        }&media_type=${encodeURIComponent(params.mediaType)}&page=${params.page}&limit=${
            params.limit
        }`;
        get(
            `/browse/${params.category}/${params.page}${queryParams}`,
            setData,
            setRequestInfo,
            setIsLoaded,
        );
    };

    const handleChangeQuery = (event: any) => {
        var newParams = params;
        newParams.query = event.target.value || '';
        setParams(newParams);
    };

    const handleChangeGenre = (event: any) => {
        var newParams = params;
        newParams.genre = event.target.value || '';
        setParams(newParams);
    };

    const handleChangeYear = (event: any) => {
        var newParams = params;
        newParams.year = event.target.value || 0;
        setParams(newParams);
    };

    const handleChangeSort = (event: any) => {
        var newParams = params;
        newParams.sort = event.target.value || 'title:1';
        setParams(newParams);
    };

    const handleChangeCategory = (event: any) => {
        var newParams = params;
        newParams.category = event.target.value || -1;
        setParams(newParams);
    };

    const handleChangeMediaType = (event: any) => {
        var newParams = params;
        newParams.mediaType = event.target.value || 'movies';
        setParams(newParams);
    };

    const handleChangePage = (event: any) => {
        var newParams = params;
        newParams.page = event.target.value || 0;
        setParams(newParams);
    };

    const handleChangeLimit = (event: any) => {
        var newParams = params;
        newParams.limit = event.target.value || 20;
        setParams(newParams);
    };

    console.log(data);

    return isLoaded ? (
        <MainContainer>
            <Helmet>
                <meta name='description' content={requestInfo.description} />
                <title>{requestInfo.title}</title>
            </Helmet>
            <Box>
                <Box>
                    <Box>
                        
                    </Box>
                </Box>
            </Box>
        </MainContainer>
    ) : (
        <DLoader />
    );
};

export default BrowsePage;
