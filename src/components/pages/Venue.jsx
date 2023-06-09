import { Container, Typography, styled, Box } from '@mui/joy';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { BookingForm } from '../forms';
import { AltMeta, LocationMeta } from '../venueData';
import { ImageModal } from '../modals';
import { MainGrid, MainThemeButton } from '../../styles/GlobalStyles';
import { AuthContainer } from '../UI/UI_components';
import { altImage } from '../../constants/variables';
import AppMeta from '../AppMeta';
import { BreadCrumbsNav } from '../UI';
import { VenueCard } from '../cards';
import { Redirect } from '../';

const StyledMainGrid = styled(Container)(() => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(12, 1fr)',
}));

const VenueDetails = styled(Box)(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? theme.palette.primary[700]
      : theme.palette.neutral[200],
  padding: theme.spacing(4),
}));

export default function Venue({ venue, loading, error }) {
  const { id } = useParams();
  const [venueById, setVenueById] = useState();
  const [similarVenues, setSimilarVenues] = useState([]);
  const [open, setOpen] = useState(false);
  const [profile, setProfile] = useState({ name: '' });

  if (!venue) return null;

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  useEffect(() => {
    const selectedVenue = venue.find(
      (filteredVenue) => filteredVenue.id === id
    );
    setVenueById(selectedVenue);
  }, [venue, id]);

  useEffect(() => {
    if (venueById) {
      const similar = venue.filter((filteredVenue) => {
        if (
          filteredVenue.location.city.includes(venueById.location.city) &&
          filteredVenue.id !== venueById.id
        ) {
          return true;
        }
      });
      setSimilarVenues(similar);
    }
  }, [venue, venueById]);

  useEffect(() => {
    const storedProfile = localStorage.getItem('profile');
    if (storedProfile) {
      setProfile(JSON.parse(storedProfile));
    }
  }, [localStorage]);

  useEffect(() => {
    const handleStorageChange = () => {
      const newProfile = localStorage.getItem('profile');
      setProfile(JSON.parse(newProfile));
      if (!newProfile) {
        setProfile({ name: '' });
      }
    };
    window.addEventListener('storage', handleStorageChange);
    document.addEventListener('logout', handleStorageChange);
    document.addEventListener('login', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      document.removeEventListener('logout', handleStorageChange);
      document.removeEventListener('login', handleStorageChange);
    };
  }, [localStorage]);

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error: {error.message}</Typography>;

  if (venueById) {
    return (
      <Box sx={{ paddingTop: '75px' }} component={'main'}>
        <AppMeta
          title={`Holidaze | ${venueById.name} venue`}
          description='Take a closer look at this venue, and book it for your next holiday or business trip.'
          tags='rent, venue, online, place to rent, holidaze.com, vacation, bookings, venues'
        />

        <BreadCrumbsNav venue={venueById} />

        <StyledMainGrid
          maxWidth='lg'
          sx={{
            paddingX: { xs: 0, md: 2, lg: 0 },
            gap: { xs: 0, sm: 0, md: 2 },
          }}>
          <Box sx={{ gridColumn: { xs: '-1 / -1', md: ' 1 / 8' } }}>
            <Box
              sx={{
                position: 'relative',
                height: 'fit-content',
              }}>
              <Box
                component={'img'}
                src={
                  venueById && venueById.media[0]
                    ? venueById.media[0]
                    : altImage
                }
                alt={venueById && venueById.name}
                onError={(e) => (e.target.src = { altImage })}
                sx={{
                  width: '100%',
                  height: '100%',
                  maxHeight: 'max(550px, 50vh)',

                  objectFit: 'cover',
                  borderRadius: { xs: 0, sm: 0, md: '.5rem' },
                }}
                onClick={handleOpen}
              />

              {venueById && venueById.media.length > 1 && (
                <MainThemeButton
                  size='sm'
                  onClick={handleOpen}
                  sx={{
                    position: 'absolute',
                    top: 20,
                    right: 20,
                    display: 'block',
                  }}>
                  {venueById.media.length} more images
                </MainThemeButton>
              )}
              <ImageModal
                venue={venueById}
                open={open}
                handleClose={handleClose}
              />
            </Box>
          </Box>

          <VenueDetails
            sx={{
              borderRadius: { xs: 0, sm: 0, md: '.5rem' },
              gridColumn: { xs: '-1 / -1', md: '8 / 13' },
            }}>
            <Typography
              level='h6'
              component={'p'}
              sx={{
                fontWeight: 900,
                textTransform: 'uppercase',
                lineHeight: 1,
              }}>
              Introducing
            </Typography>
            <Typography
              level='h2'
              component={'h1'}
              sx={{
                fontFamily: 'amatic-sc, sans-serif',
                fontWeight: 700,
                textTransform: 'uppercase',
              }}>
              {venueById && venueById.name}
            </Typography>

            {venueById && <LocationMeta location={venueById.location} />}

            <Box sx={{ width: 'fit-content', margin: '8px auto' }}>
              <AltMeta venue={venueById} />
            </Box>

            <Typography>{venueById && venueById.description}</Typography>

            {venueById &&
              profile &&
              venueById.owner?.name !== profile.name &&
              profile.name !== '' && <BookingForm venue={venueById} />}

            {venueById && profile.name === '' && <AuthContainer />}
          </VenueDetails>
        </StyledMainGrid>

        {similarVenues.length > 0 && (
          <Box
            maxWidth={1200}
            sx={{
              paddingTop: 4,
              margin: '2em auto',
              padding: { xs: '0 1em', lg: 0 },
            }}
            component={'section'}>
            <Typography level='h4' component={'h2'}>
              Other venues in the area:
            </Typography>
            <MainGrid>
              {similarVenues &&
                similarVenues.map((venue) => (
                  <VenueCard key={venue.id} venue={venue} />
                ))}
            </MainGrid>
          </Box>
        )}
        <Redirect link={'/browse'} text={'Proceed to browse'} />
      </Box>
    );
  }
}
