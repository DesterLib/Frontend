import {
    Box,
    Collapse,
    IconButton,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    ListSubheader,
    Slider,
} from '@mui/material';
import Icon from 'components/icon';
import { findDOMNode } from 'react-dom';
import usePrevious from 'hooks/usePrevious';
import React from 'react';
import ReactPlayer from 'react-player';
import screenfull from 'screenfull';
import VideoPlayer from 'components/videoplayer';

const PlaygroundPage = () => {
    const containerRef = React.useRef<any>(null);
    const playerRef = React.useRef<any>(null);
    const [player, setPlayer] = React.useState({
        playing: false,
        light: false,
        volume: 0.8,
        muted: false,
        played: 0,
        loaded: 0,
        duration: 0,
        playbackRate: 1.0,
        loop: false,
        seeking: false,
        showMenu: false,
    });
    const prevVolume = usePrevious(player.volume);
    const handlePlayPauseToggle = () => {
        setPlayer({ ...player, playing: !player.playing });
    };
    const handleVolumeToggle = () => {
        setPlayer({ ...player, muted: !player.muted, volume: player.muted ? prevVolume : 0 });
    };
    const handleVolumeChange = (event: Event, newValue: any) => {
        setPlayer({ ...player, volume: newValue / 100, muted: newValue === 0 });
    };
    const handleSeekChange = (event: Event, newValue: any) => {
        setPlayer({ ...player, played: newValue });
        playerRef.current.seekTo(newValue);
    };
    const handleSeekMouseDown = (e: any) => {
        setPlayer({ ...player, seeking: true });
    };

    const handleSeekMouseUp = (e: any, newValue: any) => {
        setPlayer({ ...player, seeking: false });
    };
    const handleDuration = (duration: number) => {
        setPlayer({ ...player, duration: duration });
    };
    const handleProgress = (state: any) => {
        if (!player.seeking) {
            setPlayer({ ...player, played: state.playedSeconds });
        }
    };
    const handleFullscreenToggle = () => {
        screenfull.toggle(containerRef.current);
    };
    const handleEnded = () => {
        setPlayer({ ...player, playing: player.loop });
    };
    const handleOpenMenuToggle = () => {
        setPlayer({ ...player, showMenu: !player.showMenu });
    };

    const SettingsMenu = () => {
        const [openMenu, setOpenMenu] = React.useState(false);
        const handleMenuToggle = () => {
            setOpenMenu(!openMenu);
        };
        return (
            <Box
                sx={{
                    position: 'absolute',
                    bottom: '60px',
                    left: '0',
                    right: '0',
                    margin: 'auto',
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                <List
                    sx={{
                        width: '100%',
                        maxWidth: '600px',
                        bgcolor: 'background.default',
                    }}
                    component='nav'
                    aria-labelledby='nested-list-subheader'
                    subheader={
                        <ListSubheader component='div' id='nested-list-subheader'>
                            Settings
                        </ListSubheader>
                    }
                >
                    <ListItemButton>
                        <ListItemIcon>
                            <Icon name='sd' />
                        </ListItemIcon>
                        <ListItemText primary='Video Quality' />
                    </ListItemButton>
                    <ListItemButton>
                        <ListItemIcon>
                            <Icon name='pause' />
                        </ListItemIcon>
                        <ListItemText primary='Sent mail' />
                    </ListItemButton>
                    <ListItemButton onClick={handleMenuToggle}>
                        <ListItemIcon>
                            <Icon name='pause' />
                        </ListItemIcon>
                        <ListItemText primary='Inbox' />
                        {openMenu ? <Icon name='expand_less' /> : <Icon name='expand_more' />}
                    </ListItemButton>
                    <Collapse in={openMenu} timeout='auto' unmountOnExit>
                        <List component='div' disablePadding>
                            <ListItemButton sx={{ pl: 4 }}>
                                <ListItemIcon>
                                    <Icon name='pause' />
                                </ListItemIcon>
                                <ListItemText primary='Starred' />
                            </ListItemButton>
                        </List>
                    </Collapse>
                </List>
            </Box>
        );
    };
    return (
        // <Box
        //     ref={containerRef}
        //     sx={{
        //         width: '100%',
        //         maxWidth: '700px',
        //         position: 'relative',
        //         boxSizing: 'border-box',
        //     }}
        // >
        //     <ReactPlayer
        //         ref={playerRef}
        //         width='100%'
        //         height='100%'
        //         playing={player.playing}
        //         volume={player.volume}
        //         onProgress={handleProgress}
        //         onDuration={handleDuration}
        //         onEnded={handleEnded}
        //         url={
        //             'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
        //         }
        //         style={{ fontSize: '0px', display: 'block' }}
        //     />
        //     {player.showMenu && <SettingsMenu />}
        //     <Box
        //         sx={{
        //             display: 'flex',
        //             alignItems: 'center',
        //             position: 'absolute',
        //             bottom: '0',
        //             left: '0',
        //             right: '0',
        //             justifyContent: 'center',
        //             width: 'calc(100% - 10px)',
        //             maxWidth: '600px',
        //             padding: '5px',
        //             margin: 'auto',
        //             marginBottom: '5px',
        //             backdropFilter: 'blur(10px)',
        //             backgroundColor: '#00000089',
        //             borderRadius: '10px',
        //         }}
        //     >
        //         <IconButton
        //             sx={{ height: '40px', width: '40px' }}
        //             onClick={handlePlayPauseToggle}
        //             aria-label='play-pause'
        //         >
        //             {player.playing ? (
        //                 <Icon name='pause' fontSize='small' />
        //             ) : (
        //                 <Icon name='play_arrow' />
        //             )}
        //         </IconButton>
        //         <Slider
        //             aria-label='progress-bar'
        //             size='small'
        //             value={player.played}
        //             min={0}
        //             max={player.duration}
        //             onChange={handleSeekChange}
        //             onMouseDown={handleSeekMouseDown}
        //             onChangeCommitted={handleSeekMouseUp}
        //             sx={{
        //                 marginLeft: '20px',
        //                 marginRight: '20px',
        //                 height: 4,
        //                 color: '#ffffff',
        //                 '& .MuiSlider-thumb': {
        //                     width: 10,
        //                     height: 10,
        //                     '&:before': {
        //                         boxShadow: '0 2px 12px 0 rgba(0,0,0,0.4)',
        //                     },
        //                     '&:hover, &.Mui-focusVisible': {
        //                         boxShadow: `0px 0px 0px 8px rgb(255 255 255 / 16%)`,
        //                     },
        //                     '&.Mui-active': {
        //                         width: 13,
        //                         height: 13,
        //                     },
        //                 },
        //                 '& .MuiSlider-rail': {
        //                     opacity: 0.28,
        //                 },
        //             }}
        //         />
        //         <Box sx={{ display: 'flex', alignItems: 'center' }}>
        //             <IconButton onClick={handleVolumeToggle}>
        //                 {player.muted || player.volume === 0 ? (
        //                     <Icon name='volume_off' />
        //                 ) : (
        //                     <Icon name='volume_up' />
        //                 )}
        //             </IconButton>
        //             <Slider
        //                 aria-label='volume'
        //                 size='small'
        //                 min={0}
        //                 max={100}
        //                 value={player.volume * 100}
        //                 onChange={handleVolumeChange}
        //                 sx={{
        //                     maxWidth: '100px',
        //                     minWidth: '100px',
        //                     marginLeft: '20px',
        //                     marginRight: '20px',
        //                     color: '#ffffff',
        //                     height: 4,
        //                     '& .MuiSlider-thumb': {
        //                         width: 10,
        //                         height: 10,
        //                         '&:before': {
        //                             boxShadow: '0 2px 12px 0 rgba(0,0,0,0.4)',
        //                         },
        //                         '&:hover, &.Mui-focusVisible': {
        //                             boxShadow: `0px 0px 0px 8px rgb(255 255 255 / 16%)`,
        //                         },
        //                         '&.Mui-active': {
        //                             width: 13,
        //                             height: 13,
        //                         },
        //                     },
        //                     '& .MuiSlider-rail': {
        //                         opacity: 0.28,
        //                     },
        //                 }}
        //             />
        //         </Box>
        //         <IconButton onClick={handleOpenMenuToggle}>
        //             <Icon name='more_vert' />
        //         </IconButton>
        //         <IconButton onClick={handleFullscreenToggle}>
        //             <Icon name='fullscreen' />
        //         </IconButton>
        //     </Box>
        // </Box>
        <Box>
            <VideoPlayer url='https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' />
        </Box>
    );
};

export default PlaygroundPage;
