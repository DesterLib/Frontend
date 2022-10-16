import LogoFullDark from 'app/assets/logo/logo-full-dark.svg';
import LogoFullLight from 'app/assets/logo/logo-full-light.svg';
import HomePage from 'pages/HomePage';
import MoviePage from 'pages/MoviePage';
import PlaygroundPage from 'pages/Playground';
import { asyncToggleTheme } from './redux/functions/themeSlice';
import store from './redux/store';

const app = {
    logo: {
        dark: LogoFullDark,
        light: LogoFullLight,
    },
    routes: [
        { name: 'Home', path: '/', element: HomePage },
        { name: 'Movie', path: '/movie/:id', element: MoviePage },
        { name: 'Playground', path: '/playground', element: PlaygroundPage },
    ],
    navbar: {
        main: {
            items: [
                {
                    label: 'Browse',
                    icon: '',
                    link: '',
                },
                {
                    label: 'Collection',
                    icon: '',
                    link: '',
                    menu: [
                        {
                            label: 'Popular Collection',
                            icon: 'home',
                            link: '',
                        },
                        {
                            label: 'Movies Collection',
                            icon: '',
                            link: '',
                        },
                    ],
                },
            ],
        },
        side: {
            items: {
                top: [
                    {
                        label: 'Home',
                        icon: 'home',
                        link: '',
                    },
                    {
                        label: 'Browse',
                        icon: 'search',
                        link: '',
                    },
                    {
                        label: 'Categories',
                        icon: 'category',
                        link: '',
                    },
                    {
                        label: 'Favorites',
                        icon: 'favorite',
                        link: '',
                    },
                    {
                        label: 'Playlists',
                        icon: 'playlist_play',
                        link: '',
                    },
                    {
                        label: 'Updates',
                        icon: 'update',
                        link: '',
                    },
                ],
                bottom: [
                    {
                        type: 'toggle',
                        icon: 'settings',
                        label: '',
                        link: '',
                        onClick: () => store.dispatch(asyncToggleTheme()),
                    },
                    {
                        type: 'auth',
                        authStatus: true,
                        data: {
                            image: '',
                            name: '',
                            email: '',
                        },
                    },
                ],
            },
        },
    },
};

export default app;
