import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import Grid from '@mui/material/Grid';
import {
    Avatar,
    List,
    ListItemButton,
    ListItemAvatar,
    ListItemText,
    Typography,
} from '@mui/material';
import { APP_API_PATH, APP_API_VERSION_PATH, APP_POSTER_QUALITY } from '../../config';

const SearchWrapper = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: '15px',
    transition: '0.2s ease-in',
    width: '400px',
    // width: "100%",
    height: '40px',
    backgroundColor: alpha(theme.palette.background.default, 0.7),
    backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.09))',
    '&:hover': {
        backgroundColor: alpha(theme.palette.background.paper, 1),
        boxShadow: `0px 0px 0px 2px ${alpha(theme.palette.background.paper, 0.5)}`,
    },
    '&:focus-within': {
        width: '100%',
    },
    [theme.breakpoints.down('md')]: {
        display: 'none',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const SearchInputBase = styled(InputBase)(({ theme }) => ({
    width: 'calc(100% - 110px)',
    zIndex: '10',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    },
}));

const SearchResults = styled('div')(({ theme }) => ({
    width: '100%',
    position: 'absolute',
    top: '50px',
    padding: '10px',
    backgroundColor: theme.palette.background.default,
    backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.09))',
    backdropFilter: 'blur(10px)',
    borderRadius: '0px 0px 10px 10px',
}));

const SearchCard = styled('div')(({ theme }) => ({
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    color: theme.palette.text.primary,
}));

/*
const movieData = [
    {
        name: 'Jujutsu Kaisen 0',
        date: 'Dec 24, 2021',
        rating: '87%',
        duration: '1 hour, 45 mins',
        poster: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx131573-rpl82vDEDRm6.jpg',
    },
    {
        name: 'Kimetsu no Yaiba: Mugen Ressha-hen',
        date: 'Oct 16, 2020',
        rating: '86%',
        duration: '1 hour, 57 mins',
        poster: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx112151-1qlQwPB1RrJe.png',
    },
    {
        name: 'Bubble',
        date: 'Apr 28, 2022',
        rating: '87%',
        duration: '1 hour, 40 mins',
        poster: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx131573-rpl82vDEDRm6.jpg',
    },
];

const serieData = [
    {
        name: 'Moon Knight',
        date: '2022',
        rating: '87%',
        duration: '47 mins',
        poster: 'https://www.themoviedb.org/t/p/w1280/zQSABH2Dza4mXLow2f0V2IQvJOL.jpg',
    },
    {
        name: 'Lucifer',
        date: '2016',
        rating: '86%',
        duration: '45 mins',
        poster: 'https://www.themoviedb.org/t/p/w1280/4EYPN5mVIhKLfxGruy7Dy41dTVn.jpg',
    },
    {
        name: 'Tangled: Before Ever After',
        date: '2017',
        rating: '87%',
        duration: '55 mins',
        poster: 'https://www.themoviedb.org/t/p/w1280/8BiZ8KXS0itmOx4uQw3E8UnmqEQ.jpg',
    },
];
*/

const SearchCardContainer = (props: any) => {
    const data = props.data || { ok: false };
    var movieData: object[] = [];
    var seriesData: object[] = [];
    if (data.ok && data.results) {
        movieData = data.results.movies || [];
        seriesData = data.results.series || [];
    }

    return (
        <Grid container>
            <Grid container spacing={1.2}>
                <Grid item xs={6}>
                    <Typography
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            marginBottom: '10px',
                        }}
                        variant='subtitle2'
                    >
                        <i style={{ paddingRight: '5px' }} className='ri-movie-2-fill'></i>
                        Movies
                    </Typography>
                    <List
                        sx={{
                            width: '100%',
                            bgcolor: 'background.paper',
                            borderRadius: '5px',
                            padding: '5px',
                        }}
                    >
                        {movieData.map((item: any, index: number) => (
                            <ListItemButton
                                sx={{ borderRadius: '5px', padding: '5px' }}
                                key={index}
                            >
                                <ListItemAvatar sx={{ marginRight: '5px' }}>
                                    <Avatar
                                        sx={{ width: '50px', height: '70px' }}
                                        variant='rounded'
                                        src={
                                            APP_API_PATH +
                                            APP_API_VERSION_PATH +
                                            '/assets/image/' +
                                            APP_POSTER_QUALITY +
                                            item.poster_url
                                        }
                                    />
                                </ListItemAvatar>
                                <ListItemText primary={item.title} secondary={item.release_date} />
                            </ListItemButton>
                        ))}
                    </List>
                </Grid>
                <Grid item xs={6}>
                    <Typography
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            marginBottom: '10px',
                        }}
                        variant='subtitle2'
                    >
                        <i style={{ paddingRight: '5px' }} className='ri-tv-fill'></i>
                        TV Series
                    </Typography>
                    <List
                        sx={{
                            width: '100%',
                            bgcolor: 'background.paper',
                            borderRadius: '5px',
                            padding: '5px',
                        }}
                    >
                        {seriesData.map((item: any, index: number) => (
                            <ListItemButton
                                sx={{ borderRadius: '5px', padding: '5px' }}
                                key={index}
                            >
                                <ListItemAvatar sx={{ marginRight: '5px' }}>
                                    <Avatar
                                        sx={{ width: '50px', height: '70px' }}
                                        variant='rounded'
                                        src={
                                            APP_API_PATH +
                                            APP_API_VERSION_PATH +
                                            '/assets/image/' +
                                            APP_POSTER_QUALITY +
                                            item.poster_url
                                        }
                                    />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={item.title}
                                    secondary={(item.release_date || '').slice(0, 4)}
                                />
                            </ListItemButton>
                        ))}
                    </List>
                </Grid>
            </Grid>
        </Grid>
    );
};

export {
    SearchWrapper,
    SearchIconWrapper,
    SearchInputBase,
    SearchResults,
    SearchCardContainer,
    SearchCard,
};
