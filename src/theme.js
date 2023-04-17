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
        text: {
          primary: 'var(--joy-palette-primary-500)',
        },
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
