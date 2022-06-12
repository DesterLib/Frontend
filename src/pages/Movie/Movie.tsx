import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import { useTheme } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

import DButton from '../../components/DButton';
import DItemLogo from '../../components/DItemLogo';
import DPlayer from '../../components/DPlayer';
import DReviewList from '../../components/DReview/DReviewList';
import DSlider from '../../components/DSlider';
import DSpacer from '../../components/DSpacer';
import {
    APP_API_PATH,
    APP_API_VERSION_PATH,
    APP_BACKDROP_QUALITY,
    APP_POSTER_QUALITY,
} from '../../config';
import useBreakpoint from '../../utilities/useBreakpoint';
import { HeaderImage, ItemBackground, LinearGradient, PosterImage } from './MoviePageComponents';

const Movie = () => {
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [data, setData] = useState<any>({});
    const theme = useTheme();
    const breakpoint = useBreakpoint();
    const { id } = useParams();

    useEffect(() => {
        const getData = async () => {
            const res = await fetch(`${APP_API_PATH}${APP_API_VERSION_PATH}/movie/${id}`);
            const data = (await res.json()) || null;
            setData(data.result || { ok: false });
            setIsLoaded(true);
        };
        getData();
    }, [id]);

    let directors;
    let screenplays;
    let path;
    let videoData;
    if (isLoaded && data && Object.keys(data).length !== 0 && data.crew) {
        directors = data.crew.filter(({ job }: any) => job === 'Director');
        screenplays = data.crew.filter(({ job }: any) => job === 'Screenplay');
        path = data.path;
        videoData = {
            id: '1',
            title: data.title,
            subTitle: data.title,
            src: `${APP_API_PATH}${APP_API_VERSION_PATH}/stream/${data.rclone_index}/${path[0]}`,
            playlist: [],
        };
    }

    return isLoaded ? (
        <Box>
            <Box>
                <Box sx={{ width: '100%', position: 'relative' }}>
                    <ItemBackground>
                        {(breakpoint === 'xs' || breakpoint === 'sm') && (
                            <>
                                <HeaderImage
                                    src={
                                        APP_API_PATH +
                                        APP_API_VERSION_PATH +
                                        '/assets/image/' +
                                        APP_POSTER_QUALITY +
                                        data.poster_path
                                    }
                                    alt={data.title}
                                />
                                <LinearGradient />
                            </>
                        )}
                        {breakpoint !== 'xs' && breakpoint !== 'sm' && (
                            <>
                                <HeaderImage
                                    src={
                                        APP_API_PATH +
                                        APP_API_VERSION_PATH +
                                        '/assets/image/' +
                                        APP_BACKDROP_QUALITY +
                                        data.backdrop_path
                                    }
                                    alt={data.title}
                                />
                                <LinearGradient />
                            </>
                        )}
                    </ItemBackground>
                    <Box
                        sx={{
                            position: 'absolute',
                            zIndex: '20',
                            display: 'flex',
                            height: 'fit-content',
                            flexDirection: 'column',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            marginTop: 'auto',
                            marginLeft: '40px',
                            marginBottom: '40px',
                            [theme.breakpoints.down('md')]: {
                                alignItems: 'center',
                                marginLeft: 'auto',
                                marginBottom: '10px',
                            },
                        }}
                    >
                        <DItemLogo
                            src={`https://www.themoviedb.org/t/p/w1280/${data.logo_path}`}
                        />
                        <Typography
                            sx={{
                                fontWeight: '500',
                                paddingBottom: '15px',
                                width: '90%',
                                [theme.breakpoints.down('md')]: {
                                    textAlign: 'center',
                                },
                            }}
                            variant='h5'
                        >
                            {data.title}
                        </Typography>
                        <Grid
                            container
                            sx={{
                                marginTop: '20px',
                                [theme.breakpoints.down('md')]: {
                                    justifyContent: 'center',
                                },
                            }}
                        >
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
                            <Grid item>
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
                    </Box>
                </Box>
                <Grid container p={2}>
                    <Grid
                        item
                        sx={{
                            [theme.breakpoints.down('sm')]: {
                                display: 'none',
                            },
                        }}
                        xs={12}
                        sm={3}
                        md={2}
                    >
                        <Box sx={{ padding: '20px' }}>
                            <PosterImage
                                src={
                                    APP_API_PATH +
                                    APP_API_VERSION_PATH +
                                    '/assets/image/' +
                                    APP_POSTER_QUALITY +
                                    data.poster_path
                                }
                                alt={data.title}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={9} md={10}>
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
                            <Grid container sx={{ marginTop: '20px' }}>
                                <Grid item md={7} sx={{ marginBottom: '15px' }}>
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
                                                        sx={{
                                                            display: 'flex',
                                                            flexDirection: 'row',
                                                        }}
                                                        key={director.id}
                                                    >
                                                        {director.name}
                                                        {i < directors.length - 1 ? (
                                                            <DSpacer />
                                                        ) : null}
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
                                                {screenplays.map((screenplay: any, i: number) => (
                                                    <Box
                                                        sx={{
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            [theme.breakpoints.down('sm')]: {
                                                                flexDirection: 'column',
                                                            },
                                                            [theme.breakpoints.up('sm')]: {
                                                                flexDirection: 'row',
                                                            },
                                                        }}
                                                        key={screenplay.id}
                                                    >
                                                        {screenplay.name}
                                                        {i < screenplays.length - 1 ? (
                                                            <DSpacer />
                                                        ) : null}
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
                                <Grid item md={5}>
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
                    <DReviewList title='Reviews' itemData={data.reviews} />
                </Box>
                <Box>
                    <DPlayer videoData={videoData} />
                </Box>
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

export default Movie;
