import disconnectedImage from './assets/disconnected.png';
import errorImage from './assets/error.png';
import LogoFullDark from './assets/logo-full-dark.svg';
import LogoFullLight from './assets/logo-full-light.svg';
import noImagePoster from './assets/no-image-poster.svg';
import getOs from './utilities/getOs';
import isElectron from './utilities/isElectron';

const APP_IS_ELECTRON = isElectron();
const APP_IS_SEPERATE = process.env.REACT_APP_SEPERATE === 'true';
const APP_LOGO_LIGHT = LogoFullLight;
const APP_LOGO_DARK = LogoFullDark;
const APP_NAME = localStorage.getItem('APP_NAME') || 'Dester';
const APP_DESCRIPTION =
    localStorage.getItem('APP_DESCRIPTION') ||
    'Dester is a powerful and lightweight media solution to interface your movie and TV libraries in a goddamn gorgeous way';
const APP_VERSION = '';
const APP_API_PATH =
    APP_IS_ELECTRON || APP_IS_SEPERATE
        ? localStorage.getItem('SERVER_URL')
        : process.env.REACT_APP_SERVER_URL || '';
const APP_API_VERSION_PATH = '/api/v1';
const APP_NO_IMAGE_POSTER = noImagePoster;
const APP_POSTER_QUALITY = 'w300';
const APP_AVATAR_QUALITY = 'w400';
const APP_LOGO_QUALITY = 'w500';
const APP_THUMBNAIL_QUALITY = 'w500';
const APP_BACKDROP_QUALITY = 'w1280';
const APP_ERROR_IMAGE = errorImage;
const APP_DISCONNECTED_IMAGE = disconnectedImage;
const APP_OS = getOs();

export {
    APP_IS_ELECTRON,
    APP_IS_SEPERATE,
    APP_LOGO_LIGHT,
    APP_LOGO_DARK,
    APP_NAME,
    APP_DESCRIPTION,
    APP_VERSION,
    APP_API_PATH,
    APP_API_VERSION_PATH,
    APP_NO_IMAGE_POSTER,
    APP_POSTER_QUALITY,
    APP_AVATAR_QUALITY,
    APP_LOGO_QUALITY,
    APP_THUMBNAIL_QUALITY,
    APP_BACKDROP_QUALITY,
    APP_ERROR_IMAGE,
    APP_DISCONNECTED_IMAGE,
    APP_OS,
};
