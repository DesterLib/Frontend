import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import { createPortal } from 'react-dom';

import useBreakpoint from '../../utilities/useBreakpoint';
import DPlayerBase from './DWebPlayerBase';
import DPlaylist from './DWebPlaylist';

const DPlayer = ({ videoData, aspectRatio }: any) => {
    const [isOpen, setIsOpen] = useState(false);
    const [art, setArt] = useState<any>({});
    const breakpoint = useBreakpoint();

    function handleShitchUrl(url: any, title: any) {
        art.switchUrl(url, title);
    }
    const handlePlaylistOpen = () => {
        setIsOpen(true);
    };

    const settings = {
        fullscreen: true,
        setting: true,
        loop: true,
        flip: true,
        playbackRate: true,
        aspectRatio: true,
        whitelist: ['*'],
        layers: [
            {
                html: '',
                name: 'title',
            },
        ],
        controls:
            videoData && videoData.playlist && videoData.playlist.length > 0
                ? [
                      {
                          position: 'right',
                          html: '<span class="material-symbols-rounded">playlist_play</span>',
                          tooltip: 'Playlist',
                          click: function () {
                              handlePlaylistOpen();
                          },
                      },
                  ]
                : [],
        icons: {
            play: '<span class="material-symbols-rounded">play_arrow</span>',
            pause: '<span class="material-symbols-rounded">pause</span>',
            volume: '<span class="material-symbols-rounded">volume_up</span>',
            volumeClose: '<span class="material-symbols-rounded">volume_off</span>',
            fullscreenOn: '<span class="material-symbols-rounded">fullscreen</span>',
            fullscreenOff: '<span class="material-symbols-rounded">fullscreen_exit</span>',
            // loading: '<img src="/assets/img/ploading.gif">',
            // state: '<img src="/assets/img/state.png">',
            check: '<span class="material-symbols-rounded">closed_caption</span>',
            subtitle: '<span class="material-symbols-rounded">closed_caption</span>',
            screenshot: '<span class="material-symbols-rounded">photo_camera</span>',
            setting: '<span class="material-symbols-rounded">settings</span>',
            pip: '<i class="ri-picture-in-picture-fill"></i>',
            arrowLeft: '<i class="ri-arrow-left-s-line"></i>',
            arrowRight: '<i class="ri-arrow-right-s-line"></i>',
            playbackRate: '<i class="ri-speed-fill"></i>',
            aspectRatio: '<i class="ri-aspect-ratio-fill"></i>',
            config: '<i class="ri-sound-module-fill"></i>',
            lock: '<i class="ri-lock-fill"></i>',
            unlock: '<i class="ri-lock-unlock-fill"></i>',
            indicator: '<i class="ri-checkbox-blank-circle-fill"></i>',
        },
    };
    return (
        <Box>
            <Box
                sx={{
                    width: '100%',
                    position: 'relative',
                    padding: breakpoint === 'xs' || breakpoint === 'sm' ? '10px' : '0px',
                    paddingTop: breakpoint === 'xs' || breakpoint === 'sm' ? '20px' : '0px',
                    paddingBottom: breakpoint === 'xs' || breakpoint === 'sm' ? '5px' : '0px',
                }}
            >
                <DPlayerBase
                    style={{
                        width: '100% !important',
                        aspectRatio: aspectRatio,
                    }}
                    src={videoData && videoData.url}
                    settings={settings}
                    getInstance={(art: any) => {
                        art.on('ready', () => setArt(art));
                    }}
                />
                <Box
                    sx={{
                        position: 'absolute',
                        top: '0',
                        right: '0',
                        zIndex: '1000',
                        pointerEvents:
                            isOpen && breakpoint !== 'xs' && breakpoint !== 'sm' ? 'auto' : 'none',
                        transition: 'all 0.2s ease',
                        maxWidth: '600px',
                        width: '50%',
                        height: '100%',
                        overflowY: 'scroll',
                        overflowX: 'hidden',
                    }}
                >
                    {breakpoint !== 'xs' && breakpoint !== 'sm' && (
                        <DPlaylist
                            open={isOpen}
                            setIsOpen={setIsOpen}
                            handleShitchUrl={handleShitchUrl}
                            videoData={videoData}
                            playlistData={videoData && videoData.playlist}
                        />
                    )}
                    {/* prettier-ignore */}
                    {Object.keys(art).length !== 0 &&
                        createPortal(
                            <Box sx={{ padding: '20px !important' }}>
                                <Typography variant='h5'>{videoData.title}</Typography>
                                <Typography variant='subtitle1'>{videoData.subTitle}</Typography>
                            </Box>,
                            art.layers.title,
                        )}
                </Box>
            </Box>
            <Box>
                {(breakpoint === 'xs' || breakpoint === 'sm') && (
                    <Box sx={{ marginBottom: '80px', padding: '10px', paddingTop: '5px' }}>
                        <DPlaylist
                            open={isOpen}
                            setIsOpen={setIsOpen}
                            handleShitchUrl={handleShitchUrl}
                            videoData={videoData}
                            playlistData={videoData && videoData.playlist}
                        />
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default DPlayer;
