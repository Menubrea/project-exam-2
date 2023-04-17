import { Container, Typography } from '@mui/joy';

export function Venue() {
  return (
    <Container maxWidth='sm'>
      <Typography
        fontFamily={'amatic-sc, sans-serif'}
        textAlign={'center'}
        level='h1'>
        Venue
      </Typography>
      <Typography textAlign={'center'} level='body1'>
        This is an example paragraph
      </Typography>
    </Container>
  );
}
