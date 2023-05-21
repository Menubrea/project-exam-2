import { useState, useEffect } from 'react';
import { Avatar, Box, Menu, MenuItem, styled } from '@mui/joy';
import { AuthModal } from '../../modals';
import { LinkWrapper, MainThemeButton } from '../../../styles/GlobalStyles';
import { useNavigate } from 'react-router-dom';

const StyledMenu = styled(Menu)(({ theme }) => ({
  borderRadius: 0,
  border: 'none',
}));

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  color:
    theme.palette.mode === 'dark'
      ? theme.palette.common.white
      : theme.palette.primary[500],
  '&:hover': {
    backgroundColor:
      theme.palette.mode === 'dark'
        ? theme.palette.primary[500]
        : theme.palette.primary[700],
    color: theme.palette.mode === 'light' && theme.palette.common.white,
    a: {
      color: theme.palette.mode === 'light' && theme.palette.common.white,
    },
    button: {
      color: theme.palette.mode === 'light' && theme.palette.common.white,
    },
  },
}));

export default function MainMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedProfile = localStorage.getItem('profile');
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
    setProfile(JSON.parse(storedProfile));
  }, []);

  const handleLoggedIn = () => {
    const storedProfile = localStorage.getItem('profile');
    setProfile(JSON.parse(storedProfile));
    setIsLoggedIn(true);
    setIsOpen(false);

    document.dispatchEvent(new Event('login'));
  };

  const handleLoggedOut = () => {
    setIsLoggedIn(false);
    localStorage.clear('token');
    localStorage.clear('profile');
    setAnchorEl(null);

    navigate('/');

    document.dispatchEvent(new Event('logout'));
  };

  const handleMenu = (event) => {
    isLoggedIn ? setAnchorEl(event.currentTarget) : setIsOpen(true);
  };

  const handleClose = () => {
    isLoggedIn ? setAnchorEl(null) : setIsOpen(false);
  };

  return (
    <>
      <MainThemeButton
        endDecorator={
          <Avatar variant='rounded' size='sm' sx={{ height: 25, width: 25 }} />
        }
        id='login-button'
        size='sm'
        onClick={handleMenu}>
        {!isLoggedIn ? 'Login' : 'My Account'}
      </MainThemeButton>
      <LoggedInMenu
        anchorEl={anchorEl}
        handleClose={handleClose}
        handleLoggedOut={handleLoggedOut}
      />
      <AuthModal
        open={open}
        handleClose={handleClose}
        handleLoggedIn={handleLoggedIn}
      />
    </>
  );
}

export function LoggedInMenu({ anchorEl, handleClose, handleLoggedOut }) {
  return (
    <StyledMenu
      placement='bottom-end'
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleClose}
      sx={{ width: { xs: '100%', sm: 300 } }}>
      <Box>
        <LinkWrapper to={'/profile'}>
          <StyledMenuItem onClick={handleClose}>My Account</StyledMenuItem>
        </LinkWrapper>

        <StyledMenuItem onClick={handleLoggedOut}>Logout</StyledMenuItem>
      </Box>
    </StyledMenu>
  );
}
