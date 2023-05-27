import { useEffect, useState } from 'react';
import { Modal, Box, Typography, ModalDialog, ModalClose } from '@mui/joy';
import { LoginForm, RegisterForm } from '../forms';
import { MainThemeButton } from '../../styles/GlobalStyles';

/**
 * Modal component for handling authentication
 * @param {boolean} open - boolean for opening modal
 * @param {function} handleClose - function for closing modal
 * @param {function} handleLoggedIn - function for handling login
 * @returns {JSX.Element}
 */
export default function AuthModal({ open, handleClose, handleLoggedIn }) {
  const [hasAccount, setHasAccount] = useState(true);

  const handleAccountChange = () => {
    hasAccount ? setHasAccount(false) : setHasAccount(true);
  };

  useEffect(() => {
    setHasAccount(true);
  }, [handleClose]);

  return (
    <Modal open={open} onClose={handleClose}>
      <ModalDialog
        sx={{
          borderRadius: 0,
          border: 0,
          padding: 0,
          overflowY: 'auto',
          backgroundColor: (theme) =>
            theme.palette.mode === 'dark'
              ? theme.palette.primary[500]
              : theme.palette.neutral[50],
        }}>
        <ModalClose
          aria-label='close menu'
          variant='solid'
          color='primary'
          size='sm'
          onClick={handleClose}
        />
        {hasAccount ? (
          <LoginForm onLoginSuccess={handleLoggedIn} />
        ) : (
          <RegisterForm />
        )}
        <Box
          sx={{
            display: 'flex',
            width: 'fit-content',
            gap: 2,
            alignItems: 'center',
            margin: '1em auto 0',
            paddingBottom: 2,
          }}>
          <Typography>
            {hasAccount ? `Don't have an account?` : 'Already have an account?'}
          </Typography>
          <MainThemeButton size='sm' onClick={handleAccountChange}>
            {hasAccount ? 'Register' : 'Login'}
          </MainThemeButton>
        </Box>
      </ModalDialog>
    </Modal>
  );
}
