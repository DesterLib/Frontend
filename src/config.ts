import LogoFullDark from './assets/logo-full-dark.svg';
import LogoFullLight from './assets/logo-full-light.svg';
import noImagePoster from './assets/no-image-poster.svg';

const APP_LOGO_LIGHT = LogoFullLight;
const APP_LOGO_DARK = LogoFullDark;
const APP_NAME = 'Dester';
const APP_DESCRIPTION = '';
const APP_VERSION = '';
const APP_API_PATH = process.env.REACT_APP_SERVER_URL || 'http://localhost:35500';
const APP_API_VERSION_PATH = '/api/v1';
const APP_NO_IMAGE_POSTER = noImagePoster;
const APP_POSTER_QUALITY = 'w500';
const APP_BACKDROP_QUALITY = 'w1280';

export {
    APP_LOGO_LIGHT,
    APP_LOGO_DARK,
    APP_NAME,
    APP_DESCRIPTION,
    APP_VERSION,
    APP_API_PATH,
    APP_API_VERSION_PATH,
    APP_NO_IMAGE_POSTER,
    APP_POSTER_QUALITY,
    APP_BACKDROP_QUALITY,
};
