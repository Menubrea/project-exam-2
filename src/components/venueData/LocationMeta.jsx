import { Box, Typography, styled } from '@mui/joy';

const LocationContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(0.5, 0),
  margin: theme.spacing(1, 0),
  // backgroundColor:
  //   theme.palette.mode === 'dark'
  //     ? theme.palette.primary[500]
  //     : theme.palette.neutral[200],
  // borderRadius: '.2rem',
  display: 'flex',
  gap: theme.spacing(1),
  alignItems: 'center',
  borderBlock:
    theme.palette.mode === 'dark'
      ? `1px solid ${theme.palette.primary[400]}`
      : `1px solid ${theme.palette.neutral[400]}`,
}));

export default function LocationMeta({ location }) {
  return (
    <LocationContainer>
      <Typography sx={{ fontSize: '0.8rem' }}>{location.address}, </Typography>
      <Typography level='body1' sx={{ fontSize: '0.8rem' }}>
        {location.city},
      </Typography>
      <Typography level='body1' sx={{ fontSize: '0.8rem' }}>
        {location.country}
      </Typography>
    </LocationContainer>
  );
}
