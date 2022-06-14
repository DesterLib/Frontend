import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import React from 'react';

const DPlaylist = ({ data, show, handleClose, handleShitchUrl }: any) => {
    return (
        <Box
            sx={{
                width: '100%',
                height: '100%',
                maxWidth: '600px',
                float: 'right',
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                display: show ? 'flex' : 'none',
                flexDirection: 'column',
                zIndex: show ? '60 !important' : '30 !important',
            }}
        >
            <Box sx={{ display: 'flex', padding: '20px !important' }}>
                <IconButton
                    onClick={() => handleClose()}
                    sx={{
                        width: '40px',
                        height: '40px',
                        backgroundColor: '#ffffff33',
                        marginRight: '20px !important',
                        color: '#ffffff',
                    }}
                    color='primary'
                    aria-label='close'
                    component='span'
                >
                    <i className='ri-close-fill'></i>
                </IconButton>
                <Box>
                    <Typography>Demon Slayer: Kimetsu no Yaiba</Typography>
                    <Typography sx={{ color: '#D0D0D0' }}>Season 1</Typography>
                </Box>
            </Box>
            <Box sx={{ overflowY: 'auto' }}>
                <List sx={{ width: '100%', bgcolor: 'transparent' }}>
                    {data &&
                        data.seasons &&
                        data.seasons.map((season: any, index: number) => (
                            <div key={index}>
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
                                            key={item.id}
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
                                                    variant='rounded'
                                                    alt='Remy Sharp'
                                                    src={item.thumbnail}
                                                    sx={{ width: 120, height: 80 }}
                                                />
                                            </ListItemAvatar>
                                            <Box>
                                                <ListItemText
                                                    sx={{
                                                        padding: '5px !important',
                                                        color: '#ffffff',
                                                        '& .MuiListItemText-secondary': {
                                                            color: 'rgba(255, 255, 255, 0.6)',
                                                        },
                                                    }}
                                                    primary={item.title}
                                                    secondary={
                                                        'Season ' +
                                                        item.season +
                                                        ' Episode ' +
                                                        item.episode
                                                    }
                                                />
                                                <Stack
                                                    sx={{ paddingLeft: '10px !important' }}
                                                    direction='row'
                                                    spacing={1}
                                                >
                                                    {item &&
                                                        item.resolutions &&
                                                        item.resolutions.map(
                                                            (quality: string, index: number) => (
                                                                <Chip
                                                                    key={index}
                                                                    size='small'
                                                                    sx={{
                                                                        color: '#ffffff',
                                                                        backgroundColor:
                                                                            '#ffffff33',
                                                                        padding:
                                                                            '0px 10px !important',
                                                                        borderRadius: '4px',
                                                                    }}
                                                                    label={quality}
                                                                />
                                                            ),
                                                        )}
                                                </Stack>
                                            </Box>
                                        </ListItemButton>
                                    ))}
                            </div>
                        ))}
                </List>
            </Box>
        </Box>
    );
};

export default DPlaylist;
