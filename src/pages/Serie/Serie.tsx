import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';
import { useTheme } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import useResizeObserver from 'use-resize-observer';

import DButton from '../../components/DButton';
import DItemLogo from '../../components/DItemLogo';
import DReviewList from '../../components/DReviewList';
import DSlider from '../../components/DSlider';
import DSpacer from '../../components/DSpacer';
import { APP_API_PATH, APP_API_VERSION_PATH, APP_POSTER_QUALITY } from '../../config';
import { MainWrapper } from './SeriePageComponents';

const Serie = () => {
    const { ref, height } = useResizeObserver<HTMLDivElement>();
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [data, setData] = useState<any>({});
    const theme = useTheme();
    const { id } = useParams();

    useEffect(() => {
        const getData = async () => {
            const res = await fetch(`${APP_API_PATH}${APP_API_VERSION_PATH}/movie?id=${id}`);
            const data = (await res.json()) || {};
            setData(data.results || { ok: false });
            setIsLoaded(true);
        };
        getData();
    }, []);

    var directors;
    var screenplay;
    if (isLoaded) {
        directors = data.crew.filter(({ job }: any) => job === 'Director');
        screenplay = data.crew.filter(({ job }: any) => job === 'Screenplay');
    }

    return isLoaded ? (
        <Box>
            <Grid container>
                <MainWrapper
                    ref={ref}
                    url={`https://www.themoviedb.org/t/p/w1066_and_h600_bestv2/${data.backdrop_path}`}
                />
                <Box
                    sx={{
                        backgroundImage:
                            'linear-gradient(90deg, rgba(0,21,28,1) 0%, rgba(0,0,0,0) 100%)',
                        position: 'absolute',
                        width: '100%',
                        aspectRatio: '21/9',
                        zIndex: '0',
                    }}
                />
                <Grid
                    item
                    md={6}
                    sx={{
                        zIndex: '10',
                        height: `${height}px`,
                        display: 'flex',
                        justifyContent: 'center',
                        padding: '40px',
                        flexDirection: 'column',
                    }}
                >
                    <DItemLogo src={`https://www.themoviedb.org/t/p/w1280/${data.logo_path}`} />
                    <Typography sx={{ fontWeight: '500', paddingBottom: '15px' }} variant='h5'>
                        {data.title}
                    </Typography>
                    <Grid container>
                        <Grid item></Grid>
                        <Grid item></Grid>
                        <Grid item></Grid>
                        <Grid item></Grid>
                    </Grid>
                    <Grid container sx={{ marginTop: '20px' }}>
                        <Grid sx={{ marginRight: '10px' }} item>
                            <DButton
                                startIcon={<i className='ri-play-mini-fill'></i>}
                                variant='contained'
                            >
                                PLAY
                            </DButton>
                        </Grid>
                        <Grid sx={{ marginRight: '10px' }} item>
                            <DButton
                                startIcon={<i className='ri-movie-2-line'></i>}
                                sx={{
                                    span: {
                                        margin: '0px',
                                    },
                                }}
                                color='secondary'
                                variant='contained'
                            />
                        </Grid>
                        <Grid sx={{ marginRight: '10px' }} item>
                            <DButton
                                startIcon={<i className='ri-heart-line'></i>}
                                sx={{
                                    span: {
                                        margin: '0px',
                                    },
                                }}
                                color='secondary'
                                variant='contained'
                            />
                        </Grid>
                        <Grid sx={{ marginRight: '10px' }} item>
                            <DButton
                                startIcon={<i className='ri-more-2-fill'></i>}
                                sx={{
                                    span: {
                                        margin: '0px',
                                    },
                                }}
                                color='secondary'
                                variant='contained'
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid container p={2}>
                <Grid item sm={12} md={2}>
                    <Box sx={{ padding: '20px' }}>
                        <img
                            style={{ borderRadius: '15px' }}
                            width='100%'
                            src={
                                APP_API_PATH +
                                APP_API_VERSION_PATH +
                                '/assets/image/' +
                                APP_POSTER_QUALITY +
                                data.poster_path
                            }
                            alt=''
                        />
                    </Box>
                </Grid>
                <Grid item sm={12} md={10}>
                    <Box sx={{ padding: '20px' }}>
                        <Typography
                            variant='subtitle1'
                            sx={{
                                color: alpha(theme.palette.text.primary, 0.7),
                                marginBottom: '10px',
                            }}
                        >
                            Description
                        </Typography>
                        <Typography variant='body2'>{data.description}</Typography>
                        <Box sx={{ marginTop: '20px' }}>
                            {data.genres &&
                                data.genres.map((genre: any) => (
                                    <Link
                                        style={{ textDecoration: 'none' }}
                                        to={`search?genre=${genre.name}`}
                                        key={genre.id}
                                    >
                                        <Chip
                                            clickable
                                            sx={{ margin: theme.spacing(0.5) }}
                                            label={genre.name}
                                        />
                                    </Link>
                                ))}
                        </Box>
                        <Grid container p={2}>
                            <Grid item md={7} p={2}>
                                <Stack spacing={2}>
                                    <Box sx={{ display: 'flex' }}>
                                        <Typography
                                            sx={{
                                                width: '150px',
                                                fontWeight: '600',
                                                color: alpha(theme.palette.text.primary, 0.8),
                                            }}
                                            variant='body1'
                                        >
                                            Director
                                        </Typography>
                                        <Typography
                                            sx={{ display: 'flex', alignItems: 'center' }}
                                            component={'span'}
                                            variant='body1'
                                        >
                                            {directors.map((director: any, i: number) => (
                                                <Box
                                                    sx={{ display: 'flex', flexDirection: 'row' }}
                                                    key={director.id}
                                                >
                                                    {director.name}
                                                    {i < directors.length - 1 ? <DSpacer /> : null}
                                                </Box>
                                            ))}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex' }}>
                                        <Typography
                                            sx={{
                                                width: '150px',
                                                fontWeight: '600',
                                                color: alpha(theme.palette.text.primary, 0.8),
                                            }}
                                            variant='body1'
                                        >
                                            Screenplay
                                        </Typography>
                                        <Typography
                                            sx={{ display: 'flex', alignItems: 'center' }}
                                            variant='body1'
                                            component={'span'}
                                        >
                                            {screenplay.map((screenplay: any, i: number) => (
                                                <Box
                                                    sx={{ display: 'flex', flexDirection: 'row' }}
                                                    key={screenplay.id}
                                                >
                                                    {screenplay.name}
                                                    {i < directors.length - 1 ? <DSpacer /> : null}
                                                </Box>
                                            ))}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex' }}>
                                        <Typography
                                            sx={{
                                                width: '150px',
                                                fontWeight: '600',
                                                color: alpha(theme.palette.text.primary, 0.8),
                                            }}
                                            variant='body1'
                                        >
                                            Studio
                                        </Typography>
                                        <Typography
                                            sx={{ display: 'flex', alignItems: 'center' }}
                                            variant='body1'
                                        >
                                            Domee Shi
                                        </Typography>
                                    </Box>
                                </Stack>
                            </Grid>
                            <Grid item md={5} p={2}>
                                <Stack spacing={2}>
                                    <Box sx={{ display: 'flex' }}>
                                        <Typography
                                            sx={{
                                                width: '150px',
                                                fontWeight: '600',
                                                color: alpha(theme.palette.text.primary, 0.8),
                                            }}
                                            variant='body1'
                                        >
                                            VIDEO
                                        </Typography>
                                        <Typography sx={{ fontWeight: '500' }} variant='body1'>
                                            1080p HD
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex' }}>
                                        <Typography
                                            sx={{
                                                width: '150px',
                                                fontWeight: '600',
                                                color: alpha(theme.palette.text.primary, 0.8),
                                            }}
                                            variant='body1'
                                        >
                                            AUDIO
                                        </Typography>
                                        <Typography
                                            sx={{
                                                fontWeight: '500',
                                                display: 'flex',
                                                alignItems: 'center',
                                            }}
                                            variant='body1'
                                            component={'span'}
                                        >
                                            English
                                            <DSpacer />
                                            Japanese
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex' }}>
                                        <Typography
                                            sx={{
                                                width: '150px',
                                                fontWeight: '600',
                                                color: alpha(theme.palette.text.primary, 0.8),
                                            }}
                                            variant='body1'
                                        >
                                            AVAILABLE QUALITIES
                                        </Typography>
                                        <Typography
                                            sx={{
                                                fontWeight: '500',
                                                display: 'flex',
                                                alignItems: 'center',
                                            }}
                                            variant='body1'
                                            component={'span'}
                                        >
                                            1080p
                                            <DSpacer />
                                            720p
                                            <DSpacer />
                                            480p
                                        </Typography>
                                    </Box>
                                </Stack>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
            <Box>
                <DSlider variant='people' title='Cast' itemData={data.cast} />
            </Box>
            <Box>
                <DSlider variant='item' title='Recommendation' itemData={[]} />
            </Box>
            <Box>
                <DSlider variant='video' title='Videos' itemData={data.videos} />
            </Box>
            <Box>
                {/* <DSlider variant='reviews' title='Reviews' itemData={data.reviews} /> */}
                <DReviewList title='Reviews' itemData={data.reviews} />
            </Box>
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

export default Serie;
