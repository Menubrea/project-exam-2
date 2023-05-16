import { Box, styled } from '@mui/joy';
import iconLogo from '../assets/logo-icon.svg';

const LoadingContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  width: '100vw',
  backgroundColor:
    theme.palette.mode === 'dark'
      ? theme.palette.primary[500]
      : theme.palette.neutral[50],
  animation: 'fadeOut 2s ease-in-out',
  '@keyframes fadeOut': {
    '0%': {
      opacity: 1,
    },
    '100%': {
      opacity: 0,
    },
  },
}));

const LoadingAnimation = styled(Box)(() => ({
  width: 'clamp(50px, 20vw, 100px)',
  height: 'clamp(50px, 20vw, 100px)',
  animation: 'spin 2s linear infinite',
  '@keyframes spin': {
    '100%': {
      transform: 'rotate(360deg)',
    },
  },
}));

export default function Loading() {
  return (
    <LoadingContainer>
      <LoadingAnimation component={'img'} src={iconLogo} alt={'Loading...'} />
    </LoadingContainer>
  );
}
