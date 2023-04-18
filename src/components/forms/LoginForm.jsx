import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Typography } from '@mui/joy';
import { MainThemeButton } from '../../styles/GlobalStyles';
import { MainThemeInput } from '../../styles/GlobalStyles';

const loginSchema = yup.object({
  email: yup.string().email().required().trim(),
  password: yup.string().required().trim(),
});

function onSubmit(data) {
  console.log(data);
}

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(loginSchema) });

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
      <MainThemeButton sx={{ marginTop: 2 }} fullWidth type='submit'>
        Log In
      </MainThemeButton>
    </Box>
  );
}
