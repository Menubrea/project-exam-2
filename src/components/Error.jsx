import { Box, styled, Button, Typography, Link } from '@mui/joy';
import { useEffect } from 'react';
import darkLogo from '../assets/logo-dark.svg';
import lightLogo from '../assets/logo-light.svg';
import { useLocation } from 'react-router-dom';

const ErrorContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: 'calc(100vh - 16px)',
  width: 'calc(100vw - 16px)',
  overflow: 'hidden',
  zIndex: 1000,
}));

export default function ErrorComponent() {
  const location = useLocation();
  let logo;

  if (location.pathname === '/profile') {
    logo = lightLogo;
  } else {
    logo = darkLogo;
  }

  const handleRefresh = () => {
    window.location.reload();
  };

  useEffect(() => {
    document.body.style.overflowY = 'hidden';

    return () => {
      document.body.style.overflowY = 'auto';
    };
  }, []);

  return (
    <ErrorContainer>
      <Box sx={{ paddingX: 4 }}>
        <Box
          component={'img'}
          src={logo}
          alt='Holidaze Logo'
          sx={{ width: '200px', height: 'auto' }}
        />
        <Typography marginTop={1}>
          Uh, oh! An unknown error occured trying to load the application. You
          can try clicking the button below, to refresh the application.
        </Typography>

        <Typography marginTop={1} level='h6' component={'p'}>
          If the problem persists, please contact the customer support team.
        </Typography>
        <Box sx={{ width: 'fit-content', margin: '0 0 0 auto' }}>
          <Typography sx={{ textDecoration: 'underline' }}>Contact</Typography>
        </Box>

        <Box sx={{ width: 'fit-content', margin: '0 auto', marginTop: 2 }}>
          <Button
            sx={{
              backgroundColor: 'rgba(0, 0, 0, .8)',
              ':hover': {
                backgroundColor: 'rgba(0, 0, 0, .6)',
              },
            }}
            onClick={handleRefresh}
            variant='solid'>
            Refresh Holidaze
          </Button>
        </Box>
      </Box>
    </ErrorContainer>
  );
}
