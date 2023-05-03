import { Box, Typography, styled, Container } from '@mui/joy';
import { VenueMeta } from '../venueData';
import { MainThemeButton, LinkWrapper } from '../../styles/GlobalStyles';

// Styling for Hero section container.
const HeroContainer = styled(Box)(({ theme }) => ({
  height: 'min(70vh, 1000px)',
  position: 'relative',
  overflow: 'hidden',

  ':before, :after': {
    content: '""',
    zIndex: 1,
    position: 'absolute',
    left: 0,
    width: '100%',
  },
  ':after': {
    height: 'min(40vh, 350px)',
    bottom: 0,
    background:
      theme.palette.mode === 'dark'
        ? `linear-gradient(0deg, ${theme.palette.primary[500]} 0%, rgba(255,255,255,0) 100%)`
        : `linear-gradient(0deg, ${theme.palette.neutral[50]} 0%, rgba(255,255,255,0) 100%)`,
  },
  bottom: '0',
}));

// Styling for hero section body.
const HeroBody = styled(Container)(({ theme }) => ({
  width: '100%',
  position: 'absolute',
  zIndex: 2,
  bottom: 0,
  display: 'flex',
  left: '50%',
  transform: 'translateX(-50%)',
  alignItems: 'center',
  justifyContent: 'space-between',
}));

export default function HeroCard({ venue }) {
  return (
    <HeroContainer>
      <Box
        component={'img'}
        src={venue.media && venue.media[0]}
        alt={venue.name}
        sx={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.5 }}
      />
      <HeroBody>
        <Box sx={{ maxWidth: 700, display: 'flex' }}>
          <VenueMeta
            position='static'
            borderRadius='100px'
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
                lineHeight: 0.3,
              }}>
              This week's featured venue
            </Typography>
            <Typography
              level='h1'
              component={'h2'}
              sx={{
                fontFamily: 'amatic-sc',
                fontWeight: 700,
                textTransform: 'uppercase',
                lineHeight: 1,
                marginBottom: 1,
              }}>
              {venue.name}
            </Typography>
            <Typography level='h6' component={'p'} sx={{ overflow: 'hidden' }}>
              {venue.description.slice(0, 450).concat('...')}
            </Typography>
          </Box>
        </Box>
        <MainThemeButton>
          <LinkWrapper to={`/venue/${venue.id}`}>Read More</LinkWrapper>
        </MainThemeButton>
      </HeroBody>
    </HeroContainer>
  );
}
