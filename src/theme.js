import { extendTheme } from '@mui/joy/styles';

export const theme = extendTheme({
  typography: {
    body3: {
      fontSize: '0.8rem',
      fontWeight: 400,
      lineHeight: '1rem',
      letterSpacing: '0.03333em',
      color: 'var(--joy-palette-text-primary)',
    },
  },
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
          200: '#EEEEEE',
          300: '#E5E5E5',
          400: '#DCDCDC',
          500: '#D3D3D3',
          600: '#C9C9C9',
          700: '#C0C0C0',
          800: '#B7B7B7',
          900: '#D9D9D9',
        },
        text: {
          primary: 'var(--joy-palette-primary-800)',
          body3: 'var(--joy-palette-primary-800)',
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
          200: '#EEEEEE',
          300: '#E5E5E5',
          400: '#DCDCDC',
          500: '#D3D3D3',
          600: '#C9C9C9',
          700: '#C0C0C0',
          800: '#B7B7B7',
          900: '#D9D9D9',
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
