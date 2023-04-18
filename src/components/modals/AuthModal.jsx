import { useState } from 'react';
import { Modal, ModalClose, Box, Typography } from '@mui/joy';
import { LoginForm } from '../forms/LoginForm';
import { MainThemeButton } from '../../styles/GlobalStyles';
import { ModalSheet } from '../../styles/GlobalStyles';
import { RegisterForm } from '../forms/RegisterForm';

export function AuthModal({ open, handleClose, handleLoggedIn }) {
  const [hasAccount, setHasAccount] = useState(true);

  const handleAccountChange = () => {
    hasAccount ? setHasAccount(false) : setHasAccount(true);
  };

  return (
    <Modal
      open={open}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <ModalSheet
        sx={{
          maxWidth: 800,
          minWidth: 300,
          border: '1px solid #fff',
          borderRadius: 3,
        }}>
        <ModalClose
          variant='solid'
          color='primary'
          onClick={handleClose}
          sx={{
            top: -15,
            right: -15,
            borderRadius: '100%',
            border: '1px solid #fff',
          }}
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
          }}>
          <Typography>
            {hasAccount ? `Don't have an account?` : 'Already have an account?'}
          </Typography>
          <MainThemeButton size='sm' onClick={handleAccountChange}>
            {hasAccount ? 'Register' : 'Login'}
          </MainThemeButton>
        </Box>
      </ModalSheet>
    </Modal>
  );
}
