import { Box } from '@mui/material';
import React from 'react';
import Controls from './controls';
import Video from './video';

const VideoPlayer = ({ url }: any) => {
    const containerRef = React.useRef<any>(null);
    const videoRef = React.useRef<any>(null);
    const [state, setState] = React.useState({
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
        url: url || '',
    });
    return (
        <Box ref={containerRef}>
            <Video state={state} setState={setState} videoRef={videoRef} />
            <Controls
                state={state}
                setState={setState}
                containerRef={containerRef}
                videoRef={videoRef}
            />
        </Box>
    );
};

export default VideoPlayer;
