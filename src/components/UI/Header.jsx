import { Logo } from './UI_components';
import { alpha } from '@mui/system';
import { Container, Box, styled } from '@mui/joy';
import { MainMenu, ChangeTheme, Search } from './UI_components';

const StyledBox = styled(Box)(({ theme }) => ({
  width: '100%',
  position: 'absolute',
  zIndex: 100,
  left: '50%',
  transform: 'translateX(-50%)',
}));

export function Header() {
  return (
    <StyledBox>
      <Container
        component={'header'}
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          paddingY: 2,
          alignItems: 'center',
        }}>
        <Logo />
        <Box sx={{ display: 'flex', gap: 1 }}>
          <ChangeTheme />
          <Search />
          <MainMenu />
        </Box>
      </Container>
    </StyledBox>
  );
}
