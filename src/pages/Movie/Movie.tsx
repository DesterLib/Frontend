import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';
import { useTheme } from '@mui/system';
import React from 'react';
import { Link } from 'react-router-dom';
import useResizeObserver from 'use-resize-observer';

import DButton from '../../components/DButton';
import DComment from '../../components/DComment';
import DItemLogo from '../../components/DItemLogo';
import DSlider from '../../components/DSlider';
import DSpacer from '../../components/DSpacer';
import { MainWrapper } from './MoviePageComponents';

const people = [
    {
        id: 1,
        name: 'Sandra Oh',
        avatar: 'Ming (voice)',
        image: 'https://www.themoviedb.org/t/p/w276_and_h350_face/zU8vjebHxcP60ESEL5Ok68KWZvj.jpg',
    },
    {
        id: 2,
        name: 'Rosalie Chiang',
        avatar: 'Meilin "Mei" Lee (voice)',
        image: 'https://www.themoviedb.org/t/p/w276_and_h350_face/cbEWkQM0FS9vzv07JFErCk0YKkx.jpg',
    },
    {
        id: 3,
        name: 'Ava Morse',
        avatar: 'Miriam (voice)',
        image: 'https://www.themoviedb.org/t/p/w276_and_h350_face/e3bkf5MHPzqvSrJALr78pp0DCWt.jpg',
    },
    {
        id: 4,
        name: 'Maitreyi Ramakrishnan',
        avatar: 'Priya (voice)',
        image: 'https://www.themoviedb.org/t/p/w276_and_h350_face/jBFqjwvngaz6ZXEhNd6dMeZ0W6c.jpg',
    },
    {
        id: 5,
        name: 'Hyein Park',
        avatar: 'Abby (voice)',
        image: 'https://www.themoviedb.org/t/p/w276_and_h350_face/aud7tBslfKn2qIrKCbltxpXoOTi.jpg',
    },
];

const Movie = () => {
    const { ref, height } = useResizeObserver<HTMLDivElement>();
    const theme = useTheme();

    const videos = [
        {
            key: 'XdKzUbAiswE',
        },
        {
            key: 'dLI4xgDBkRc',
        },
        {
            key: '3U7KaI_NPGg',
        },
    ];

    return (
        <Box>
            <Grid container>
                <MainWrapper
                    ref={ref}
                    url='https://www.themoviedb.org/t/p/w1066_and_h600_bestv2/fOy2Jurz9k6RnJnMUMRDAgBwru2.jpg'
                />
                <Box
                    sx={{
                        backgroundImage:
                            'linear-gradient(90deg, rgba(0,21,28,1) 0%, rgba(0,0,0,0) 100%)',
                        // background:
                        //     '',
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
                    <Typography sx={{ fontWeight: '500', paddingBottom: '15px' }} variant='h4'>
                        Turning Red
                    </Typography>
                    <DItemLogo src='https://www.themoviedb.org/t/p/w1280/ut7WBlw5q0odVHIpZSRgmm6Trkr.png' />
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
                            src='https://www.themoviedb.org/t/p/w1280/qsdjk9oAKSQMWs0Vt5Pyfh6O4GZ.jpg'
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
                        <Typography variant='body2'>
                            Thirteen-year-old Mei is experiencing the awkwardness of being a
                            teenager with a twist – when she gets too excited, she transforms into a
                            giant red panda.
                        </Typography>
                        <Box sx={{ marginTop: '20px' }}>
                            <Link style={{ textDecoration: 'none' }} to='search?genre=animation'>
                                <Chip
                                    clickable
                                    sx={{ margin: theme.spacing(0.5) }}
                                    label='Animation'
                                />
                            </Link>
                            <Link style={{ textDecoration: 'none' }} to='search?genre=family'>
                                <Chip
                                    clickable
                                    sx={{ margin: theme.spacing(0.5) }}
                                    label='Family'
                                />
                            </Link>
                            <Link style={{ textDecoration: 'none' }} to='search?genre=comedy'>
                                <Chip
                                    clickable
                                    sx={{ margin: theme.spacing(0.5) }}
                                    label='Comedy'
                                />
                            </Link>
                            <Link style={{ textDecoration: 'none' }} to='search?genre=fantasy'>
                                <Chip
                                    clickable
                                    sx={{ margin: theme.spacing(0.5) }}
                                    label='Fantasy'
                                />
                            </Link>
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
                                            variant='body1'
                                        >
                                            Domee Shi
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
                                        >
                                            Domee Shi
                                            <DSpacer />
                                            Julia Cho
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
                <DSlider variant='person' title='Cast' itemData={people} />
            </Box>
            <Box>
                <DSlider variant='item' title='Recommendation' itemData={people} />
            </Box>
            <Box>
                <DSlider variant='video' title='Videos' itemData={videos} />
            </Box>
            <Box sx={{ maxWidth: '820px', padding: '10px' }}>
                <Typography
                    sx={{
                        padding: '0px 20px',
                        display: 'flex',
                        alignItems: 'center',
                    }}
                    variant='h5'
                >
                    Reviews
                </Typography>
                <Box sx={{ padding: '20px' }}>
                    <DComment />
                </Box>
            </Box>
        </Box>
    );
};

export default Movie;
