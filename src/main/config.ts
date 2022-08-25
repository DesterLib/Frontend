import LogoFullDark from 'main/assets/logo/logo-full-dark.svg';
import LogoFullLight from 'main/assets/logo/logo-full-light.svg';

const app = {
    logo: {
        dark: LogoFullDark,
        light: LogoFullLight,
    },
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
                    {
                        label: '',
                        icon: 'update',
                        link: '',
                    },
                ],
                bottom: [
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
