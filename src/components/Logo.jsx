import { Box } from '@mui/joy';
import logo from '../assets/logo_3.svg';

export function Logo() {
  return (
    <Box>
      <Box
        component={'img'}
        src={logo}
        alt='logo'
        sx={{ minWidth: 100, maxWidth: 200 }}
      />
    </Box>
  );
}
