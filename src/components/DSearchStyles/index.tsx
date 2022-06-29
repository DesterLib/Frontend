import Avatar from '@mui/material/Avatar';
import Box, { BoxProps } from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputBase, { InputBaseProps } from '@mui/material/InputBase';
import List, { ListProps } from '@mui/material/List';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton, { ListItemButtonProps } from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { alpha, styled } from '@mui/material/styles';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import {
    APP_API_PATH,
    APP_API_VERSION_PATH,
    APP_NO_IMAGE_POSTER,
    APP_POSTER_QUALITY,
} from '../../config';
import DInfoModal from '../DInfoModal';

const SearchWrapper = styled(Box)<any>(({ theme, fullWidth, standalone }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    transition: '0.2s ease-out',
    width: fullWidth ? '100%' : '400px',
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
        display: standalone ? 'block' : 'none',
    },
}));

const SearchIconWrapper = styled(Box)<BoxProps>(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    color: theme.palette.text.secondary,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const SearchInputBase = styled(InputBase)<InputBaseProps>(({ theme }) => ({
    zIndex: '10',
    '& .Dester-InputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    },
}));

const SearchResults = styled(Box)<BoxProps>(({ theme }) => ({
    width: '100%',
    position: 'absolute',
    top: '50px',
    padding: '10px',
    backgroundColor: theme.palette.background.default,
    backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.09))',
    backdropFilter: 'blur(10px)',
    borderRadius: '0px 0px 10px 10px',
}));

const SearchCard = styled(Box)<BoxProps>(({ theme }) => ({
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    color: theme.palette.text.primary,
}));

const SearchItemButton = styled(ListItemButton)<ListItemButtonProps>(({ theme }) => ({
    borderRadius: theme.shape.borderRadius,
    padding: '5px',
}));

const SearchList = styled(List)<ListProps>(({ theme }) => ({
    width: '100%',
    bgcolor: 'background.paper',
    borderRadius: theme.shape.borderRadius,
    padding: '5px',
}));

const Search404 = styled(Box)<BoxProps>(({ theme }) => ({
    color: theme.palette.text.secondary,
}));

const SearchRouterLink = styled(Link)(() => ({
    textDecoration: 'none',
    color: 'inherit',
}));

const SearchCardContainer = (props: any) => {
    const data = props.data || { ok: false };
    let movieData: object[] = [];
    let seriesData: object[] = [];
    if (data.ok && data.result) {
        movieData = data.result.movies || [];
        seriesData = data.result.series || [];
    }

    const SearchRouter = ({ item, type }: any) => {
        const [openModalState, setOpenModalState] = useState(false);

        const openInfoModal = (event: any) => {
            event.preventDefault();
            setOpenModalState(true);
        };

        const closeInfoModal = () => {
            setOpenModalState(false);
        };

        return type === 'movie' && item ? (
            <SearchRouterLink to={`/${type}/${item.tmdb_id}`}>
                <SearchItemButton>
                    <ListItemAvatar sx={{ marginRight: '5px' }}>
                        <Avatar
                            sx={{ width: '50px', height: '70px' }}
                            variant='rounded'
                            src={
                                item.poster_path
                                    ? APP_API_PATH +
                                      APP_API_VERSION_PATH +
                                      '/assets/image/' +
                                      APP_POSTER_QUALITY +
                                      item.poster_path
                                    : APP_NO_IMAGE_POSTER
                            }
                        />
                    </ListItemAvatar>
                    <ListItemText primary={item.title} secondary={item.year} />
                    <IconButton
                        onClick={openInfoModal}
                        onContextMenu={(e) => e.preventDefault()}
                        aria-label='more'
                    >
                        <i className='ri-more-2-fill'></i>
                    </IconButton>
                    <DInfoModal
                        item={item}
                        currentState={openModalState}
                        closeInfoModal={closeInfoModal}
                    />
                </SearchItemButton>
            </SearchRouterLink>
        ) : type === 'series' && item ? (
            <SearchRouterLink to={`/${type}/${item.tmdb_id}`}>
                <SearchItemButton>
                    <ListItemAvatar sx={{ marginRight: '5px' }}>
                        <>
                            <Avatar
                                sx={{ width: '50px', height: '70px' }}
                                variant='rounded'
                                src={
                                    item.poster_path
                                        ? APP_API_PATH +
                                          APP_API_VERSION_PATH +
                                          '/assets/image/' +
                                          APP_POSTER_QUALITY +
                                          item.poster_path
                                        : APP_NO_IMAGE_POSTER
                                }
                            />
                        </>
                    </ListItemAvatar>
                    <ListItemText primary={item.title} secondary={item.year} />
                    <IconButton
                        onClick={openInfoModal}
                        onContextMenu={(e) => e.preventDefault()}
                        aria-label='more'
                    >
                        <i className='ri-more-2-fill'></i>
                    </IconButton>
                    <DInfoModal
                        item={item}
                        currentState={openModalState}
                        closeInfoModal={closeInfoModal}
                    />
                </SearchItemButton>
            </SearchRouterLink>
        ) : null;
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
                        <SearchList>
                            {movieData.map((item: any, index: number) => (
                                <SearchRouter item={item} type='movie' key={index} />
                            ))}
                        </SearchList>
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
                        <i style={{ paddingRight: '5px' }} className='ri-movie-2-fill'></i>
                        Series
                    </Typography>
                    {seriesData.length ? (
                        <SearchList>
                            {seriesData.map((item: any, index: number) => (
                                <SearchRouter item={item} type='series' key={index} />
                            ))}
                        </SearchList>
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
