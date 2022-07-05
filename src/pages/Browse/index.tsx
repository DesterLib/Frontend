import { Box, Grid, Skeleton, Toolbar, Typography } from '@mui/material';
import { debounce } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import DButton from '../../components/DButton';
import { Helmet } from '../../components/DHelmet';
import DItemCard from '../../components/DItemCard';
import { SearchIconWrapper, SearchInputBase, SearchWrapper } from '../../components/DSearchStyles';
import DSelect from '../../components/DSelect';
import { APP_API_PATH, APP_API_VERSION_PATH, APP_DESCRIPTION, APP_NAME } from '../../config';
import useBreakpoint from '../../utilities/useBreakpoint';
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

const handleDebouncedSearch = debounce(
    async (queryParams, setData, setRequestInfo, setIsLoaded, breakpoint, oldData, limit) => {
        const get = async (path: string) => {
            const res = await fetch(`${APP_API_PATH}${APP_API_VERSION_PATH}${path}`);
            const data = (await res.json()) || {
                code: null,
                message: 'The server could not be reached.',
                ok: false,
                result: null,
                time_taken: 0,
                title: APP_NAME,
                description: APP_DESCRIPTION,
            };
            const info = {
                code: data.code,
                message: data.message,
                ok: data.ok,
                time_taken: data.time_taken,
                title: data.title,
                description: data.description,
            };
            if (info.title !== localStorage.getItem('APP_NAME')) {
                localStorage.setItem('APP_NAME', info.title);
            }
            if (info.description !== localStorage.getItem('APP_DESCRIPTION')) {
                localStorage.setItem('APP_DESCRIPTION', info.description);
            }
            const newData = oldData.concat(data.result);
            const breakVals = { xl: 6, lg: 6, md: 4, sm: 3, xs: 2 };
            if (newData.length >= limit) {
                const rem = newData.length % breakVals[breakpoint];
                setData(newData.splice(0, newData.length - rem));
            } else {
                setData(newData);
            }
            setRequestInfo(info);
            setIsLoaded(true);
        };
        await get(`/browse${queryParams}`);
    },
    1500,
);

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

    const [data, setData] = useState<any>([]);
    const [params, setParams] = useState<BrowseParams>(tempParams);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [requestInfo, setRequestInfo] = useState<any>({});
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [numOfSkeletons, setNumOfSkeletons] = useState<number>(18);

    const location: any = useLocation();
    const breakpoint = useBreakpoint();
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
        }
        const breakVals = { lg: 6, md: 4, sm: 3, xs: 2 };
        const rem = params.limit % breakVals[breakpoint];
        if (rem) {
            setNumOfSkeletons(params.limit - rem);
        }
        handleSearch();
    }, [location.state, breakpoint]);

    const handleSearch = (oldData = []) => {
        setIsLoaded(false);
        const queryParams = `?query=${encodeURIComponent(params.query)}&genre=${encodeURIComponent(
            params.genre,
        )}&year=${params.year}&sort=${encodeURIComponent(params.sort)}&category=${
            params.category
        }&media_type=${encodeURIComponent(params.mediaType)}&page=${params.page}&limit=${
            params.limit
        }`;
        handleDebouncedSearch(
            `/${params.category}/${params.page}${queryParams}`,
            setData,
            setRequestInfo,
            setIsLoaded,
            breakpoint,
            oldData,
            params.limit || 20,
        );
    };

    const handleChangeQuery = (event: any) => {
        var newParams = params;
        if (event.target.value === 'Any') {
            newParams.query = '';
        } else {
            newParams.query = event.target.value || '';
        }
        setParams(newParams);
        handleSearch();
    };

    const handleChangeGenre = (event: any) => {
        var newParams = params;
        if (event.target.value === 'Any') {
            newParams.genre = '';
        } else {
            newParams.genre = event.target.value || '';
        }
        setParams(newParams);
        handleSearch();
    };

    const handleChangeYear = (event: any) => {
        var newParams = params;
        if (event.target.value === 'Any') {
            newParams.year = 0;
        } else {
            newParams.year = event.target.value || 0;
        }
        setParams(newParams);
        handleSearch();
    };

    const handleChangeSort = (event: any) => {
        var newParams = params;
        if (event.target.value === 'Any') {
            newParams.sort = 'title:1';
        } else {
            newParams.sort = (event.target.value || 'title').toLowerCase() + ':1';
        }
        setParams(newParams);
        handleSearch();
    };

    const handleChangeCategory = (event: any) => {
        var newParams = params;
        if (event.target.value === 'Any') {
            newParams.category = -1;
        } else {
            newParams.category = event.target.value || -1;
        }
        setParams(newParams);
        handleSearch();
    };

    const handleChangeMediaType = (event: any) => {
        var newParams = params;
        if (event.target.value === 'Any') {
            newParams.mediaType = 'movies';
        } else {
            newParams.mediaType = (event.target.value || 'movies').toLowerCase();
        }
        setParams(newParams);
        handleSearch();
    };

    const handleChangePage = () => {
        var newParams = params;
        newParams.page += 1;
        setParams(newParams);
        handleSearch(data);
    };

    const genres = [
        'Any',
        'Action',
        'Adventure',
        'Action & Adventure',
        'Animation',
        'Comedy',
        'Crime',
        'Documentary',
        'Drama',
        'Family',
        'Fantasy',
        'History',
        'Horror',
        'Kids',
        'Music',
        'Mystery',
        'News',
        'Reality',
        'Romance',
        'Science Fiction',
        'Sci-Fi & Fantasy',
        'Soap',
        'Talk',
        'Thriller',
        'TV Movie',
        'War',
        'War & Politics',
        'Western',
    ];

    const range = (start, stop) => Array.from({ length: stop - start + 1 }, (_, i) => start + i);
    const years = range(1920, new Date().getFullYear()).reverse();
    years.unshift('Any');

    const sortings = ['Title', 'Popularity', 'Rating', 'Release Date', 'Size', 'Runtime'];

    return (
        <MainContainer>
            <Toolbar />
            <Helmet>
                <title>{APP_NAME}</title>
                <meta name='description' content={APP_DESCRIPTION} />
            </Helmet>
            <Box sx={{ marginTop: '20px' }}>
                <Box>
                    <Box sx={{display: 'flex', marginBottom: '20px'}}>
                        <Typography variant='h3' sx={{marginRight: '20px'}}>Browse</Typography>
                        <DSelect
                            currentOption='Any'
                            options={['Any', 'Movies', 'Series']}
                            onChange={handleChangeMediaType}
                            width='200px'
                            fontSize='40px'
                            style={{height: '50px'}}
                        />
                    </Box>
                    <Grid
                        container
                        sx={{ display: 'flex', justifyContent: 'center', padding: '10px' }}
                    >
                        <Grid item sm={12}>
                            <SearchWrapper fullWidth standalone>
                                <SearchIconWrapper>
                                    <i className='ri-search-2-line'></i>
                                </SearchIconWrapper>
                                <SearchInputBase
                                    fullWidth
                                    placeholder='Search…'
                                    inputProps={{ 'aria-label': 'search' }}
                                    onChange={handleChangeQuery}
                                />
                            </SearchWrapper>
                        </Grid>
                    </Grid>
                    <Grid
                        spacing={2}
                        container
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            margin: 'auto',
                            marginTop: '0px',
                            width: '100%',
                        }}
                    >
                        <Grid sx={{ padding: '8px 8px !important' }} item sm={3}>
                            <DSelect
                                title='Genre'
                                currentOption='Any'
                                options={genres}
                                onChange={handleChangeGenre}
                                fullWidth
                            />
                        </Grid>
                        <Grid sx={{ padding: '8px 8px !important' }} item sm={3}>
                            <DSelect
                                title='Year'
                                currentOption='Any'
                                options={years}
                                onChange={handleChangeYear}
                                fullWidth
                            />
                        </Grid>
                        {/* <Grid sx={{ padding: '8px 8px !important' }} item sm={2}>
                            <DSelect
                                title='Type'
                                currentOption='Any'
                                options={['Any', 'Movies', 'Series']}
                                onChange={handleChangeMediaType}
                                fullWidth
                            />
                        </Grid> */}
                        <Grid sx={{ padding: '8px 8px !important' }} item sm={3}>
                            <DSelect
                                title='Category'
                                currentOption='Any'
                                options={['Any']}
                                onChange={handleChangeCategory}
                                fullWidth
                            />
                        </Grid>
                        <Grid sx={{ padding: '8px 8px !important' }} item sm={3}>
                            <DSelect
                                title='Sort'
                                currentOption='Title'
                                options={sortings}
                                onChange={handleChangeSort}
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                </Box>
                <Grid
                    container
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        padding: '15px',
                        alignItems: 'center',
                        width: '100%',
                        margin: 'auto',
                    }}
                    spacing={2}
                >
                    {isLoaded
                        ? data.length > 0 &&
                          data.map((item) => (
                              <Grid
                                  sx={{ padding: '8px 8px !important' }}
                                  item
                                  lg={2}
                                  md={3}
                                  sm={4}
                                  xs={5}
                                  key={item.tmdb_id}
                              >
                                  <DItemCard
                                      item={item}
                                      type={item.number_of_files ? 'movie' : 'series'}
                                  />
                              </Grid>
                          ))
                        : [...Array(numOfSkeletons)].map((_, item) => (
                              <Grid
                                  sx={{ padding: '8px 8px !important' }}
                                  item
                                  lg={2}
                                  md={3}
                                  sm={4}
                                  xs={5}
                                  key={item}
                              >
                                  <Skeleton
                                      variant='rectangular'
                                      animation='wave'
                                      sx={{
                                          aspectRatio: '2/3',
                                          width: '100%',
                                          height: '100%',
                                          borderRadius: '10px',
                                      }}
                                  />
                                  <Skeleton
                                      variant='rectangular'
                                      animation='wave'
                                      sx={{
                                          marginTop: '10px',
                                          height: '15px',
                                          width: '80%',
                                          borderRadius: '4px',
                                      }}
                                  />
                              </Grid>
                          ))}
                </Grid>
                <DButton
                    disableElevation
                    variant='contained'
                    sx={{ margin: 'auto' }}
                    onClick={handleChangePage}
                    endIcon={<span className='material-symbols-rounded'>arrow_downward</span>}
                >
                    Show More
                </DButton>
            </Box>
        </MainContainer>
    );
};

export default BrowsePage;
