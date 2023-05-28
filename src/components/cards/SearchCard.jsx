import { Box, Typography, styled } from '@mui/material';
import { LinkWrapper } from '../../styles/GlobalStyles';
import { VenueMeta, VenuePrice } from '../venueData';
import { altImage } from '../../constants/variables';

const StyledBox = styled(Box)(({ theme }) => ({
  flexBasis: `calc(33.333% - 1em)`,
  minWidth: 260,
  maxWidth: 575,
  flexGrow: 1,
  backgroundColor:
    theme.palette.mode === 'dark'
      ? theme.palette.primary[500]
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

/**
 * Component for displaying a venue card in filtered results
 * @param {object} venue - venue object
 * @param {function} handleClose - function to close the search modal
 * @returns {JSX.Element}
 */
export default function SearchCard({ venue, handleClose }) {
  return (
    <StyledBox sx={{ position: 'relative' }}>
      <LinkWrapper to={`/venue/${venue.id}`} onClick={handleClose}>
        <Box
          component={'img'}
          src={venue && venue.media[0] ? venue.media[0] : altImage}
          alt={`${venue.name} media`}
          onError={(e) => (e.target.src = altImage)}
          loading='lazy'
          sx={{
            width: '100%',
            objectFit: 'cover',
            height: '190px',
            borderRadius: 5,
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
          fontWeight={500}
          component={'h2'}
          sx={{ marginBottom: 1, paddingLeft: 1 }}>
          {venue.name.length > 25
            ? venue.name.slice(0, 25) + '...'
            : venue.name}
        </Typography>
      </LinkWrapper>
    </StyledBox>
  );
}
