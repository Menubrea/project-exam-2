import { Box, Typography, styled } from '@mui/joy';
import { MainThemeButton } from '../../../styles/GlobalStyles';

const AuthBox = styled(Box)(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? theme.palette.primary[500]
      : theme.palette.neutral[100],
  padding: theme.spacing(2),
  borderRadius: 5,
  margin: theme.spacing(5, 0, 0),
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
}));

/**
 * Component for displaying a container with a button that opens the auth modal.
 * @returns {JSX.Element}
 */
export default function AuthContainer() {
  const loginButton = document.getElementById('login-button');

  const handleClick = () => {
    const clickEvent = new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true,
    });
    loginButton.dispatchEvent(clickEvent);
  };

  return (
    <AuthBox>
      <Typography
        level='h6'
        component={'p'}
        textAlign={'center'}
        sx={{ marginBottom: 1 }}>
        Log in or Register to make a booking:
      </Typography>
      <MainThemeButton onClick={handleClick} fullWidth>
        Log In
      </MainThemeButton>
    </AuthBox>
  );
}
