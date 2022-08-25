import { createTheme } from '@mui/material';

import baseTheme from './baseTheme';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#14DCA0',
            light: '#4AEAAA',
            dark: '#0EBD99',
        },
        secondary: {
            main: '#7154FF',
            light: '#967EFF',
            dark: '#553DDB',
        },
        background: {
            paper: 'hsl(190, 50%, 12%)',
            default: 'hsl(190, 50%, 8%)',
        },
    },
    ...baseTheme,
});

export default darkTheme;
