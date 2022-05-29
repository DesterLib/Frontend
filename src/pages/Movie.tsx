import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';
import { useTheme } from '@mui/system';
import React from 'react';
import useResizeObserver from 'use-resize-observer';

import DButton from '../components/DButton';
import DItemLogo from '../components/DItemLogo';
import DSlider from '../components/DSlider';

const people = [
    {
        id: 1,
        name: 'Sandra Oh',
        avatar: 'Ming (voice)',
        image: 'https://www.themoviedb.org/t/p/w276_and_h350_face/zU8vjebHxcP60ESEL5Ok68KWZvj.jpg'
    },
    {
        id: 2,
        name: 'Rosalie Chiang',
        avatar: 'Meilin "Mei" Lee (voice)',
        image: 'https://www.themoviedb.org/t/p/w276_and_h350_face/cbEWkQM0FS9vzv07JFErCk0YKkx.jpg'
    },
    {
        id: 3,
        name: 'Ava Morse',
        avatar: 'Miriam (voice)',
        image: 'https://www.themoviedb.org/t/p/w276_and_h350_face/e3bkf5MHPzqvSrJALr78pp0DCWt.jpg'
    },
    {
        id: 4,
        name: 'Maitreyi Ramakrishnan',
        avatar: 'Priya (voice)',
        image: 'https://www.themoviedb.org/t/p/w276_and_h350_face/jBFqjwvngaz6ZXEhNd6dMeZ0W6c.jpg'
    },
    {
        id: 5,
        name: 'Hyein Park',
        avatar: 'Abby (voice)',
        image: 'https://www.themoviedb.org/t/p/w276_and_h350_face/aud7tBslfKn2qIrKCbltxpXoOTi.jpg'
    }
];

const Movie = () => {
    const { ref, height } = useResizeObserver<HTMLDivElement>();
    const theme = useTheme();
    return (
        <Box>
            <Grid container>
                <Box
                    ref={ref}
                    sx={{
                        backgroundImage:
                            'url(https://www.themoviedb.org/t/p/original/iPhDToxFzREctUA0ZQiYZamXsMy.jpg)',
                        backgroundSize: 'cover',
                        position: 'absolute',
                        opacity: '0.7',
                        width: '100%',
                        aspectRatio: '21/9',
                        zIndex: '0',
                    }}
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
                    <Typography paragraph>
                        The story is based on the life of Rifleman Jaswant Singh Rawat. 55 years ago
                        during 1962 Indo-China war , when the destiny of war was pre decided, there
                        stood a brave soldier from 4th Garhwal...
                    </Typography>
                    <Grid container>
                        <Grid sx={{ marginRight: '10px' }} item>
                            <DButton
                                startIcon={<i className='ri-play-mini-fill'></i>}
                                variant='contained'
                            >
                                Play
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
                            <Typography variant='body1'>Domee Shi</Typography>
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
                            <Typography variant='body1'>Domee Shi, Julia Cho</Typography>
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
                            <Typography variant='body1'>Domee Shi</Typography>
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
                            <Typography sx={{ fontWeight: '500' }} variant='body1'>
                                English, Japanese
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
                            <Typography sx={{ fontWeight: '500' }} variant='body1'>
                                1080p, 720p, 480p
                            </Typography>
                        </Box>
                    </Stack>
                </Grid>
            </Grid>
            <Box>
                <DSlider variant='person' title='Cast' itemData={people} />
            </Box>
            <Box>
                <DSlider variant='item' title='Recommendation' itemData={people} />
            </Box>
        </Box>
    );
};

export default Movie;
