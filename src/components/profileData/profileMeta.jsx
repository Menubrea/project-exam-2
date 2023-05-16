import { Box, Typography, styled, IconButton } from '@mui/joy';
import { MainThemeButton, MainThemeInput } from '../../styles/GlobalStyles';
import { useEffect, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const EditMediaSchema = yup.object({
  avatar: yup.string().required().trim(),
});

export default function ProfileMeta({ profile, handleCreateSlide }) {
  const [token, setToken] = useState('');
  const [showInput, setShowInput] = useState(false);
  const [avatar, setAvatar] = useState(profile.avatar || '');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(EditMediaSchema),
    defaultValues: {
      avatar: '',
    },
  });

  const updateAvatar = (newAvatar) => {
    setAvatar(newAvatar);
  };

  const submitAvatar = async (data) => {
    if (showInput) {
      const response = await fetch(
        `https://api.noroff.dev/api/v1/holidaze/profiles/${profile.name}/media`,
        {
          method: 'PUT',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();
      setShowInput(false);
      updateAvatar(result.avatar);
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(JSON.parse(storedToken));
    }
  }, []);

  const handleShowInput = () => setShowInput(true);
  const handleCloseInput = () => setShowInput(false);

  return (
    <ProfileContainer>
      <FlexContainer>
        <Box sx={{ position: 'relative' }}>
          <Box
            component={'img'}
            src={avatar}
            sx={{
              height: '124px',
              aspectRatio: '1 / 1',
              border: '1px solid white',
              objectFit: 'cover',
            }}
          />
          <Box
            component={'form'}
            onSubmit={handleSubmit(submitAvatar)}
            sx={{
              position: 'absolute',
              bottom: '35px',
              left: '-15px',
            }}>
            {showInput && (
              <>
                <EditAvatarInput
                  aria-label='avatar-input'
                  type='url'
                  placeholder='Paste url'
                  {...register('avatar')}
                />
                <IconButton
                  type='button'
                  aria-label='close-input-button'
                  size='small'
                  sx={{
                    backgroundColor: 'black',
                    color: 'white',
                    position: 'absolute',
                    right: '-120px',
                    bottom: '3px',
                    height: '25px',
                    width: '25px',
                    borderRadius: '100vh',
                  }}>
                  <CloseIcon fontSize='small' onClick={handleCloseInput} />
                </IconButton>
              </>
            )}
            {!showInput ? (
              <IconButton
                type='button'
                aria-label='edit-avatar-button'
                onClick={handleShowInput}
                color='primary'
                variant='solid'
                size='sm'
                sx={{ borderRadius: '100vh', border: '1px solid white' }}>
                <EditIcon fontSize='sm' />
              </IconButton>
            ) : (
              <IconButton
                type='submit'
                color='primary'
                aria-label='submit-button'
                variant='solid'
                size='sm'
                sx={{ borderRadius: '100vh', border: '1px solid white' }}>
                <SendIcon fontSize='sm' />
              </IconButton>
            )}
          </Box>
        </Box>
        <Box>
          <Typography
            level='h1'
            component={'h1'}
            sx={{
              fontFamily: 'amatic-sc, sans-serif',
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
              <MainThemeButton onClick={handleCreateSlide}>
                Create Venue
              </MainThemeButton>
            )}
          </Box>
        </Box>
      </FlexContainer>
    </ProfileContainer>
  );
}

const EditAvatarInput = styled(MainThemeInput)(({ theme }) => ({
  position: 'absolute',
  bottom: theme.spacing(-0.5),
  left: theme.spacing(-0.5),
  paddingLeft: theme.spacing(5),
  borderRadius: '100vh',
  width: 165,
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
  height: 'clamp(300px, 25vh, 500px)',
  gap: theme.spacing(2),
  paddingTop: theme.spacing(10),
}));

const FlexContainer = styled(Box)(({ theme, ...props }) => ({
  display: 'flex',
  gap: theme.spacing(3) || props.gap,
}));
