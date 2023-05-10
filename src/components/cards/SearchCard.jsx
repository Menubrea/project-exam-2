import { Box, Typography, styled } from '@mui/material';
import { LinkWrapper } from '../../styles/GlobalStyles';
import { VenueMeta, VenuePrice } from '../venueData';

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? theme.palette.primary[700]
      : theme.palette.neutral[200],
  borderRadius: theme.spacing(0.5),
  overflow: 'hidden',
  ':hover': {
    cursor: 'pointer',

    '& img': {
      filter: 'brightness(0.8)',
    },
  },
}));

export default function SearchCard({ venue, handleClose }) {
  return (
    <LinkWrapper to={`/venue/${venue.id}`} onClick={handleClose}>
      <StyledBox sx={{ position: 'relative' }}>
        <Box
          component={'img'}
          src={venue.media[0]}
          alt={`${venue.name} media`}
          sx={{
            width: '100%',
            objectFit: 'cover',
            height: '190px',
          }}
        />
        <VenueMeta
          meta={venue.meta}
          maxGuests={venue.maxGuests}
          position='absolute'
        />
        <VenuePrice venue={venue} />
        <Typography
          level='body1'
          textAlign={'center'}
          component={'p'}
          sx={{ marginBottom: 1 }}>
          {venue.name}
        </Typography>
      </StyledBox>
    </LinkWrapper>
  );
}
