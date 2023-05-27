import {
  Box,
  styled,
  Tabs,
  Tab,
  TabPanel,
  TabList,
  Typography,
} from '@mui/joy';
import { CreateVenue, DeleteBooking, EditVenue } from '../forms';
import { MainThemeButton } from '../../styles/GlobalStyles';
import CloseIcon from '@mui/icons-material/Close';
import RenderBookings from './RenderBookings';

const StyledTab = styled(Tab)(({ theme }) => ({
  color:
    theme.palette.mode === 'dark'
      ? theme.palette.neutral[50]
      : theme.palette.primary[800],

  ':hover': {
    backgroundColor:
      theme.palette.mode === 'dark'
        ? theme.palette.primary[800]
        : theme.palette.neutral[100],
    color:
      theme.palette.mode === 'dark'
        ? theme.palette.neutral[50]
        : theme.palette.primary[800],
  },
}));

const BookingsContainer = styled(Box)(({ theme }) => ({
  height: 'calc(100vh - 54px)',
  overflowY: 'scroll',
  position: 'fixed',
  left: 0,
  bottom: 0,
  zIndex: 10,
  transform: 'translateX(-100%)',
  padding: theme.spacing(2),

  background:
    theme.palette.mode === 'dark'
      ? `linear-gradient(-90deg, ${theme.palette.primary[500]} 0%, ${theme.palette.primary[700]} 100%)`
      : `linear-gradient(-90deg, ${theme.palette.neutral[50]} 0%, ${theme.palette.neutral[500]} 100%)`,

  '@media (max-width: 600px)': {
    paddingBottom: '65px',
  },
}));

const Overlay = styled(Box)(() => ({
  position: 'fixed',
  width: '100vw',
  height: '100vh',
  top: 0,
  left: 0,
  zIndex: 9,
  backgroundColor: 'rgba(0,0,0,0.1)',
  backdropFilter: 'blur(10px)',
  transform: 'translateX(-100%)',
  opacity: 0,
}));

/**
 * A modal to display the user's bookings, with tabs to display the user's selected Venue, or create a new Venue depending on state.
 * @param {Object} venue - The venue object to be passed to the CreateVenue form
 * @param {string} token - The user's token
 * @param {function} setCreateVenue - A function to set the state of the CreateVenue form
 * @param {boolean} createVenue - The state of the CreateVenue form
 * @param {function} setProfileVenues - A function to set the state of the user's venues
 * @param {function} setFilteredVenues - A function to set the state of the filtered venues
 * @param {Object[]} profileVenues - The user's venues
 * @returns {JSX.Element} - A modal to display the user's bookings
 */
export default function ProfileVenueBookings({
  venue,
  token,
  setCreateVenue,
  createVenue,
  setProfileVenues,
  setFilteredVenues,
  profileVenues,
}) {
  const handleCloseSlideOut = () => {
    const bookingsContainer = document.getElementById('bookingsContainer');
    const overlay = document.getElementById('overlay');
    overlay.style.transform = 'translateX(-100%)';
    bookingsContainer.style.transform = 'translateX(-100%)';
    bookingsContainer.style.transition = 'transform 0.3s ease-in-out';
    document.body.style.overflowY = 'auto';

    if (createVenue) {
      setTimeout(() => {
        setCreateVenue(false);
      }, 500);
    }

    return () => {
      bookingsContainer.style.transform = 'translateX(-100%)';
      overlay.style.transform = 'translateX(-1000%)';
      document.body.style.overflowY = 'auto';
    };
  };

  return (
    <>
      <BookingsContainer
        sx={{ width: { xs: '100vw', md: '50vw' } }}
        id='bookingsContainer'>
        {venue && createVenue === false && (
          <Box>
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
              <Typography level='h6' component={'h2'} sx={{ paddingX: 1 }}>
                Managing {venue.name}
              </Typography>
              <MainThemeButton
                aria-label='close slideout menu'
                variant='plain'
                size='sm'
                onClick={handleCloseSlideOut}>
                <CloseIcon />
              </MainThemeButton>
            </Box>

            <Tabs sx={{ backgroundColor: 'transparent' }}>
              <TabList
                sx={{
                  backgroundColor: (theme) =>
                    theme.palette.mode === 'dark'
                      ? ` ${theme.palette.primary[700]}`
                      : ` ${theme.palette.neutral[200]}`,
                }}>
                <StyledTab>Bookings</StyledTab>
                <StyledTab>Edit</StyledTab>
              </TabList>
              <TabPanel value={0}>
                <RenderBookings profileVenues={venue} />
              </TabPanel>
              <TabPanel value={1}>
                <EditVenue
                  venue={venue}
                  profileVenues={profileVenues}
                  setProfileVenues={setProfileVenues}
                  handleCloseSlideOut={handleCloseSlideOut}
                  setFilteredVenues={setFilteredVenues}
                />
                <DeleteBooking
                  venue={venue}
                  token={token}
                  setFilteredVenues={setFilteredVenues}
                  setProfileVenues={setProfileVenues}
                  handleCloseSlideOut={handleCloseSlideOut}
                />
              </TabPanel>
            </Tabs>
          </Box>
        )}
        {createVenue && (
          <Box>
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
              <Typography level='h6' component={'h2'} sx={{ paddingX: 1 }}>
                Create Venue
              </Typography>
              <MainThemeButton
                aria-label='close slideout menu'
                variant='plain'
                size='sm'
                onClick={handleCloseSlideOut}>
                <CloseIcon />
              </MainThemeButton>
            </Box>
            <CreateVenue
              token={token}
              handleCloseSlideOut={handleCloseSlideOut}
              setProfileVenues={setProfileVenues}
              setFilteredVenues={setFilteredVenues}
            />
          </Box>
        )}
      </BookingsContainer>
      <Overlay id='overlay' onClick={handleCloseSlideOut} />
    </>
  );
}
