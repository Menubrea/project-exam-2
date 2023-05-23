import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Checkbox,
  FormControl,
  FormHelperText,
  Typography,
  FormLabel,
} from '@mui/joy';
import { MainThemeButton, MainThemeInput } from '../../styles/GlobalStyles';
import { useState } from 'react';
import { Logo } from '../UI/UI_components';

const registerUrl = 'https://api.noroff.dev/api/v1/holidaze/auth/register';

const registerSchema = yup.object({
  name: yup
    .string()
    .required()
    .matches(/^[\w]+$/, 'Must only contain letters, numbers or underscore.')
    .max(20)
    .trim(),
  email: yup
    .string()
    .email()
    .required()
    .matches(
      /^[\w\-.]+@(stud\.)?noroff\.no$/,
      'Must end with @noroff.no or @stud.noroff.no'
    )
    .trim(),
  avatar: yup
    .string()
    .required()
    .matches(/^https?:/, 'Must be a valid url')
    .trim(),
  password: yup.string().required().min(8).trim(),
  venueManager: yup.boolean(),
});

export default function RegisterForm() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(registerSchema), mode: 'onChange' });

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
          setErrorMessage(
            `Welcome to Holidaze ${result.name}, you can now log in using your email and password`
          );

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
      setTimeout(() => {
        setErrorMessage('');
      }, 5000);
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
          Create a new Holidaze account!
        </Typography>
      </Box>
      <FormControl sx={{ marginTop: 0.5 }}>
        <FormLabel>Email</FormLabel>
        <MainThemeInput type='email' {...register('email')} />
        <FormHelperText sx={{ width: 'fit-content', margin: '0 auto' }}>
          {errors.email?.message}
        </FormHelperText>
      </FormControl>

      <FormControl sx={{ marginTop: 0.5 }}>
        <FormLabel>Password</FormLabel>
        <MainThemeInput type='password' {...register('password')} />
        <FormHelperText sx={{ width: 'fit-content', margin: '0 auto' }}>
          {errors.password?.message}
        </FormHelperText>
      </FormControl>

      <FormControl sx={{ marginTop: 0.5 }}>
        <FormLabel>Name</FormLabel>
        <MainThemeInput type='text' {...register('name')} />
        <FormHelperText sx={{ width: 'fit-content', margin: '0 auto' }}>
          {errors.name?.message}
        </FormHelperText>
      </FormControl>

      <FormControl sx={{ marginTop: 0.5 }}>
        <FormLabel>Avatar</FormLabel>
        <MainThemeInput type='text' {...register('avatar')} />
        <FormHelperText sx={{ width: 'fit-content', margin: '0 auto' }}>
          {errors.avatar?.message}
        </FormHelperText>
      </FormControl>

      <Box
        sx={{
          margin: '1em auto 0',
          textAlign: 'center',
        }}>
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
      {loading ? (
        <MainThemeButton fullWidth aria-label='loading' type='button' loading />
      ) : (
        <MainThemeButton fullWidth type='submit'>
          Create Account
        </MainThemeButton>
      )}
    </Box>
  );
}
