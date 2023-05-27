import {
  Box,
  styled,
  LinearProgress,
  Typography,
  CircularProgress,
} from '@mui/joy';
import { useState, useEffect } from 'react';
import lightLogo from '../assets/logo-light.svg';
import darkLogo from '../assets/logo-dark.svg';
import { useTheme } from '@mui/joy';
import { keyframes } from '@emotion/react';

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const LoadingContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  width: '100vw',
  backgroundColor:
    theme.palette.mode === 'dark'
      ? theme.palette.primary[500]
      : theme.palette.neutral[100],
  overflow: 'hidden',
  zIndex: 999,
  animation: `${fadeOut} 1.5s ease-in-out`,
}));

export default function Loading() {
  const [progress, setProgress] = useState(0);
  const theme = useTheme();
  const logo = theme.palette.mode === 'dark' ? lightLogo : darkLogo;

  useEffect(() => {
    document.body.style.overflowY = 'hidden';
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 0 : prevProgress + 10
      );
    }, 200);

    return () => {
      clearInterval(timer);
      document.body.style.overflowY = 'auto';
    };
  }, []);

  return (
    <LoadingContainer>
      <Box
        component={'img'}
        src={logo}
        alt='Holidaze Logo'
        sx={{ width: '100px', height: '30px', marginBottom: 2 }}
      />
      <CircularProgress />
    </LoadingContainer>
  );
}
