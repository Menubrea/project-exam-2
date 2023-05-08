import { Logo } from './UI_components';
import { alpha } from '@mui/system';
import { Container, Box, styled } from '@mui/joy';
import { MainMenu, ChangeTheme, Search } from './UI_components';
import { Navigation } from './Nav';

const StyledBox = styled(Box)(({ theme }) => ({
  width: '100%',
  position: 'absolute',
  zIndex: 100,
  left: '50%',
  transform: 'translateX(-50%)',
}));

export function Header({ venues }) {
  return (
    <StyledBox component={'header'}>
      <Container
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          paddingY: { xs: 0, sm: 1 },
          paddingX: { xs: 1, sm: 2 },
          alignItems: 'center',
        }}>
        <Box>
          <Logo />
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            paddingY: 0.5,
            paddingX: 2,
            gap: 2,
          }}>
          <Navigation />
          <Search venues={venues} />
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <ChangeTheme />

          <MainMenu />
        </Box>
      </Container>
    </StyledBox>
  );
}
