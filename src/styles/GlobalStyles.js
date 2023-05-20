import {
  Button,
  Input,
  Sheet,
  styled,
  Textarea,
  Box,
  Select,
  Option,
  Slider,
} from '@mui/joy';
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
  borderRadius: 3,
  color:
    theme.palette.mode === 'dark'
      ? theme.palette.primary[900]
      : theme.palette.common.white,
  backgroundColor:
    theme.palette.mode === 'dark'
      ? theme.palette.neutral[50]
      : theme.palette.primary[500],
  position: 'relative',
  transition: 'all .2s ease-in-out',

  ':hover': {
    transition: 'all .2s ease-in-out',
    backgroundColor:
      theme.palette.mode === 'dark'
        ? theme.palette.neutral[300]
        : theme.palette.primary[700],
    color:
      theme.palette.mode === 'dark'
        ? theme.palette.primary[900]
        : theme.palette.common.white,
    borderRadius: 10,
  },

  ':disabled': {
    backgroundColor:
      theme.palette.mode === 'dark'
        ? theme.palette.primary[800]
        : theme.palette.neutral[300],
    color:
      theme.palette.mode === 'dark'
        ? theme.palette.common.white
        : theme.palette.primary[900],
  },
}));

export const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? theme.palette.primary[700]
      : theme.palette.neutral[200],

  color:
    theme.palette.mode === 'dark'
      ? theme.palette.common.white
      : theme.palette.primary[900],

  '&:hover': {
    backgroundColor:
      theme.palette.mode === 'dark'
        ? theme.palette.primary[500]
        : theme.palette.neutral[100],
  },

  borderRadius: 0,
  width: 80,
  height: 80,
  clipPath: 'polygon(0 0, 100% 0, 100% 100%)',
}));

export const StyledOption = styled(Option)(({ theme }) => ({
  color:
    theme.palette.mode === 'dark'
      ? theme.palette.common.white
      : theme.palette.primary[900],
  ':hover': {
    backgroundColor:
      theme.palette.mode === 'dark'
        ? theme.palette.primary[500]
        : theme.palette.primary[700],
    color: theme.palette.common.white,
  },
}));

export const MainThemeSelect = styled(Select)(({ theme }) => ({
  color:
    theme.palette.mode === 'dark'
      ? theme.palette.common.white
      : theme.palette.primary[900],

  ':hover, :focus, :focus-within': {
    boxShadow:
      theme.palette.mode === 'dark'
        ? `inset 0 0 0 3px ${theme.palette.common.white}`
        : `inset 0 0 0 3px ${theme.palette.primary[700]}`,
    backgroundColor:
      theme.palette.mode === 'dark'
        ? theme.palette.primary[500]
        : theme.palette.neutral[50],
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

  '& button': {
    color:
      theme.palette.mode === 'dark'
        ? theme.palette.common.white
        : theme.palette.common.black,
  },
}));

export const MainThemeInput = styled(Input)(({ theme }) => ({
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

  '& input': {
    color:
      theme.palette.mode === 'dark'
        ? theme.palette.common.white
        : theme.palette.primary[900],
  },
}));

export const MainThemeTextArea = styled(Textarea)(({ theme }) => ({
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

  '& textarea': {
    color:
      theme.palette.mode === 'dark'
        ? theme.palette.common.white
        : theme.palette.primary[900],
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
}));

export const StyledSlider = styled(Slider)(({ theme }) => ({
  '& .MuiSlider-rail': {
    height: 15,
    borderRadius: 2,
    backgroundColor:
      theme.palette.mode === 'dark'
        ? theme.palette.common.white
        : theme.palette.primary[500],
    opacity: 0.2,
    backdropFilter: 'blur(5px)',
  },

  '.MuiSlider-mark:first': {
    height: 1,
    color: 'red',
    backgroundColor: 'red',
  },

  '& .MuiSlider-mark': {
    height: 10,
  },

  '& .MuiSlider-track': {
    height: 18,
    borderRadius: 100,
    backgroundColor: theme.palette.primary[600],
  },

  '& .MuiSlider-thumb': {
    backgroundColor: theme.palette.common.white,
  },

  '& .MuiSlider-markLabel, & .MuiSlider-valueLabel': {
    color:
      theme.palette.mode === 'dark'
        ? theme.palette.common.white
        : theme.palette.primary[900],
  },

  '& .MuiSlider-valueLabel': {
    backgroundColor:
      theme.palette.mode === 'dark'
        ? theme.palette.primary[600]
        : theme.palette.neutral[100],
    ':before': {
      borderColor:
        theme.palette.mode === 'dark'
          ? theme.palette.primary[600]
          : theme.palette.neutral[100],
      borderLeftColor: 'transparent',
      borderBottomColor: 'transparent',
      borderRightColor: 'transparent',
    },
  },
}));
