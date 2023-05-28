import { Box } from '@mui/joy';
import { LinkWrapper } from '../../../styles/GlobalStyles';
import lightLogo from '../../../assets/logo-light.svg';
import darkLogo from '../../../assets/logo-dark.svg';
import { useTheme } from '@mui/joy';

/**
 * Component for displaying the Holidaze logo.
 * @returns {JSX.Element}
 */
export default function Logo() {
  const theme = useTheme();
  const logo = theme.palette.mode === 'dark' ? lightLogo : darkLogo;

  return (
    <LinkWrapper
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      to='/'>
      <Box
        component={'img'}
        src={logo}
        alt='Holidaze logo'
        sx={{
          width: '100px',
        }}
      />
    </LinkWrapper>
  );
}
