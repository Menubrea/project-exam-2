import { Box, Typography, styled, Container } from '@mui/joy';
import { LinkWrapper } from '../../styles/GlobalStyles';
import { altImage } from '../../constants/variables';
import { useEffect, useState } from 'react';
import { debounce } from 'lodash';
import { AltMeta } from '../venueData';

const HeroContainer = styled(Box)(({ theme }) => ({
  height: 'min(calc(90vh + 50px), 1000px)',
  position: 'relative',
  overflow: 'hidden',
  top: 0,
  zIndex: 0,
}));

const HeroBody = styled(Box)(({ theme }) => ({
  width: '100%',
  position: 'absolute',
  zIndex: 2,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingBottom: theme.spacing(2),
  zIndex: 1,

  ':before': {
    content: '""',
    zIndex: -1,
    position: 'absolute',
    left: 0,
    width: '120vw',
    height: '170%',
    bottom: 80,
    backgroundColor:
      theme.palette.mode === 'dark'
        ? theme.palette.primary[500]
        : theme.palette.neutral[100],
    clipPath: 'polygon(0% 53%, 100% 76%, 100% 100%, 0% 99%)',
  },

  ':hover': {
    cursor: 'pointer',
  },
}));

export default function HeroCard({ venue }) {
  const [description, setDescription] = useState(venue.description);
  const [count, setCount] = useState(0);

  const handleResize = debounce(() => {
    console.log(count);
    setCount(window.innerWidth / 3);
  }, 100);

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);

  useEffect(() => {
    if (venue.description && count > 0) {
      setDescription(venue.description.slice(0, count).concat('...'));
    }
  }, [count, venue.description]);

  return (
    <HeroContainer>
      <Box
        component={'img'}
        src={venue.media && venue.media[0] ? venue.media[0] : altImage}
        alt={venue && venue.name + ' media'}
        onError={(e) => (e.target.src = altImage)}
        sx={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          position: 'absolute',
          bottom: 100,
        }}
      />
      <HeroBody>
        <Container sx={{ display: 'flex' }}>
          <LinkWrapper to={`/venue/${venue.id}`}>
            <Box sx={{ paddingTop: 2, width: '100%' }}>
              <Box>
                <AltMeta venue={venue} />
                <Typography
                  level='h6'
                  component='p'
                  sx={{
                    fontSize: 'clamp(1.2rem, 2vw, 1.4rem)',
                    textTransform: 'Uppercase',
                    fontWeight: 900,
                    lineHeight: 1,
                    marginTop: 1,
                  }}>
                  Newest and hottest
                </Typography>
              </Box>
              <Box
                sx={{
                  display: { xs: 'block', sm: 'flex' },
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Typography
                  level='h1'
                  component={'h1'}
                  sx={{
                    fontFamily: 'amatic-sc, sans-serif',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    fontSize: 'clamp(2.8rem, 5vw, 3.8rem)',
                    marginBottom: 1,
                    lineHeight: 1,
                  }}>
                  {venue.name}
                </Typography>
              </Box>

              <Typography
                level='h6'
                component={'p'}
                sx={{
                  overflow: 'hidden',
                  fontSize: { xs: '.9rem', sm: '1.1rem' },
                }}>
                {description}
              </Typography>
              <Box
                sx={{
                  margin: { xs: '.5rem auto', sm: '0 0 0 auto' },
                  width: 'fit-content',
                }}></Box>
            </Box>
          </LinkWrapper>
        </Container>
      </HeroBody>
    </HeroContainer>
  );
}
