import { IconButton, Toolbar } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import DButton from '../../components/DButton';
import { Helmet } from '../../components/DHelmet';
import DLoader from '../../components/DLoader';
import { SearchIconWrapper, SearchInputBase, SearchWrapper } from '../../components/DSearchStyles';
import DSelect from '../../components/DSelect';
import { APP_DESCRIPTION, APP_NAME } from '../../config';
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

    const genres = [
        {
            genre: 'Any',
        },
        {
            genre: 'Action',
        },
        {
            genre: 'Adventure',
        },
        {
            genre: 'Fantasy',
        },
    ];

    return isLoaded ? (
        <MainContainer>
            <Toolbar />
            <Helmet>
                <title>{APP_NAME}</title>
                <meta name='description' content={APP_DESCRIPTION} />
            </Helmet>
            <Box sx={{ marginTop: '20px' }}>
                <Box>
                    <Grid
                        container
                        sx={{ display: 'flex', justifyContent: 'center', padding: '10px' }}
                    >
                        <Grid item sm={10}>
                            <SearchWrapper fullWidth standalone>
                                <SearchIconWrapper>
                                    <i className='ri-search-2-line'></i>
                                </SearchIconWrapper>
                                <SearchInputBase
                                    fullWidth
                                    placeholder='Search…'
                                    inputProps={{ 'aria-label': 'search' }}
                                />
                            </SearchWrapper>
                        </Grid>
                    </Grid>
                    <Grid
                        spacing={4}
                        container
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            marginTop: '0px',
                            padding: '5px',
                        }}
                    >
                        <Grid item sm={2}>
                            <DSelect
                                title='Genre'
                                currentOption='Any'
                                options={genres.map(({ genre }) => genre)}
                                fullWidth
                            />
                        </Grid>
                        <Grid item sm={2}>
                            <DSelect
                                title='Year'
                                currentOption='Any'
                                options={genres.map(({ genre }) => genre)}
                                fullWidth
                            />
                        </Grid>
                        <Grid item sm={2}>
                            <DSelect
                                title='Type'
                                currentOption='Any'
                                options={genres.map(({ genre }) => genre)}
                                fullWidth
                            />
                        </Grid>
                        <Grid item sm={2}>
                            <DSelect
                                title='Language'
                                currentOption='Any'
                                options={genres.map(({ genre }) => genre)}
                                fullWidth
                            />
                        </Grid>
                        <Grid item sm={2}>
                            <DSelect
                                title='Sort'
                                currentOption='Any'
                                options={genres.map(({ genre }) => genre)}
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </MainContainer>
    ) : (
        <DLoader />
    );
};

export default BrowsePage;
