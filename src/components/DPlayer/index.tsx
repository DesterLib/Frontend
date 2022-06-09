import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import React from 'react';
import { createPortal } from 'react-dom';

import DPlayerBase from './DPlayerBase';
import DPlaylist from './DPlaylist';

const DPlayer = ({ videoData }: any) => {
    const [show, setShow] = React.useState(false);
    const [art, setArt] = React.useState<any>({});

    const handleClose = () => {
        setShow(false);
    };

    function handleShitchUrl(url: any, title: any) {
        art.switchUrl(url, title);
    }

    const settings = {
        autoSize: true,
        fullscreen: true,
        setting: true,
        loop: true,
        flip: true,
        playbackRate: true,
        aspectRatio: true,
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
        controls: [
            {
                tooltip: 'Playlist',
                position: 'right',
                html: '<i class="ri-play-list-2-fill"></i>',
                click: function () {
                    setShow((state: any) => !state);
                },
            },
        ],
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
    // prettier-ignore
    return (
        <Box sx={{ width: '100%', marginLeft: 'auto', marginRight: 'auto', marginTop: '20px' }}>
            <>
                <DPlayerBase
                    style={{
                        aspectRatio: 16 / 9,
                    }}
                    src={videoData.src}
                    settings={settings}
                    getInstance={(art: any) => {
                        art.on('ready', () => setArt(art));
                    }}
                />
                {Object.keys(art).length !== 0
                    ? createPortal(
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
                    )
                    : null}
                {Object.keys(art).length !== 0
                    ? createPortal(
                        <DPlaylist
                            show={show}
                            handleClose={handleClose}
                            handleShitchUrl={handleShitchUrl}
                        />,
                        art.layers.playlist,
                    )
                    : null}
                {Object.keys(art).length !== 0
                    ? createPortal(
                        <Box sx={{ padding: '20px !important' }}>
                            <Typography variant='h5'>{videoData.title}</Typography>
                            <Typography variant='subtitle1'>{videoData.subTitle}</Typography>
                        </Box>,
                        art.layers.title,
                    )
                    : null}
            </>
        </Box>
    );
};

export default DPlayer;
