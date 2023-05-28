import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Typography,
  FormHelperText,
  FormLabel,
  FormControl,
} from '@mui/joy';
import { MainThemeButton } from '../../styles/GlobalStyles';
import { MainThemeInput } from '../../styles/GlobalStyles';
import { useState } from 'react';
import { Logo } from '../UI/UI_components';

const loginUrl = 'https://api.noroff.dev/api/v1/holidaze/auth/login';

const loginSchema = yup.object({
  email: yup
    .string()
    .email()
    .required()
    .matches(
      /^[\w\-.]+@(stud\.)?noroff\.no$/,
      'Must end with @noroff.no or @stud.noroff.no'
    )
    .trim(),
  password: yup.string().required().min(8).trim(),
});

/**
 * Component for displaying a login form
 * @param {function} onLoginSuccess - function to run on successful login
 * @returns {JSX.Element}
 */
export default function LoginForm({ onLoginSuccess }) {
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(loginSchema), mode: 'onChange' });

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

          throw new Error('Something went wrong, please try again');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setTimeout(() => {
        setErrorMessage('');
      }, 2000);
    }
  };

  return (
    <Box
      sx={{ padding: 2 }}
      onSubmit={handleSubmit(onSubmit)}
      component={'form'}>
      <Box marginY={2}>
        <Logo />
        <Typography marginTop={1} textAlign={'center'}>
          Log in to your Holidaze account
        </Typography>
      </Box>
      <FormControl>
        <FormLabel>Email</FormLabel>
        <MainThemeInput
          title='Must be a valid noroff.no or @stud.noroff.no email'
          name='email'
          type='email'
          {...register('email')}
        />
        <FormHelperText sx={{ width: 'fit-content', margin: '0 auto' }}>
          {errors.email?.message}
        </FormHelperText>
      </FormControl>
      <FormControl sx={{ marginTop: 2 }}>
        <FormLabel>Password</FormLabel>
        <MainThemeInput type='password' {...register('password')} />
        <FormHelperText sx={{ width: 'fit-content', margin: '0 auto' }}>
          {errors.password?.message}
        </FormHelperText>
      </FormControl>
      <Typography
        variant='h6'
        component={'p'}
        textAlign={'center'}
        sx={{ marginY: 2 }}>
        {errorMessage}
      </Typography>
      {loading ? (
        <MainThemeButton fullWidth aria-label='loading' type='button' loading />
      ) : (
        <MainThemeButton fullWidth type='submit'>
          Log In
        </MainThemeButton>
      )}
    </Box>
  );
}
