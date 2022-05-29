import {
    Avatar,
    IconButton,
    List,
    ListItemAvatar,
    ListItemButton,
    ListItemText,
    Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import InputBase from '@mui/material/InputBase';
import { alpha, styled } from '@mui/material/styles';
import * as React from 'react';

import { APP_API_PATH, APP_API_VERSION_PATH, APP_POSTER_QUALITY } from '../config';
import DInfoModal from './DInfoModal';

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

const Search404 = styled('div')(({ theme }) => ({
    color: theme.palette.text.secondary,
}));

const SearchCardContainer = (props: any) => {
    const data = props.data || { ok: false };
    let movieData: object[] = [];
    let seriesData: object[] = [];
    if (data.ok && data.results) {
        movieData = data.results.movies || [];
        seriesData = data.results.series || [];
    }

    const [openModalState, setOpenModalState] = React.useState(false);
    const openInfoModal = (event: any) => {
        event.preventDefault();
        setOpenModalState(true);
    };
    const closeInfoModal = () => {
        setOpenModalState(false);
    };

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
                    {movieData.length ? (
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
                                    <ListItemText
                                        primary={item.title}
                                        secondary={(item.release_date || '').slice(0, 4)}
                                    />
                                    <IconButton onClick={openInfoModal} onContextMenu={(e) => e.preventDefault()} aria-label='more'>
                                        <i className='ri-more-2-fill'></i>
                                    </IconButton>
                                    <DInfoModal item={item} currentState={openModalState} closeInfoModal={closeInfoModal} />
                                </ListItemButton>
                            ))}
                        </List>
                    ) : data.ok ? (
                        <Search404>
                            <Typography variant='subtitle2'>No results...</Typography>
                        </Search404>
                    ) : null}
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
                    {seriesData.length ? (
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
                                    <IconButton onClick={openInfoModal} onContextMenu={(e) => e.preventDefault()} aria-label='more'>
                                        <i className='ri-more-2-fill'></i>
                                    </IconButton>
                                    <DInfoModal item={item} currentState={openModalState} closeInfoModal={closeInfoModal} />
                                </ListItemButton>
                            ))}
                        </List>
                    ) : data.ok ? (
                        <Search404>
                            <Typography variant='subtitle2'>No results...</Typography>
                        </Search404>
                    ) : null}
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
