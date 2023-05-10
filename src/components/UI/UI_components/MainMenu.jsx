import { useState, useEffect } from 'react';
import { Avatar, Box, Menu, MenuItem, styled } from '@mui/joy';
import { AuthModal } from '../../modals';
import { LinkWrapper, MainThemeButton } from '../../../styles/GlobalStyles';

const StyledMenu = styled(Menu)(({ theme }) => ({
  border:
    theme.palette.mode === 'dark'
      ? '1px solid #fff'
      : `1px solid ${theme.palette.primary[500]}`,
  borderRadius: 3,
}));

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
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
      <MainThemeButton id='login-button' size='sm' onClick={handleMenu}>
        {!isLoggedIn ? 'Login' : profile?.name}
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
