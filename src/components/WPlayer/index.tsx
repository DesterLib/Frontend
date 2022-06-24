import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import React from 'react';
import { createPortal } from 'react-dom';

import DPlayerBase from './WPlayerBase';
import DPlaylist from './WPlaylist';

const DPlayer = ({ videoData, aspectRatio }: any) => {
    const [show, setShow] = React.useState(false);
    const [art, setArt] = React.useState<any>({});

    const handleClose = () => {
        setShow(false);
    };

    function handleShitchUrl(url: any, title: any) {
        art.switchUrl(url, title);
    }

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
                name: 'close',
            },
            {
                html: '',
                name: 'playlist',
            },
            {
                html: '',
                name: 'title',
            },
        ],
        controls:
            videoData.playlist && videoData.playlist.length > 0
                ? [
                      {
                          tooltip: 'Playlist',
                          position: 'right',
                          html: '<i class="ri-play-list-2-fill"></i>',
                          click: function () {
                              setShow((state: any) => !state);
                          },
                      },
                  ]
                : [],
        icons: {
            play: '<i class="ri-play-fill"></i>',
            volume: '<i class="ri-volume-up-fill"></i>',
            fullscreenOff: '<i class="ri-fullscreen-exit-fill"></i>',
            fullscreenOn: '<i class="ri-fullscreen-fill"></i>',
            // loading: '<img src="/assets/img/ploading.gif">',
            // state: '<img src="/assets/img/state.png">',
            pause: '<i class="ri-pause-fill"></i>',
            check: '<i class="ri-check-fill"></i>',
            volumeClose: '<i class="ri-volume-mute-fill"></i>',
            subtitle: '<i class="ri-closed-captioning-fill"></i>',
            screenshot: '<i class="ri-screenshot-2-fill"></i>',
            setting: '<i class="ri-settings-2-fill"></i>',
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
        <Box sx={{ marginLeft: 'auto', marginRight: 'auto', marginTop: '20px' }}>
            <>
                <DPlayerBase
                    style={{
                        width: '100% !important',
                        aspectRatio: aspectRatio,
                    }}
                    src={videoData.url}
                    settings={settings}
                    getInstance={(art: any) => {
                        art.on('ready', () => setArt(art));
                    }}
                />
                {/* prettier-ignore */}
                {Object.keys(art).length !== 0 &&
                    createPortal(
                        <Box
                            sx={{
                                width: '100%',
                                height: '100%',
                                display: show ? 'block' : 'none',
                                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                                zIndex: show ? '60 !important' : '30 !important',
                            }}
                            onClick={() => handleClose()}
                        />,
                        art.layers.close,
                    )}
                {/* prettier-ignore */}
                {Object.keys(art).length !== 0 &&
                    createPortal(
                        <DPlaylist
                            show={show}
                            videoData={videoData}
                            playlistData={videoData.playlist}
                            handleClose={handleClose}
                            handleShitchUrl={handleShitchUrl}
                        />,
                        art.layers.playlist,
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
            </>
        </Box>
    );
};

export default DPlayer;
