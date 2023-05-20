import { Box, Typography, styled, Container } from '@mui/joy';
import { LinkWrapper } from '../../styles/GlobalStyles';
import { altImage } from '../../constants/variables';
import { useEffect, useState } from 'react';
import { debounce } from 'lodash';

const HeroContainer = styled(Box)(({ theme }) => ({
  height: 'min(96vh, 1000px)',
  position: 'relative',
  overflow: 'hidden',
  top: 0,
}));

const HeroBody = styled(Box)(({ theme }) => ({
  width: '100%',
  position: 'absolute',
  zIndex: 2,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: theme.spacing(2),

  ':before': {
    content: '""',
    zIndex: -1,
    position: 'absolute',
    left: 0,
    width: 0,
    height: 0,
    bottom: 0,
    border:
      theme.palette.mode === 'dark'
        ? `100vw solid ${theme.palette.primary[500]}`
        : `100vw solid ${theme.palette.neutral[50]}`,
    borderTop: '7em solid transparent',
    borderBottom:
      theme.palette.mode === 'dark'
        ? `7em solid ${theme.palette.primary[500]}`
        : `7em solid ${theme.palette.neutral[50]}`,
  },

  ':hover': {
    '& p': {
      textDecoration: 'underline',
    },
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
              <Typography
                level='h6'
                component='p'
                sx={{
                  fontSize: 'clamp(1rem, 2vw, 1.2rem)',
                  textTransform: 'Uppercase',
                  fontWeight: 900,
                  lineHeight: 1,
                }}>
                Newest and hottest
              </Typography>
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
                    fontSize: 'clamp(2.5rem, 5vw, 3.8rem)',
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
