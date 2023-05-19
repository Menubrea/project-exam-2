import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Checkbox, Typography } from '@mui/joy';
import { MainThemeButton } from '../../styles/GlobalStyles';
import { MainThemeInput } from '../../styles/GlobalStyles';
import { useState } from 'react';

const registerUrl = 'https://api.noroff.dev/api/v1/holidaze/auth/register';

const registerSchema = yup.object({
  name: yup.string().required().trim(),
  email: yup.string().email().required().trim(),
  avatar: yup.string().required().trim(),
  password: yup.string().required().trim(),
  venueManager: yup.boolean(),
});

export default function RegisterForm() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(registerSchema) });

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const res = await fetch(registerUrl, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      switch (res.status) {
        case 201:
          const result = await res.json();
          console.log(result);
          break;
        case 400:
          setErrorMessage('Username or email already exists');
          throw new Error('Username or email already exists');
        default:
          setErrorMessage('Something went wrong, please try again');
          throw new Error();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box onSubmit={handleSubmit(onSubmit)} component={'form'}>
      <Box>
        <Typography level='body1' component={'label'} htmlFor='registerEmail'>
          Email
        </Typography>
        <MainThemeInput
          id='registerEmail'
          type='email'
          sx={{ paddingX: 1, borderRadius: 3 }}
          {...register('email')}
        />
        <Typography level='body3'>{errors.email?.message}</Typography>
      </Box>
      <Box>
        <Typography level='body1' component={'label'} htmlFor='registerPass'>
          Password
        </Typography>
        <MainThemeInput
          id='registerPass'
          sx={{ paddingX: 1 }}
          type='password'
          {...register('password')}
        />
        <Typography level='body3'>{errors.password?.message}</Typography>
      </Box>
      <Box>
        <Typography level='body1' component={'label'} htmlFor='registerName'>
          Your Name
        </Typography>
        <MainThemeInput
          id='registerName'
          sx={{ paddingX: 1 }}
          type='text'
          {...register('name')}
        />
        <Typography level='body3'>{errors.name?.message}</Typography>
      </Box>
      <Box>
        <Typography level='body1' component={'label'} htmlFor='registerAvatar'>
          Avatar
        </Typography>
        <MainThemeInput
          id='registerAvatar'
          sx={{ paddingX: 1 }}
          type='text'
          {...register('avatar')}
        />
        <Typography level='body3'>{errors.avatar?.message}</Typography>
      </Box>
      <Box sx={{ margin: '1em auto 0', textAlign: 'center' }}>
        <Checkbox
          label='Are you a Venue Manager?'
          id='registerVenue'
          {...register('venueManager')}
        />
      </Box>
      <Typography
        variant='h6'
        component={'p'}
        textAlign={'center'}
        color='error'
        sx={{ marginTop: 2 }}>
        {errorMessage}
      </Typography>
      <MainThemeButton sx={{ marginTop: 2 }} fullWidth type='submit'>
        Register
      </MainThemeButton>
    </Box>
  );
}
