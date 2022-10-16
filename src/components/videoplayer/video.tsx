import React from 'react';
import ReactPlayer from 'react-player';
import { handleDuration, handleEnded, handleProgress } from './events';

const Video = ({ state, setState, videoRef }: any) => {
    return (
        <ReactPlayer
            ref={videoRef}
            width='100%'
            height='100%'
            playing={state.playing}
            volume={state.volume}
            onProgress={() => handleProgress({ state, setState })}
            onDuration={(duration) => handleDuration({ state, setState, duration })}
            onEnded={() => handleEnded({ state, setState })}
            url={state.url}
            style={{ display: 'block' }}
        />
    );
};

export default Video;
