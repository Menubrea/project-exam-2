import { Logo, Search } from './UI_components';
import { Container, Box, styled } from '@mui/joy';
import { MainMenu, ChangeTheme } from './UI_components';

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
        <Box>
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
