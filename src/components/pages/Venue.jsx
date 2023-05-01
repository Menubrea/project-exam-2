import { Container, Typography, styled, Box } from '@mui/joy';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { BookingForm } from '../forms';
import { LocationMeta } from '../venueData';
import { ImageModal } from '../modals';
import { MainThemeButton } from '../../styles/GlobalStyles';
import { AuthContainer } from '../UI/UI_components';

const StyledMainGrid = styled(Container)(() => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(12, 1fr)',
}));

const VenueDetails = styled(Box)(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? theme.palette.primary[700]
      : theme.palette.neutral[100],
  padding: theme.spacing(4),
}));

export default function Venue({ venue, loading, error }) {
  const { id } = useParams(); // Get ID from URL
  const [venueById, setVenueById] = useState(null); // Venue by ID
  const [open, setOpen] = useState(false); // Modal State
  const [profile, setProfile] = useState({ name: '' }); // Profile State
  const handleClose = () => setOpen(false); // Close modal.

  if (!venue) return null; // If no venue, return null.

  useEffect(() => {
    venue.filter((filteredVenue) =>
      filteredVenue.id === id ? setVenueById(filteredVenue) : null
    );
  }, [venue, id]);

  useEffect(() => {
    const storedProfile = localStorage.getItem('profile');
    if (storedProfile) {
      setProfile(JSON.parse(storedProfile));
    }
  }, []);

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
      <StyledMainGrid
        maxWidth='lg'
        component={'main'}
        sx={{ padding: { xs: 0, md: 0 }, paddingTop: { sm: 0, md: 12 } }}>
        <Box
          sx={{
            gridColumn: { xs: '-1 / -1', md: ' 1 / 8' },
            position: 'relative',
          }}>
          <Box
            component={'img'}
            src={venueById && venueById.media[0]}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
            onClick={() => setOpen(true)}
          />

          {venueById && venueById.media.length > 1 && (
            <MainThemeButton
              onClick={() => setOpen(true)}
              sx={{ position: 'absolute', top: 20, right: 20 }}>
              View Gallery of all {venueById.media.length} images
            </MainThemeButton>
          )}
          <ImageModal venue={venueById} open={open} handleClose={handleClose} />
        </Box>
        <VenueDetails
          sx={{
            borderRadius: { xs: 0, sm: 0, md: '.5rem 0 0 .5rem' },
            gridColumn: { xs: '-1 / -1', md: '8 / 13' },
          }}>
          <Typography
            level='h2'
            component={'h1'}
            sx={{
              fontFamily: 'futura-PT-condensed',
              fontWeight: 700,
              textTransform: 'uppercase',
            }}>
            {venueById && venueById.name}
          </Typography>
          <Typography>{venueById && venueById.description}</Typography>
          {venueById && <LocationMeta location={venueById.location} />}
          {venueById &&
            profile?.name !== venueById?.owner.name &&
            profile.name !== '' && <BookingForm venue={venueById} />}
          {venueById && profile?.name === '' && <AuthContainer />}
        </VenueDetails>
      </StyledMainGrid>
    );
  }
}
