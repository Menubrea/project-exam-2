import { Button, Input, Sheet, styled, Container, Box } from '@mui/joy';
import { Link } from 'react-router-dom';

export const LinkWrapper = styled(Link)(() => ({
  textDecoration: 'none',
  color: 'inherit',
}));

export const StyledDivider = styled(Box)(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? theme.palette.primary[400]
      : theme.palette.neutral[300],
  width: 'max(30vw, 30%)',
  minWidth: '100px',
  height: '5px',
  borderRadius: '100vh',
  margin: theme.spacing(2, 'auto'),
}));

export const MainThemeButton = styled(Button)(({ theme }) => ({
  color: theme.palette.common.white,
  backgroundColor: theme.palette.primary[600],
  border:
    theme.palette.mode === 'dark'
      ? `1px solid ${theme.palette.common.white}`
      : `1px solid ${theme.palette.primary[700]}`,
  borderRadius: 3,
}));

export const MainThemeInput = styled(Input)(({ theme }) => ({
  color: theme.palette.primary[900],

  ':placeholder': {
    color: theme.palette.primary[900],
  },

  ':focus': {
    outline: `1px solid ${theme.palette.warning[900]}`,
  },

  backgroundColor:
    theme.palette.mode === 'dark'
      ? theme.palette.neutral[100]
      : theme.palette.neutral[50],
  border:
    theme.palette.mode === 'dark'
      ? `1px solid ${theme.palette.common.white}`
      : `1px solid ${theme.palette.primary[700]}`,
  borderRadius: 3,
  ':placeholder': {
    color:
      theme.palette.mode === 'dark'
        ? theme.palette.common.white
        : theme.palette.primary[900],
  },
}));

export const ModalSheet = styled(Sheet)(({ theme }) => ({
  borderRadius: 3,
  padding: theme.spacing(2),
  backgroundColor:
    theme.palette.mode === 'dark'
      ? theme.palette.primary[500]
      : theme.palette.neutral[100],
  color:
    theme.palette.mode === 'dark'
      ? theme.palette.common.white
      : theme.palette.primary[900],
  border:
    theme.palette.mode === 'dark'
      ? `1px solid ${theme.palette.common.white}`
      : `1px solid ${theme.palette.primary[700]}`,
}));

export const MainGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
  gap: theme.spacing(4, 2),
  maxWidth: '100%',
  margin: '0 auto 2em',
  minHeight: '50vh',
}));
