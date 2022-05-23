import React, { createContext, useMemo, useEffect, useState } from 'react';
import { CacheProvider } from '@emotion/react';
import createEmotionCache from '../main/utilities/createEmotionCache';
import type { AppProps } from 'next/app';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import lightTheme from '../main/theme/lightTheme';
import darkTheme from '../main/theme/darkTheme';
import { CssBaseline, PaletteMode } from '@mui/material';
import '../styles/globals.css';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import Error from 'next/error';

/**
 * Home Page of the Application
 * @return {JSX.Element}
 */

// eslint-disable-next-line
const ColorModeContext = createContext({ toggleColorMode: () => {} });

const clientSideEmotionCache = createEmotionCache();

const MyApp = ({ Component, pageProps }: AppProps) => {
    useEffect(() => {
        document.title = 'DesterLib';
    }, []);

    const emotionCache = clientSideEmotionCache;
    const [mode, setMode] = useState<PaletteMode>('dark');
    const colorMode = useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode: string) => (prevMode === 'light' ? 'dark' : 'light'));
            },
        }),
        [],
    );

    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode,
                    ...(mode === 'light' ? lightTheme.palette : darkTheme.palette),
                },
                typography: {
                    fontFamily: `${
                        mode === 'light'
                            ? lightTheme.typography.fontFamily
                            : darkTheme.typography.fontFamily
                    }`,
                    button: {
                        textTransform: 'none',
                    },
                },
                shape: {
                    borderRadius:
                        mode === 'light'
                            ? lightTheme.shape.borderRadius
                            : darkTheme.shape.borderRadius,
                },
                components: {
                    MuiMenu: {
                        styleOverrides: {
                            root: {
                                padding: '20px',
                            },
                            paper: {
                                margin: '0px',
                                padding: '8px',
                                background: `${
                                    mode === 'light'
                                        ? lightTheme.palette.background.paper
                                        : darkTheme.palette.background.paper
                                } !important`,
                            },
                            list: {
                                padding: 0,
                            },
                        },
                    },
                    MuiMenuItem: {
                        styleOverrides: {
                            root: {
                                borderRadius: '5px',
                                transition: '0.2s ease',
                            },
                        },
                    },
                },
            }),
        [mode],
    );

    if (pageProps.error) {
        return <Error statusCode={pageProps.error.statusCode} title={pageProps.error.message} />;
    }

    return (
        <CacheProvider value={emotionCache}>
            <ColorModeContext.Provider value={colorMode}>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <Component
                        colorMode={colorMode}
                        colorModeContext={ColorModeContext}
                        themeMode={mode}
                        {...pageProps}
                    />
                </ThemeProvider>
            </ColorModeContext.Provider>
        </CacheProvider>
    );
};

export default MyApp;
