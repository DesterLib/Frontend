import { Box, IconButton, Slider } from '@mui/material';
import Icon from 'components/icon';
import React from 'react';
import {
    handleFullscreenToggle,
    handlePlayPauseToggle,
    handleSeekChange,
    handleSeekMouseDown,
    handleSeekMouseUp,
    handleVolumeChange,
    handleVolumeToggle,
} from './events';

const Controls = ({ state, setState, videoRef, containerRef }: any) => {
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                position: 'absolute',
                bottom: '0',
                left: '0',
                right: '0',
                justifyContent: 'center',
                width: 'calc(100% - 10px)',
                maxWidth: '600px',
                padding: '5px',
                margin: 'auto',
                marginBottom: '5px',
                backdropFilter: 'blur(10px)',
                backgroundColor: '#00000089',
                borderRadius: '10px',
            }}
        >
            <IconButton
                sx={{ height: '40px', width: '40px' }}
                onClick={() => handlePlayPauseToggle({ state, setState })}
                aria-label='play-pause'
            >
                {state.playing ? (
                    <Icon name='pause' fontSize='small' />
                ) : (
                    <Icon name='play_arrow' />
                )}
            </IconButton>
            <Slider
                aria-label='progress-bar'
                size='small'
                value={state.played}
                min={0}
                max={state.duration}
                onChange={(event, newValue) =>
                    handleSeekChange({ state, setState, videoRef, newValue })
                }
                onMouseDown={() => handleSeekMouseDown({ state, setState })}
                onChangeCommitted={() => handleSeekMouseUp({ state, setState })}
                sx={{
                    marginLeft: '20px',
                    marginRight: '20px',
                    height: 4,
                    color: '#ffffff',
                    '& .MuiSlider-thumb': {
                        width: 10,
                        height: 10,
                        '&:before': {
                            boxShadow: '0 2px 12px 0 rgba(0,0,0,0.4)',
                        },
                        '&:hover, &.Mui-focusVisible': {
                            boxShadow: `0px 0px 0px 8px rgb(255 255 255 / 16%)`,
                        },
                        '&.Mui-active': {
                            width: 13,
                            height: 13,
                        },
                    },
                    '& .MuiSlider-rail': {
                        opacity: 0.28,
                    },
                }}
            />
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <IconButton onClick={() => handleVolumeToggle({ state, setState })}>
                    {state.muted || state.volume === 0 ? (
                        <Icon name='volume_off' />
                    ) : (
                        <Icon name='volume_up' />
                    )}
                </IconButton>
                <Slider
                    aria-label='volume'
                    size='small'
                    min={0}
                    max={100}
                    value={state.volume * 100}
                    onChange={(event, newValue) =>
                        handleVolumeChange({ state, setState, newValue })
                    }
                    sx={{
                        maxWidth: '100px',
                        minWidth: '100px',
                        marginLeft: '20px',
                        marginRight: '20px',
                        color: '#ffffff',
                        height: 4,
                        '& .MuiSlider-thumb': {
                            width: 10,
                            height: 10,
                            '&:before': {
                                boxShadow: '0 2px 12px 0 rgba(0,0,0,0.4)',
                            },
                            '&:hover, &.Mui-focusVisible': {
                                boxShadow: `0px 0px 0px 8px rgb(255 255 255 / 16%)`,
                            },
                            '&.Mui-active': {
                                width: 13,
                                height: 13,
                            },
                        },
                        '& .MuiSlider-rail': {
                            opacity: 0.28,
                        },
                    }}
                />
            </Box>
            <IconButton>
                <Icon name='more_vert' />
            </IconButton>
            <IconButton onClick={() => handleFullscreenToggle({ containerRef })}>
                <Icon name='fullscreen' />
            </IconButton>
        </Box>
    );
};

export default Controls;
