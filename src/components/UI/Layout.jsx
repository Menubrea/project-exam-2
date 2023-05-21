import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { Box } from '@mui/joy';
import { Navigation } from './Nav';

export default function Layout({ venues }) {
  return (
    <>
      <Header venues={venues} />
      <Outlet />
      <Box
        sx={{
          boxShadow: '0 0 10px 5px rgba(0, 0, 0, .2)',
          borderTop: (theme) =>
            theme.palette.mode === 'dark'
              ? `4px solid ${theme.palette.primary[700]}`
              : `4px solid ${theme.palette.neutral[200]}`,
          display: { xs: 'block', sm: 'none', position: 'fixed' },
          backgroundColor: (theme) =>
            theme.palette.mode === 'dark'
              ? theme.palette.primary[500]
              : theme.palette.neutral[100],
          width: '100%',
          bottom: 0,
        }}>
        <Navigation />
      </Box>
      <Footer />
    </>
  );
}
