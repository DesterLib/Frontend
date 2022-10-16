import usePrevious from 'hooks/usePrevious';
import { findDOMNode } from 'react-dom';
import screenfull from 'screenfull';

const handlePlayPauseToggle = ({ state, setState }: any) => {
    setState({ ...state, playing: !state.playing });
};

const handleVolumeToggle = ({ state, setState }: any) => {
    const prevVolume = usePrevious(state.volume);
    setState({ ...state, muted: !state.muted, volume: state.muted ? prevVolume : 0 });
};

const handleVolumeChange = ({ state, setState, newValue }: any) => {
    setState({ ...state, volume: newValue / 100, muted: newValue === 0 });
};

const handleSeekChange = ({ state, setState, videoRef, newValue }: any) => {
    setState({ ...state, played: newValue });
    videoRef.current.seekTo(newValue);
};

const handleSeekMouseDown = ({ state, setState }: any) => {
    setState({ ...state, seeking: true });
};

const handleSeekMouseUp = ({ state, setState }: any) => {
    setState({ ...state, seeking: false });
};

const handleDuration = ({ state, setState, duration }: any) => {
    setState({ ...state, duration: duration });
};

const handleProgress = ({ state, setState }: any) => {
    if (!state.seeking) {
        setState({ ...state, played: state.playedSeconds });
    }
};

const handleFullscreenToggle = ({ containerRef }: any) => {
    screenfull.toggle(containerRef.current);
};

const handleEnded = ({ state, setState }: any) => {
    setState({ ...state, playing: state.loop });
};

export {
    handlePlayPauseToggle,
    handleVolumeToggle,
    handleVolumeChange,
    handleSeekChange,
    handleSeekMouseDown,
    handleSeekMouseUp,
    handleDuration,
    handleProgress,
    handleFullscreenToggle,
    handleEnded,
};
