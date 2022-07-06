import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import DEpisodeCard from '../../components/DEpisodeCard';
import DSelect from '../../components/DSelect';
import {
    APP_API_PATH,
    APP_API_VERSION_PATH,
    APP_BACKDROP_QUALITY,
    APP_POSTER_QUALITY,
} from '../../config';

const SeasonPage = () => {
    const theme = useTheme();
    const { seriesId, seasonNumber }: any = useParams();
    const [data, setData] = useState<any>({});
    const [item, setItem] = useState<any>({});
    const [navigator, setNavigator] = useState<any>({});
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const navigate = useNavigate();
    const location: any = useLocation();

    const [alignment, setAlignment] = React.useState<string | null>('left');

    const handleAlignment = (event: React.MouseEvent<HTMLElement>, newAlignment: string | null) => {
        if (newAlignment !== null) {
            setAlignment(newAlignment);
        }
    };

    const handleSwitchSeason = (event: any) => {
        const season_index = data.seasons.findIndex(
            ({ season_number }) => season_number == event.target.value,
        );
        const newState = location.state;
        newState.seasonKey = season_index;
        navigate(`/series/${seriesId}/season/${event.target.value}`, { state: newState });
    };

    useEffect(() => {
        if (location.state) {
            setData(location.state.data);
            setItem(location.state.data.seasons[location.state.seasonKey]);
            setNavigator(getNavigator(location.state.data));
            setIsLoaded(true);
        } else {
            navigate(`/series/${seriesId}`);
        }
    }, [seriesId, seasonNumber]);

    const getNavigator = (data: any) => {
        const season_index = data.seasons.findIndex(
            ({ season_number }) => season_number == seasonNumber,
        );
        const prev_season_index = data.seasons.findIndex(
            ({ season_number }) => season_number == parseInt(seasonNumber) - 1,
        );
        let prev_season;
        let is_prev_season = false;
        if (prev_season_index >= 0) {
            prev_season = data.seasons[prev_season_index];
            is_prev_season = true;
        }
        const next_season_index = data.seasons.findIndex(
            ({ season_number }) => season_number == parseInt(seasonNumber) + 1,
        );
        let next_season;
        let is_next_season = false;
        if (next_season_index < data.seasons.length && next_season_index != -1) {
            next_season = data.seasons[next_season_index];
            is_next_season = true;
        }
        return {
            season_index: season_index,
            prev_season: prev_season,
            is_prev_season: is_prev_season,
            prev_season_index: prev_season_index,
            next_season: next_season,
            is_next_season: is_next_season,
            next_season_index: next_season_index,
        };
    };

    return isLoaded ? (
        <Box>
            <Box
                sx={{
                    textAlign: 'center',
                    width: '100%',
                    background: `linear-gradient(0deg, ${
                        theme.palette.background.default
                    } 0%, ${alpha(theme.palette.background.default, 0.5)} 100%), url(${
                        APP_API_PATH +
                        APP_API_VERSION_PATH +
                        '/assets/image/' +
                        APP_BACKDROP_QUALITY +
                        data.backdrop_path
                    }) no-repeat center center / cover`,
                }}
            >
                <Box
                    sx={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        minHeight: '400px',
                        textAlign: 'center',
                        paddingTop: '100px',
                    }}
                >
                    <Box sx={{ maxWidth: '220px', margin: 'auto' }}>
                        <img
                            style={{ borderRadius: '10px' }}
                            width='100%'
                            src={
                                APP_API_PATH +
                                APP_API_VERSION_PATH +
                                '/assets/image/' +
                                APP_POSTER_QUALITY +
                                item.poster_path
                            }
                            alt=''
                        />
                    </Box>
                    <Box sx={{ width: '100%', marginTop: '20px' }}>
                        <Typography sx={{ fontWeight: '500' }} variant='h4'>
                            {data.title}
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            width: '100%',
                            marginTop: '10px',
                            marginBottom: '20px',
                            display: 'flex',
                            justifyContent: 'center',
                        }}
                    >
                        <Typography sx={{ fontWeight: '500', marginRight: '20px' }} variant='h6'>
                            {item.name}
                        </Typography>
                        <Typography
                            sx={{ fontWeight: '500', color: theme.palette.secondary.light }}
                            variant='h6'
                        >
                            {item.episode_count} Episodes
                        </Typography>
                    </Box>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        maxWidth: 'calc(100% - 80px)',
                        margin: 'auto',
                    }}
                >
                    {navigator.is_prev_season && (
                        <Link
                            style={{
                                textDecoration: 'none',
                                color: theme.palette.text.primary,
                                marginLeft: '0',
                                marginRight: 'auto',
                            }}
                            to={`/series/${data.tmdb_id}/season/${navigator.prev_season.season_number}`}
                            state={{ data: data, seasonKey: navigator.prev_season_index }}
                            key={navigator.prev_season.id}
                        >
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <IconButton
                                    sx={{
                                        backgroundColor: theme.palette.background.paper,
                                        marginRight: '10px',
                                    }}
                                >
                                    <i className='ri-arrow-left-s-line'></i>
                                </IconButton>
                                <Typography>Previous Season</Typography>
                            </Box>
                        </Link>
                    )}
                    {navigator.is_next_season && (
                        <Link
                            style={{
                                textDecoration: 'none',
                                color: theme.palette.text.primary,
                                marginLeft: 'auto',
                                marginRight: '0',
                            }}
                            to={`/series/${data.tmdb_id}/season/${navigator.next_season.season_number}`}
                            state={{ data: data, seasonKey: navigator.next_season_index }}
                            key={navigator.next_season.id}
                        >
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Typography>Next Season</Typography>
                                <IconButton
                                    sx={{
                                        backgroundColor: theme.palette.background.paper,
                                        marginLeft: '10px',
                                    }}
                                >
                                    <i className='ri-arrow-right-s-line'></i>
                                </IconButton>
                            </Box>
                        </Link>
                    )}
                </Box>
            </Box>
            <Box sx={{ width: '100%' }}>
                <Box
                    sx={{
                        padding: '30px',
                        justifyContent: 'space-between',
                        width: '100%',
                        display: 'flex',
                    }}
                >
                    <DSelect
                        options={data.seasons.map(({ season_number }) => season_number.toString())}
                        width='300px'
                        fixedValue='Season'
                        onChange={handleSwitchSeason}
                        currentOption={item.season_number.toString()}
                    />
                    <ToggleButtonGroup
                        value={alignment}
                        exclusive
                        onChange={handleAlignment}
                        aria-label='text alignment'
                    >
                        <Tooltip title='Grid View'>
                            <ToggleButton
                                sx={{ padding: '0px 10px' }}
                                value='left'
                                aria-label='left aligned'
                            >
                                <i className='ri-grid-fill'></i>
                            </ToggleButton>
                        </Tooltip>
                        <Tooltip title='List View'>
                            <ToggleButton
                                sx={{ padding: '0px 10px' }}
                                value='center'
                                aria-label='centered'
                            >
                                <i className='ri-list-check'></i>
                            </ToggleButton>
                        </Tooltip>
                    </ToggleButtonGroup>
                </Box>
                <Box sx={{ padding: '30px' }}>
                    <Grid container spacing={3}>
                        {item.episodes.map((item, index) => (
                            <Grid key={index} item xs={6} lg={3} xl={2}>
                                <DEpisodeCard
                                    data={data}
                                    item={item}
                                    season_index={navigator.season_index}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Box>
        </Box>
    ) : null;
};

export default SeasonPage;
