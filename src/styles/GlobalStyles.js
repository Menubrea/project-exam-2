import { Button, Input, Sheet, styled, Textarea, Box, Select } from '@mui/joy';
import { Link } from 'react-router-dom';

export const LinkWrapper = styled(Link)(() => ({
  textDecoration: 'none',
  color: 'inherit',
}));

export const StyledDivider = styled(Box)(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? theme.palette.primary[300]
      : theme.palette.primary[700],
  width: 'max(30vw, 30%)',
  minWidth: '100px',
  height: '5px',
  borderRadius: '100vh',
  margin: theme.spacing(0, 'auto', 2),
}));

export const MainThemeButton = styled(Button)(({ theme }) => ({
  color:
    theme.palette.mode === 'dark'
      ? theme.palette.primary[900]
      : theme.palette.common.white,
  backgroundColor:
    theme.palette.mode === 'dark'
      ? theme.palette.common.white
      : theme.palette.primary[600],
  borderRadius: 3,
  position: 'relative',

  ':hover': {
    transition: 'all 1s ease-in-out',
    borderRadius: '100vh',
    backgroundColor:
      theme.palette.mode === 'dark'
        ? theme.palette.common.white
        : theme.palette.primary[700],
    color:
      theme.palette.mode === 'dark'
        ? theme.palette.primary[700]
        : theme.palette.common.white,
  },
}));

export const MainThemeSelect = styled(Select)(({ theme }) => ({
  borderRadius: 3,

  color:
    theme.palette.mode === 'dark'
      ? theme.palette.common.white
      : theme.palette.primary[900],

  ':hover, :focus, :focus-within': {
    boxShadow:
      theme.palette.mode === 'dark'
        ? `inset 0 0 0 3px ${theme.palette.common.white}`
        : `inset 0 0 0 3px ${theme.palette.primary[700]}`,
  },

  border:
    theme.palette.mode === 'dark'
      ? `1px solid ${theme.palette.common.white}`
      : `1px solid ${theme.palette.primary[700]}`,

  backgroundColor:
    theme.palette.mode === 'dark'
      ? theme.palette.primary[500]
      : theme.palette.neutral[50],

  ':placeholder': {
    color:
      theme.palette.mode === 'dark'
        ? theme.palette.common.white
        : theme.palette.primary[900],
  },
}));

export const MainThemeInput = styled(Input)(({ theme }) => ({
  borderRadius: 3,

  color:
    theme.palette.mode === 'dark'
      ? theme.palette.common.white
      : theme.palette.primary[900],

  ':hover, :focus, :focus-within': {
    boxShadow:
      theme.palette.mode === 'dark'
        ? `inset 0 0 0 3px ${theme.palette.common.white}`
        : `inset 0 0 0 3px ${theme.palette.primary[700]}`,
  },

  border:
    theme.palette.mode === 'dark'
      ? `1px solid ${theme.palette.common.white}`
      : `1px solid ${theme.palette.primary[700]}`,

  backgroundColor:
    theme.palette.mode === 'dark'
      ? theme.palette.primary[500]
      : theme.palette.neutral[50],

  ':placeholder': {
    color:
      theme.palette.mode === 'dark'
        ? theme.palette.common.white
        : theme.palette.primary[900],
  },
}));

export const MainThemeTextArea = styled(Textarea)(({ theme }) => ({
  borderRadius: 3,

  color:
    theme.palette.mode === 'dark'
      ? theme.palette.common.white
      : theme.palette.primary[900],

  ':hover, :focus, :focus-within': {
    boxShadow:
      theme.palette.mode === 'dark'
        ? `inset 0 0 0 3px ${theme.palette.common.white}`
        : `inset 0 0 0 3px ${theme.palette.primary[700]}`,

    color:
      theme.palette.mode === 'dark'
        ? theme.palette.common.white
        : theme.palette.primary[900],

    ':placeholder': {
      color:
        theme.palette.mode === 'dark'
          ? theme.palette.common.white
          : theme.palette.primary[900],
    },
  },

  outline:
    theme.palette.mode === 'dark'
      ? `1px solid ${theme.palette.common.white}`
      : `1px solid ${theme.palette.primary[700]}`,

  backgroundColor:
    theme.palette.mode === 'dark'
      ? theme.palette.primary[500]
      : theme.palette.neutral[50],
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
