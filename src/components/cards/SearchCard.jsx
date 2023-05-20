import { Box, Typography, styled } from '@mui/material';
import { LinkWrapper } from '../../styles/GlobalStyles';
import { VenueMeta, VenuePrice } from '../venueData';
import { altImage } from '../../constants/variables';

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? theme.palette.primary[700]
      : theme.palette.neutral[100],
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
          src={venue && venue.media[0] ? venue.media[0] : altImage}
          alt={`${venue.name} media`}
          onError={(e) => (e.target.src = altImage)}
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
          fontFamily={'open-sans, sans-serif'}
          fontWeight={300}
          textAlign={'center'}
          component={'p'}
          sx={{ marginBottom: 1 }}>
          {venue.name.length > 25
            ? venue.name.slice(0, 25) + '...'
            : venue.name}
        </Typography>
      </StyledBox>
    </LinkWrapper>
  );
}
