import { Box, styled, LinearProgress, Typography } from '@mui/joy';
import { useState, useEffect } from 'react';
import lightLogo from '../assets/logo-light.svg';
import darkLogo from '../assets/logo-dark.svg';
import { useTheme } from '@mui/joy';

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
    }, 100);

    return () => {
      clearInterval(timer);
      document.body.style.overflowY = 'auto';
    };
  }, []);

  return (
    <LoadingContainer>
      <Box sx={{ width: { xs: '200px', sm: '400px', md: '700px' } }}>
        <Box
          component={'img'}
          src={logo}
          sx={{ width: '100px', height: '30px' }}
        />
        <LinearProgress determinate value={progress} />
      </Box>
    </LoadingContainer>
  );
}
