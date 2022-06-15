import { IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/system';
import React from 'react';
import { Link } from 'react-router-dom';

const data = {
    title: 'Demon Slayer: Kimetsu no Yaiba (2019)',
    description:
        'It is the Taisho Period in Japan. Tanjiro, a kindhearted boy who sells charcoal for a living, finds his family slaughtered by a demon. To make matters worse, his younger sister Nezuko, the sole survivor, has been transformed into a demon herself. Though devastated by this grim reality, Tanjiro resolves to become a “demon slayer” so that he can turn his sister back into a human, and kill the demon that massacred his family.',
    poster: 'https://www.themoviedb.org/t/p/w1280/wrCVHdkBlBWdJUZPvnJWcBRuhSY.jpg',
    backdrop:
        'https://www.themoviedb.org/t/p/w1066_and_h600_bestv2/nTvM4mhqNlHIvUkI1gVnW6XP7GG.jpg',
    seasonNo: 1,
    episodeCount: 24,
    episodes: [
        {
            title: 'Cruelty',
            description:
                'It is the Taisho Period (i.e. 1912-1926). Tanjiro Kamado is living a modest but blissful life in the mountains with his family. One day, when he returns from selling charcoal in town, he finds the remains of his slaughtered family in pools of blood after a demon attack. Tanjiro rushes down the snowy mountain with the sole survivor, his sister Nezuko, on his back. But on the way, Nezuko suddenly snarls, turning on Tanjiro.',
            thumbnail:
                'https://www.themoviedb.org/t/p/w454_and_h254_bestv2/tBBiqP5rAhIpZt54b5fA0DFuhCQ.jpg',
        },
    ],
};

const SeasonPage = () => {
    const theme = useTheme();
    return (
        <Box
            sx={{
                background: `linear-gradient(0deg, ${theme.palette.background.default} 0%, ${alpha(
                    theme.palette.background.default,
                    0.7,
                )} 100%), url(${data.backdrop}) no-repeat center center / cover`,
            }}
        >
            <Box
                sx={{
                    paddingTop: '100px',
                    width: '100%',
                    display: 'flex',
                    textAlign: 'center',
                    flexDirection: 'column',
                }}
            >
                <Box sx={{ width: '100%', marginBottom: '20px' }}>
                    <Typography sx={{ fontWeight: '500' }} variant='h5'>
                        {data.title}
                    </Typography>
                </Box>
                <Box sx={{ maxWidth: '220px', margin: 'auto' }}>
                    <img style={{ borderRadius: '10px' }} width='100%' src={data.poster} alt='' />
                </Box>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    maxWidth: 'calc(100% - 80px)',
                    margin: 'auto',
                }}
            >
                <Link style={{ textDecoration: 'none', color: theme.palette.text.primary }} to=''>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton sx={{ backgroundColor: theme.palette.background.paper, marginRight: '10px' }}>
                            <i className='ri-arrow-left-s-line'></i>
                        </IconButton>
                        <Typography>Previous Season</Typography>
                    </Box>
                </Link>
                <Link style={{ textDecoration: 'none', color: theme.palette.text.primary }} to=''>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography>Next Season</Typography>
                        <IconButton sx={{ backgroundColor: theme.palette.background.paper, marginLeft: '10px' }}>
                            <i className='ri-arrow-right-s-line'></i>
                        </IconButton>
                    </Box>
                </Link>
            </Box>
        </Box>
    );
};

export default SeasonPage;
