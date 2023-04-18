import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Typography } from '@mui/joy';
import { MainThemeButton } from '../../styles/GlobalStyles';
import { MainThemeInput } from '../../styles/GlobalStyles';
import { useState } from 'react';

const loginUrl = 'https://api.noroff.dev/api/v1/holidaze/auth/login';

const loginSchema = yup.object({
  email: yup.string().email().required().trim(),
  password: yup.string().required().trim(),
});

export function LoginForm({ onLoginSuccess }) {
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(loginSchema) });

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const res = await fetch(loginUrl, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      switch (res.status) {
        case 200:
          const result = await res.json();
          const { accessToken, ...profile } = result;
          setLoading(false);
          localStorage.setItem('profile', JSON.stringify(profile));
          localStorage.setItem('token', JSON.stringify(accessToken));
          onLoginSuccess();
          break;
        case 401:
          setErrorMessage('Invalid email or password');
          throw new Error('Invalid email or password');

        default:
          setErrorMessage('Something went wrong, please try again');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box onSubmit={handleSubmit(onSubmit)} component={'form'}>
      <Typography level='body1' component={'label'} htmlFor='loginEmail'>
        Email
      </Typography>
      <MainThemeInput
        id='loginEmail'
        type='email'
        sx={{ paddingX: 1, borderRadius: 3 }}
        {...register('email')}
      />
      <Typography level='body3'>{errors.email?.message}</Typography>
      <Typography level='body1' component={'label'} htmlFor='loginPass'>
        Password
      </Typography>
      <MainThemeInput
        id='loginPass'
        sx={{ paddingX: 1 }}
        type='password'
        {...register('password')}
      />
      <Typography level='body3'>{errors.password?.message}</Typography>
      <Typography
        variant='h6'
        component={'p'}
        textAlign={'center'}
        color='error'
        sx={{ marginTop: 2 }}>
        {errorMessage}
      </Typography>
      <MainThemeButton sx={{ marginTop: 2 }} fullWidth type='submit'>
        Log In
      </MainThemeButton>
    </Box>
  );
}
