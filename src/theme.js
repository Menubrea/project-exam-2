import { extendTheme } from '@mui/joy/styles';

export const theme = extendTheme({
  fontFamily: {
    body: 'futura-PT, var(--joy-fontFamily-fallback)',
  },
  colorSchemes: {
    light: {
      palette: {
        primary: {
          50: '#83ACB1',
          100: '#779FA3',
          200: '#6F9498',
          300: '#638589',
          400: '#537074',
          500: '#445D60',
          600: '#304F53',
          700: '#36484B',
          800: '#263234',
          900: '#1E2729',
        },
        neutral: {
          50: '#FFFFFF',
          100: '#F7F7F7',
          200: '#E6E6E6',
          300: '#D4D4D4',
          400: '#C3C3C3',
          500: '#B1B1B1',
          600: '#A0A0A0',
          700: '#8E8E8E',
          800: '#7D7D7D',
          900: '#B1B1B1',
        },
        text: {
          primary: 'var(--joy-palette-primary-800)',
        },
        background: { body: 'var(--joy-palette-neutral-50)' },
      },
    },
    dark: {
      palette: {
        primary: {
          50: '#83ACB1',
          100: '#779FA3',
          200: '#6F9498',
          300: '#638589',
          400: '#537074',
          500: '#445D60',
          600: '#304F53',
          700: '#36484B',
          800: '#263234',
          900: '#1E2729',
        },
        neutral: {
          50: '#FFFFFF',
          100: '#F7F7F7',
          200: '#E6E6E6',
          300: '#D4D4D4',
          400: '#C3C3C3',
          500: '#B1B1B1',
          600: '#A0A0A0',
          700: '#8E8E8E',
          800: '#7D7D7D',
          900: '#B1B1B1',
        },
        background: {
          surface: 'var(--joy-palette-primary-500)',
          popup: 'var(--joy-palette-primary-700)',
          level1: 'var(--joy-palette-primary-600)',
          body: 'var(--joy-palette-primary-500)',
          tooltip: 'var(--joy-palette-primary-500)',
          level3: 'var(--joy-palette-primary-400)',
          level2: 'var(--joy-palette-primary-300)',
        },
        text: {
          primary: 'var(--joy-palette-common-white)',
          secondary: 'var(--joy-palette-primary-700)',
          tertiary: 'var(--joy-palette-neutral-200)',
        },
      },
    },
  },
});
