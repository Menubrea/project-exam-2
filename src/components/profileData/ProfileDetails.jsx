import { Box, Typography, styled, IconButton } from '@mui/joy';
import { MainThemeButton } from '../../styles/GlobalStyles';
import { useEffect, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { UpdateAvatarModal } from '../modals';
import { StoredProfile } from '../hooks';
import { altImage } from '../../constants/variables';

export default function ProfileDetails({ profile, handleCreateSlide }) {
  const { token } = StoredProfile();
  const [avatar, setAvatar] = useState('');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setAvatar(profile.avatar);
  }, [profile]);

  const handleClose = () => setOpen(false);

  const updateAvatar = (prev) => {
    setAvatar(prev !== avatar ? prev : avatar);
  };

  return (
    <ProfileContainer>
      <Box sx={{ display: { xs: 'block', sm: 'flex' } }}>
        <Box
          sx={{ position: 'relative', margin: '0 auto', width: 'fit-content' }}>
          <Box
            component={'img'}
            src={avatar ? avatar : altImage}
            alt={`${profile.name} avatar`}
            onError={(e) => (e.target.src = altImage)}
            sx={{
              width: '100%',
              height: '100%',
              maxHeight: 180,
              minWidth: 180,

              aspectRatio: '1 / 1',
              objectFit: 'cover',
              borderRadius: 3,
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              top: -12,
              left: -12,
            }}>
            <IconButton
              aria-label='Edit Avatar'
              aria-roledescription='button'
              onClick={() => setOpen(true)}
              color='primary'
              variant='solid'
              size='sm'
              sx={{ borderRadius: '100vh', border: '1px solid white' }}>
              <EditIcon fontSize='sm' />
            </IconButton>
          </Box>
        </Box>
        <Box sx={{ padding: 2 }}>
          <Typography
            level='h2'
            component={'h1'}
            sx={{
              textAlign: { xs: 'center', sm: 'left' },
              fontFamily: 'amatic-sc, sans-serif',
            }}>
            {profile.name}
          </Typography>
          <Typography
            sx={{ textAlign: { xs: 'center', sm: 'left' } }}
            level='body1'>
            {profile.email}
          </Typography>
          <Box
            display={'flex'}
            justifyContent={{ xs: 'center', sm: 'flex-start' }}
            gap={2}
            sx={{
              paddingY: 0.5,
            }}>
            {profile.bookings && (
              <Typography level='body3' component={'span'}>
                Lifetime bookings: {profile.bookings.length}
              </Typography>
            )}
            {profile.venues && (
              <Typography level='body3' component={'span'}>
                Venues: {profile.venues.length}
              </Typography>
            )}
          </Box>
          <Box sx={{ marginY: 2 }}>
            {profile.venueManager && (
              <MainThemeButton fullWidth onClick={handleCreateSlide}>
                Create Venue
              </MainThemeButton>
            )}
          </Box>
        </Box>
      </Box>
      <UpdateAvatarModal
        profile={profile}
        open={open}
        handleClose={handleClose}
        updateAvatar={updateAvatar}
        token={token}
        avatar={avatar}
      />
    </ProfileContainer>
  );
}

const ProfileContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.spacing(2),
  padding: theme.spacing(2),
}));
