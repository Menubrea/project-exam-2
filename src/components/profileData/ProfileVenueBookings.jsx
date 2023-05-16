import {
  Box,
  styled,
  Tabs,
  Tab,
  TabPanel,
  TabList,
  Typography,
} from '@mui/joy';
import { EditVenue } from '../forms';
import { MainThemeButton } from '../../styles/GlobalStyles';
import CloseIcon from '@mui/icons-material/Close';

const BookingsContainer = styled(Box)(({ theme }) => ({
  height: '100vh',
  overflowY: 'scroll',
  position: 'fixed',
  backgroundColor: 'white',
  top: 0,
  left: 0,
  zIndex: 1000,
  transform: 'translateX(-100%)',
  padding: theme.spacing(2),

  backgroundColor:
    theme.palette.mode === 'dark'
      ? theme.palette.primary[500]
      : theme.palette.neutral[50],
}));

const Overlay = styled(Box)(({ theme }) => ({
  position: 'fixed',
  width: '100vw',
  height: '100vh',
  top: 0,
  left: 0,
  zIndex: 999,
  backgroundColor: 'rgba(0,0,0,0.5)',
  backdropFilter: 'blur(10px)',
  transform: 'translateX(-100%)',
}));

export default function ProfileVenueBookings({ profile, venue }) {
  const handleCloseSlideOut = () => {
    const bookingsContainer = document.getElementById('bookingsContainer');
    const overlay = document.getElementById('overlay');
    overlay.style.transform = 'translateX(-100%)';
    bookingsContainer.style.transform = 'translateX(-100%)';
    bookingsContainer.style.transition = 'transform 0.5s ease-in-out';
  };

  if (venue) {
    return (
      <>
        <BookingsContainer
          sx={{ width: { xs: '100vw', md: '50vw' } }}
          id='bookingsContainer'>
          <Box
            sx={{
              marginBottom: 1,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: 0.5,
              borderRadius: 3,
              border: (theme) =>
                theme.palette.mode === 'dark'
                  ? `1px solid ${theme.palette.common.white}`
                  : `1px solid ${theme.palette.primary[900]}`,
            }}>
            <Typography level='h6' component={'p'} sx={{ paddingX: 1 }}>
              Managing {venue.name}
            </Typography>
            <MainThemeButton
              variant='plain'
              size='sm'
              onClick={handleCloseSlideOut}>
              <CloseIcon />
            </MainThemeButton>
          </Box>

          <Tabs>
            <TabList
              sx={{
                backgroundColor: (theme) =>
                  theme.palette.mode === 'dark'
                    ? ` ${theme.palette.primary[700]}`
                    : ` ${theme.palette.neutral[200]}`,
              }}>
              <Tab>Edit</Tab>
              <Tab>Bookings</Tab>
            </TabList>
            <TabPanel>
              <EditVenue venue={venue} />
            </TabPanel>
          </Tabs>
        </BookingsContainer>
        <Overlay id='overlay' onClick={handleCloseSlideOut} />
      </>
    );
  }
}
