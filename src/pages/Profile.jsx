import { Container, Typography } from '@mui/joy';

export function Profile() {
  return (
    <Container maxWidth='sm'>
      <Typography
        fontFamily={'amatic-sc, sans-serif'}
        textAlign={'center'}
        level='h1'>
        Profile
      </Typography>
      <Typography textAlign={'center'} level='body1'>
        This is an example paragraph
      </Typography>
    </Container>
  );
}
