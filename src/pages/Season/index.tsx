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
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const navigate = useNavigate();
    const location: any = useLocation();

    const [alignment, setAlignment] = React.useState<string | null>('left');

    const handleAlignment = (event: React.MouseEvent<HTMLElement>, newAlignment: string | null) => {
        if (newAlignment !== null) {
            setAlignment(newAlignment);
        }
    };

    useEffect(() => {
        if (location.state) {
            setData(location.state.data);
            setItem(location.state.data.seasons[location.state.seasonKey]);
            setIsLoaded(true);
        } else {
            navigate(`/series/${seriesId}`);
        }
    }, [seriesId, seasonNumber]);

    let prev_season;
    let next_season;
    if (isLoaded) {
        const season_keys = Object.keys(data.seasons);
        const season_index = season_keys.indexOf(seasonNumber);
        prev_season = season_keys[season_index - 1];
        next_season = season_keys[season_index + 1];
    }

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
                    <Box sx={{ width: '100%', marginBottom: '20px' }}>
                        <Typography sx={{ fontWeight: '500' }} variant='h4'>
                            {data.title}
                        </Typography>
                    </Box>
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
                    {prev_season && (
                        <Link
                            style={{
                                textDecoration: 'none',
                                color: theme.palette.text.primary,
                                marginLeft: '0',
                                marginRight: 'auto',
                            }}
                            to={`/series/${data.tmdb_id}/season/${prev_season}`}
                            state={{ data: data, seasonKey: prev_season }}
                            key={data.seasons[prev_season].id}
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
                    {next_season && (
                        <Link
                            style={{
                                textDecoration: 'none',
                                color: theme.palette.text.primary,
                                marginLeft: 'auto',
                                marginRight: '0',
                            }}
                            to={`/series/${data.tmdb_id}/season/${next_season}`}
                            state={{ data: data, seasonKey: next_season }}
                            key={data.seasons[next_season].id}
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
                    <DSelect width='300px' />
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
                        {Object.entries(item.episodes).map(([key, val]) => (
                            <Grid key={key} item xs={6} lg={3} xl={2}>
                                <DEpisodeCard item={val} />
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Box>
        </Box>
    ) : null;
};

export default SeasonPage;
