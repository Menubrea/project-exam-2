import {
  Modal,
  ModalDialog,
  ModalClose,
  Box,
  FormControl,
  FormLabel,
  FormHelperText,
  Typography,
} from '@mui/joy';
import { MainThemeButton, MainThemeInput } from '../../styles/GlobalStyles';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';

const EditMediaSchema = yup.object({
  avatar: yup
    .string()
    .required()
    .matches(/^https?:/, 'Must be a valid url')
    .trim(),
});

export default function UpdateAvatarModal({
  profile,
  open,
  handleClose,
  updateAvatar,
  token,
  avatar,
}) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [input, setInput] = useState(avatar);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(EditMediaSchema),
    defaultValues: {
      avatar: avatar || '',
    },
    mode: 'onChange',
  });

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const clearInputValue = (e) => {
    const input = e.target.previousSibling.firstElementChild;
    input.value = '';
    setInput('');
  };

  const submitAvatar = async (data) => {
    try {
      setLoading(true);
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

      if (response.ok) {
        setLoading(false);
        const result = await response.json();
        updateAvatar(result.avatar);
        setMessage('Avatar Successfully updated');
      } else {
        setMessage('Something went wrong, please try again');
        throw new Error('Something went wrong');
      }
    } catch (err) {
      console.log(err);
      setMessage('Something went wrong, please try again');
    } finally {
      setLoading(false);
      setTimeout(() => {
        setMessage('');
        handleClose();
      }, 1500);
    }
  };
  return (
    <Modal open={open} onClose={handleClose}>
      <ModalDialog
        sx={{
          borderRadius: 0,
          border: 0,
          padding: 2,
          paddingTop: 4,
          overflowY: 'auto',
          backgroundColor: (theme) =>
            theme.palette.mode === 'dark'
              ? theme.palette.primary[500]
              : theme.palette.neutral[50],
        }}
        aria-labelledby='modal-title'
        aria-describedby='modal-description'>
        <ModalClose
          variant='solid'
          color='primary'
          size='sm'
          onClick={handleClose}
        />
        <Box
          sx={{
            margin: '2em auto',
            width: 'clamp(50px, 25vh, 96px)',
            aspectRatio: '1 / 1',
            objectFit: 'cover',
            borderRadius: 3,
          }}
          id='previewAvatar'
          component={'img'}
          src={input ? input : avatar}
          alt={input}
        />
        <Box onSubmit={handleSubmit(submitAvatar)} component={'form'}>
          <FormControl>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <FormLabel>Update Avatar</FormLabel>
            </Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <MainThemeInput
                fullWidth
                slotProps={{
                  input: {
                    id: 'updateForm',
                    onChange: handleInputChange,
                  },
                }}
                placeholder='Enter image url'
                type='text'
                {...register('avatar')}
              />
              {input.length > 0 && (
                <MainThemeButton
                  sx={{ minHeight: 0 }}
                  onClick={clearInputValue}>
                  Clear
                </MainThemeButton>
              )}
            </Box>
            <Box sx={{ width: 'fit-content', margin: '0 auto' }}>
              <FormHelperText>{errors.avatar?.message}</FormHelperText>
            </Box>
          </FormControl>
          {message && (
            <Box
              sx={{
                backgroundColor: (theme) =>
                  theme.palette.mode === 'dark'
                    ? theme.palette.primary[700]
                    : theme.palette.neutral[200],
                padding: 1,
                borderRadius: 5,
                marginTop: 2,
              }}>
              <Typography textAlign={'center'}>{message}</Typography>
            </Box>
          )}
          <Box marginTop={2}>
            {loading ? (
              <MainThemeButton fullWidth loading />
            ) : (
              <MainThemeButton fullWidth type='submit'>
                Update Avatar
              </MainThemeButton>
            )}
          </Box>
        </Box>
      </ModalDialog>
    </Modal>
  );
}
