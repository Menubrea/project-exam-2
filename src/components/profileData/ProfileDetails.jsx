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
      <Box sx={{ display: { xs: 'block', sm: 'flex' }, gap: 2 }}>
        <Box
          sx={{ position: 'relative', margin: '0 auto', width: 'fit-content' }}>
          <Box
            component={'img'}
            src={avatar ? avatar : altImage}
            alt={`${profile.name} avatar`}
            sx={{
              margin: '0 auto',
              width: 'clamp(50px, 25vh, 96px)',
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
        <Box>
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
              borderBlock: (theme) =>
                theme.palette.mode === 'dark'
                  ? `1px solid ${theme.palette.common.white}`
                  : `1px solid ${theme.palette.primary[900]}`,
            }}>
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
  alignItems: 'center',
  flexDirection: 'column',
  justifyContent: 'center',
  backgroundColor:
    theme.palette.mode === 'dark'
      ? theme.palette.primary[700]
      : theme.palette.neutral[200],
  gap: theme.spacing(2),
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(2),
}));
