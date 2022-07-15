import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Slide from '@mui/material/Slide';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import React from 'react';

import { APP_API_PATH, APP_API_VERSION_PATH, APP_THUMBNAIL_QUALITY } from '../../config';
import guid from '../../utilities/guid';

const DPlaylist = ({ open, setIsOpen, videoData, handleShitchUrl }: any) => {
    const handlePlaylistOpen = () => {
        setIsOpen(false);
    };

    return (
        <Slide direction='left' in={open} mountOnEnter unmountOnExit>
            <Box sx={{ backgroundColor: '#000000', height: 'fit-content', borderRadius: '10px' }}>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '5px',
                    }}
                >
                    <Box>
                        <IconButton sx={{ marginRight: '10px' }} onClick={handlePlaylistOpen}>
                            <span className='material-symbols-rounded'>close</span>
                        </IconButton>
                    </Box>
                    <Typography variant='h6'>{videoData.title}</Typography>
                    <Stack sx={{ paddingLeft: '15px !important' }} direction='row' spacing={1}>
                        {videoData &&
                            videoData.playlist &&
                            videoData.playlist.map((item: any) => (
                                <Chip
                                    key={guid()}
                                    size='small'
                                    sx={{
                                        color: '#ffffff',
                                        backgroundColor: '#ffffff33',
                                        padding: '0px 10px !important',
                                        borderRadius: '4px',
                                    }}
                                    label={item.season}
                                />
                            ))}
                    </Stack>
                </Box>
                <List sx={{ width: '100%', bgcolor: 'transparent' }}>
                    {videoData &&
                        videoData.playlist &&
                        videoData.playlist.map((season: any) => (
                            <Box key={guid()}>
                                <ListSubheader
                                    sx={{
                                        padding: '0px 10px !important',
                                        backgroundColor: 'rgba(65, 65, 65, 0.5)',
                                        color: '#ffffff',
                                        backdropFilter: 'blur(10px)',
                                    }}
                                >
                                    Season {season.season}
                                </ListSubheader>
                                {season &&
                                    season.episodes.map((item: any) => (
                                        <ListItemButton
                                            key={guid()}
                                            onClick={() => handleShitchUrl(item.url, item.title)}
                                            sx={{
                                                padding: '10px !important',
                                                '&:hover': {
                                                    backgroundColor: 'rgba(65, 65, 65, 0.3)',
                                                },
                                            }}
                                        >
                                            <ListItemAvatar>
                                                <Avatar
                                                    variant='square'
                                                    alt='Remy Sharp'
                                                    src={
                                                        APP_API_PATH +
                                                        APP_API_VERSION_PATH +
                                                        '/assets/image/' +
                                                        APP_THUMBNAIL_QUALITY +
                                                        item.thumbnail_path
                                                    }
                                                    sx={{ width: 120, height: 80, borderRadius: '5px', marginRight: '10px' }}
                                                />
                                            </ListItemAvatar>
                                            <Box>
                                                <ListItemText
                                                    sx={{
                                                        padding: '5px !important',
                                                        color: '#ffffff',
                                                        '& .Dester-ListItemText-secondary': {
                                                            color: 'rgba(255, 255, 255, 0.6)',
                                                        },
                                                    }}
                                                    primary={item.title}
                                                    secondary={
                                                        'S' + season.season + ' E' + item.episode
                                                    }
                                                />
                                                <Stack
                                                    sx={{ paddingLeft: '10px !important' }}
                                                    direction='row'
                                                    spacing={1}
                                                >
                                                    {item &&
                                                        item.resolutions &&
                                                        item.resolutions.map((quality: string) => (
                                                            <Chip
                                                                key={guid()}
                                                                size='small'
                                                                sx={{
                                                                    color: '#ffffff',
                                                                    backgroundColor: '#ffffff33',
                                                                    padding: '0px 10px !important',
                                                                    borderRadius: '4px',
                                                                }}
                                                                label={quality}
                                                            />
                                                        ))}
                                                </Stack>
                                            </Box>
                                        </ListItemButton>
                                    ))}
                            </Box>
                        ))}
                </List>
            </Box>
        </Slide>
    );
};

export default DPlaylist;
