import { create } from '@storybook/theming';
import Logo from './logo.svg';

const theme = create({
  base: 'dark',

  colorPrimary: '#14dca0',
  colorSecondary: '#14dca0',

  // UI
  appBg: '#07272b',
  appContentBg: '#00151C',
  appBorderRadius: 4,

  // Typography
  fontBase: '"Open Sans", sans-serif',
  fontCode: 'monospace',

  // Text colors
  // textColor: '#ffffff',
  // textInverseColor: 'rgba(255,255,255,0.9)',

  // Toolbar default and active colors
  barTextColor: '#ffffff',
  barSelectedColor: '#14dca0',
  barBg: '#07272b',

  // Form colors
  // inputBg: 'white',
  // inputBorder: 'silver',
  // inputTextColor: 'black',
  // inputBorderRadius: 4,

  brandTitle: 'Dester Design Sysyem',
  brandUrl: 'https://design.dester.gq',
  brandImage: Logo,
  brandTarget: '_self',
});

export default theme;
