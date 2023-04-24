import { Box, Typography, styled, Container } from '@mui/joy';
import { VenueMeta } from '../venueData';
import { MainThemeButton, LinkWrapper } from '../../styles/GlobalStyles';

// Styling for Hero section container.
const HeroContainer = styled(Box)(({ theme }) => ({
  height: '70vh',
  position: 'relative',
  overflow: 'hidden',

  ':before, :after': {
    content: '""',
    zIndex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '40%',
  },
  ':after': {
    height: '100%',
    background:
      theme.palette.mode === 'dark'
        ? `linear-gradient(0deg, ${theme.palette.primary[500]} 0%, rgba(255,255,255,0) 100%)`
        : `linear-gradient(0deg, ${theme.palette.neutral[50]} 0%, rgba(255,255,255,0) 100%)`,
  },
  bottom: '0',
}));

// Styling for hero section body.
const HeroBody = styled(Container)(({ theme }) => ({
  position: 'absolute',
  minHeight: 170,
  zIndex: 2,
  bottom: theme.spacing(2),
  left: '50%',
  transform: 'translateX(-50%)',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderRadius: 10,
}));

export default function HeroCard({ venue }) {
  return (
    <HeroContainer>
      <Box
        component={'img'}
        src={venue.media && venue.media[0]}
        alt={venue.name}
        sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
      <HeroBody sx={{ padding: 2 }}>
        <Box sx={{ maxWidth: 700, display: 'flex' }}>
          <VenueMeta
            position='static'
            meta={venue.meta}
            maxGuests={venue.maxGuests}
          />
          <Box sx={{ padding: 2 }}>
            <Typography
              level='h5'
              component='p'
              sx={{
                fontFamily: 'futura-PT-condensed',
                textTransform: 'Uppercase',
                lineHeight: 0,
              }}>
              This week's featured venue
            </Typography>
            <Typography
              level='h1'
              component={'h2'}
              sx={{ fontFamily: 'amatic-sc' }}>
              {venue.name}
            </Typography>
            <Typography level='body1'>
              {venue.description.slice(0, 480)}
            </Typography>
          </Box>
        </Box>
        <MainThemeButton sx={{ alignSelf: 'end' }}>
          <LinkWrapper to={`/venue/${venue.id}`}>Read More</LinkWrapper>
        </MainThemeButton>
      </HeroBody>
    </HeroContainer>
  );
}
