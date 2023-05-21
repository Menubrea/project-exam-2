import { Typography, Box, styled } from '@mui/joy';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import GlobeIcon from '@mui/icons-material/Public';

const StyledNavElement = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  position: 'relative',
  width: '100%',
  height: '100%',
  padding: theme.spacing(1, 2),
  overflow: 'hidden',

  ':before': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: '100%',
    borderRadius: 5,
    background:
      theme.palette.mode === 'dark'
        ? `linear-gradient(45deg, ${theme.palette.primary[500]}, ${theme.palette.primary[600]})`
        : `linear-gradient(45deg, ${theme.palette.neutral[200]}, ${theme.palette.neutral[300]})`,
    transform: 'scaleX(0)',
    transition: 'transform 0.3s ease-in-out',
    transformOrigin: 'right',
    zIndex: '-1',
  },

  ':hover:before': {
    transform: 'scaleX(1)',
    transformOrigin: 'left',
  },

  '@media (max-width: 600px)': {
    padding: theme.spacing(2, 1),
  },
}));

export function Navigation() {
  return (
    <Box component={'nav'} sx={{ width: '100%' }}>
      <Box
        sx={{
          listStyle: 'none',
          margin: 0,
          padding: 0,
          display: 'flex',
          justifyContent: { xs: 'space-around', sm: 'flex-start' },
          height: '100%',
          width: '100%',
          alignItems: 'center',
        }}>
        <StyledNavElement to='/'>
          <Typography
            margin={'0 auto'}
            width={'fit-content'}
            startDecorator={<HomeIcon />}>
            Home
          </Typography>
        </StyledNavElement>

        <StyledNavElement to='/browse'>
          <Typography
            margin={'0 auto'}
            width={'fit-content'}
            startDecorator={<GlobeIcon />}>
            Browse
          </Typography>
        </StyledNavElement>
      </Box>
    </Box>
  );
}
