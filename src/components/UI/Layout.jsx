import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { Box, styled } from '@mui/joy';
import { Navigation } from './Nav';
import Loading from '../Loading';
import { useLocation } from 'react-router-dom';

export default function Layout({ venues, loading }) {
  const path = useLocation();

  return (
    <>
      <Header venues={venues} />
      <Outlet />
      {loading && path.pathname !== '/profile' && <Loading />}
      <StyledBox
        sx={{ display: { xs: 'block', sm: 'none', position: 'fixed' } }}>
        <Navigation />
      </StyledBox>
      {<Footer />}
    </>
  );
}

const StyledBox = styled(Box)(({ theme }) => ({
  boxShadow: '0 0 10px 5px rgba(0, 0, 0, .2)',
  borderTop:
    theme.palette.mode === 'dark'
      ? `4px solid ${theme.palette.primary[700]}`
      : `4px solid ${theme.palette.neutral[200]}`,

  backgroundColor:
    theme.palette.mode === 'dark'
      ? theme.palette.primary[500]
      : theme.palette.neutral[100],
  width: '100%',
  bottom: 0,
  zIndex: 100,
}));
