import { Box, Typography, styled, Button, Container } from '@mui/joy';
import { MainThemeButton } from '../../styles/GlobalStyles';
import { useState } from 'react';
import { VenueFormModal } from '../modals';
import { VenueEditCard } from '../cards';

const VenueContainer = styled(Container)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
  gap: theme.spacing(2),
}));

const VenueWrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2, 0),
  width: '100%',
  backgroundColor:
    theme.palette.mode === 'dark'
      ? theme.palette.primary[900]
      : theme.palette.neutral[50],
  borderTop:
    theme.palette.mode === 'dark'
      ? `1px solid ${theme.palette.common.white}`
      : `1px solid ${theme.palette.primary[700]}`,
  borderBottom:
    theme.palette.mode === 'dark'
      ? `1px solid ${theme.palette.common.white}`
      : `1px solid ${theme.palette.primary[700]}`,
}));

const ProfileContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  justifyContent: 'center',
  backgroundColor:
    theme.palette.mode === 'dark'
      ? theme.palette.primary[700]
      : theme.palette.neutral[200],
  height: 'clamp(450px, 25vh, 700px)',
  gap: theme.spacing(2),
  paddingTop: theme.spacing(10),
}));

const FlexContainer = styled(Box)(({ theme, ...props }) => ({
  display: 'flex',
  gap: theme.spacing(3) || props.gap,
}));

export default function ProfileMeta({ profile, venues }) {
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);

  if (!profile) return <div>Loading...</div>;

  return (
    <ProfileContainer>
      <FlexContainer>
        <Box sx={{ position: 'relative' }}>
          <Box
            component={'img'}
            src={profile.avatar}
            sx={{
              height: '124px',
              aspectRatio: '1 / 1',
              border: '1px solid white',
              objectFit: 'cover',
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              bottom: 30,
              left: '50%',
              transform: 'translateX(-50%)',
            }}>
            <MainThemeButton>Edit Avatar</MainThemeButton>
          </Box>
        </Box>
        <Box>
          <Typography
            level='h1'
            component={'h1'}
            sx={{
              fontFamily: 'futura-pt-condensed, sans-serif',
              textTransform: 'uppercase',
            }}>
            {profile.name}
          </Typography>
          <Typography level='body1'>{profile.email}</Typography>
          <Box display={'flex'} gap={2}>
            {profile.bookings && (
              <Typography level='body3' component={'span'}>
                Bookings: {profile.bookings.length}
              </Typography>
            )}
            {profile.venues && (
              <Typography level='body3' component={'span'}>
                Venues: {profile.venues.length}
              </Typography>
            )}
          </Box>
          <Box sx={{ marginTop: 2, width: 'fit-content', margin: '1rem auto' }}>
            {profile.venueManager && (
              <MainThemeButton onClick={() => setOpen(true)}>
                Create Venue
              </MainThemeButton>
            )}
          </Box>
        </Box>
      </FlexContainer>

      {profile.venueManager && (
        <VenueFormModal handleClose={handleClose} open={open} />
      )}
      <VenueWrapper>
        <Container component={'section'}>
          <Typography
            level='h5'
            component={'h2'}
            sx={{
              fontFamily: 'futura-PT-condensed',
              textTransform: 'uppercase',
            }}>
            Manage Venues:
          </Typography>
        </Container>
        <VenueContainer>
          {venues &&
            venues.map((venue) => (
              <VenueEditCard key={venue.id} venue={venue} />
            ))}
        </VenueContainer>
      </VenueWrapper>
    </ProfileContainer>
  );
}
