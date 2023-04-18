import { useState, useEffect } from 'react';
import { Avatar, Box, Menu, MenuItem, styled } from '@mui/joy';
import { Link } from 'react-router-dom';
import { ChangeTheme } from './ChangeTheme';
import { AuthModal } from '../../modals/AuthModal';
import { MainThemeButton } from '../../../styles/GlobalStyles';

const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.text.primary,
}));

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

export function MainMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLoggedIn = () => {
    const storedProfile = localStorage.getItem('profile');
    setIsLoggedIn(true);
    setIsOpen(false);
    setProfile(JSON.parse(storedProfile));
  };

  const handleLoggedOut = () => {
    setIsLoggedIn(false);
    localStorage.clear('token');
    localStorage.clear('profile');
    setAnchorEl(null);
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
        size='md'
        onClick={handleMenu}
        endDecorator={
          isLoggedIn && (
            <Avatar
              key={profile?.id}
              size='sm'
              sx={{ height: 25, width: 25 }}
              src={profile?.avatar}
            />
          )
        }>
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
      sx={{ width: 300 }}>
      <Box>
        <StyledMenuItem onClick={handleClose}>
          <StyledLink to={'/profile'}>My Account</StyledLink>
        </StyledMenuItem>
        <StyledMenuItem
          onClick={handleClose}
          sx={{
            borderTop: '1px solid #fff',
            borderBottom: '1px solid #fff',
          }}>
          <ChangeTheme />
        </StyledMenuItem>
        <StyledMenuItem onClick={handleLoggedOut}>Logout</StyledMenuItem>
      </Box>
    </StyledMenu>
  );
}
