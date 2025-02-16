import type { CommonColors } from '@mui/material/styles/createPalette';

import type { PaletteColorNoChannels } from './core/palette';
import type { ThemeDirection, ThemeColorScheme, ThemeCssVariables } from './types';

// ----------------------------------------------------------------------

type ThemeConfig = {
  classesPrefix: string;
  modeStorageKey: string;
  direction: ThemeDirection;
  defaultMode: ThemeColorScheme;
  cssVariables: ThemeCssVariables;
  fontFamily: Record<'primary' | 'secondary', string>;
  palette: Record<
    'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error',
    PaletteColorNoChannels
  > & {
    common: Pick<CommonColors, 'black' | 'white'>;
    grey: Record<
      '50' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900',
      string
    >;
  };
};

export const themeConfig: ThemeConfig = {
  /** **************************************
   * Base
   *************************************** */
  direction: 'ltr',
  defaultMode: 'light',
  modeStorageKey: 'theme-mode',
  classesPrefix: 'minimal',
  /** **************************************
   * Typography
   *************************************** */
  fontFamily: {
    primary: 'Public Sans Variable',
    secondary: 'Barlow',
  },
  /** **************************************
   * Palette
   *************************************** */
  palette: {
    primary: {
      lighter: '#D0EEF5',
      light: '#6BAAC6',
      main: '#102E44',
      dark: '#081B30',
      darker: '#030D20',
      contrastText: '#D0EEF5',
    },
    secondary: {
      lighter: '#EFD6FF',
      light: '#C684FF',
      main: '#8E33FF',
      dark: '#5119B7',
      darker: '#27097A',
      contrastText: '#FFFFFF',
    },
    info: {
      lighter: '#C7F9EA',
      light: '#57DBCC',
      main: '#008289',
      dark: '#004D62',
      darker: '#002841',
      contrastText: '#C7F9EA',
    },
    success: {
      lighter: '#D0F8CE',
      light: '#6BD87D',
      main: '#147F3B',
      dark: '#0A5B37',
      darker: '#033C2F',
      contrastText: '#D0F8CE',
    },
    warning: {
      lighter: '#FCF6CA',
      light: '#EDD962',
      main: '#C4A105',
      dark: '#8D6E02',
      darker: '#5E4500',
      contrastText: '#FCF6CA',
    },
    error: {
      lighter: '#FAD2D1',
      light: '#E17387',
      main: '#9B1D4D',
      dark: '#6F0E46',
      darker: '#4A053B',
      contrastText: '#FAD2D1',
    },
    grey: {
      '50': '#FCFDFD',
      '100': '#F9FAFB',
      '200': '#F4F6F8',
      '300': '#DFE3E8',
      '400': '#C4CDD5',
      '500': '#919EAB',
      '600': '#637381',
      '700': '#454F5B',
      '800': '#1C252E',
      '900': '#141A21',
    },
    common: { black: '#000000', white: '#FFFFFF' },
  },
  /** **************************************
   * Css variables
   *************************************** */
  cssVariables: {
    cssVarPrefix: '',
    colorSchemeSelector: 'data-color-scheme',
  },
};
