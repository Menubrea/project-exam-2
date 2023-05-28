import { Typography, Box, styled } from '@mui/joy';
import { Link } from 'react-router-dom';

const StyledNavElement = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  position: 'relative',
  width: '100%',
  height: '100%',
  padding: theme.spacing(0.5, 1),
  overflow: 'hidden',

  '@media (max-width: 600px)': {
    padding: theme.spacing(2, 1),
    zIndex: 100,
  },

  '& :hover': {
    cursor: 'pointer',
    opacity: 0.8,
  },
}));

/**
 * Main navigation component
 * @returns {JSX.Element} Navigation component
 */
export function Navigation() {
  return (
    <Box component={'nav'} sx={{ width: '100%' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: { xs: 'space-around', sm: 'flex-start' },
          height: '100%',
          width: '100%',
          alignItems: 'center',
        }}>
        <StyledNavElement to='/'>
          <Typography margin={'0 auto'} width={'fit-content'}>
            Home
          </Typography>
        </StyledNavElement>

        <StyledNavElement to='/browse'>
          <Typography margin={'0 auto'} width={'fit-content'}>
            Browse
          </Typography>
        </StyledNavElement>
      </Box>
    </Box>
  );
}
