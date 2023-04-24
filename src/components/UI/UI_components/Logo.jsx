import { Box } from '@mui/joy';
import logo from '../../../assets/logo_3.svg';
import { LinkWrapper } from '../../../styles/GlobalStyles';

export default function Logo() {
  return (
    <LinkWrapper to='/'>
      <Box
        component={'img'}
        src={logo}
        alt='logo'
        sx={{ minWidth: 100, maxWidth: 200 }}
      />
    </LinkWrapper>
  );
}
