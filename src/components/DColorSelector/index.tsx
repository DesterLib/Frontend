import { Box, IconButton, TextField } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import React from 'react';
import { HexColorPicker } from 'react-colorful';

const ColorSelector = ({ defaultColor, title }: any) => {
    const [color, setColor] = React.useState<any>(defaultColor);

    const wrapperRef = React.useRef<any>(null);
    const [isVisible, setIsVisible] = React.useState<any>(false);

    React.useEffect(() => {
        document.addEventListener('click', handleClickOutside, false);
        return () => {
            document.removeEventListener('click', handleClickOutside, false);
        };
    }, [color]);

    const handleClickOutside = (event: any) => {
        if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
            setIsVisible(false);
        }
    };

    const handleOpen = () => setIsVisible(true);

    return (
        <TextField
            fullWidth
            sx={{ margin: '20px auto' }}
            id='outlined-basic'
            label={title}
            value={color}
            InputProps={{
                startAdornment: (
                    <Box
                        sx={{
                            backgroundColor: '#ffffff',
                            borderRadius: '10px',
                            marginRight: '10px',
                            padding: '5px',
                        }}
                    >
                        <Box
                            sx={{
                                height: '30px',
                                width: '30px',
                                backgroundColor: color,
                                borderRadius: '8px',
                            }}
                        />
                    </Box>
                ),
                endAdornment: (
                    <InputAdornment position='end'>
                        <IconButton
                            aria-label='toggle color palette selector'
                            onClick={handleOpen}
                            ref={wrapperRef}
                            edge='end'
                            sx={{ position: 'relative', marginRight: '0' }}
                        >
                            {isVisible ? (
                                <i className='ri-palette-line'></i>
                            ) : (
                                <i className='ri-palette-fill'></i>
                            )}
                            {isVisible && (
                                <div
                                    style={{
                                        position: 'absolute',
                                        zIndex: '1000',
                                        left: '60px',
                                    }}
                                >
                                    <HexColorPicker color={color} onChange={setColor} />
                                </div>
                            )}
                        </IconButton>
                    </InputAdornment>
                ),
            }}
        ></TextField>
    );
};

export default ColorSelector;
