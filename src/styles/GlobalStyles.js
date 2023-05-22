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

  '&:hover': {
    backgroundColor:
      theme.palette.mode === 'dark'
        ? theme.palette.neutral[300]
        : theme.palette.primary[700],
  },

  '& :disabled': {
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
        ? `inset 0 0 0 2px ${theme.palette.common.white}`
        : `inset 0 0 0 2px ${theme.palette.primary[500]}`,
  },

  border:
    theme.palette.mode === 'dark'
      ? `1px solid ${theme.palette.common.white}`
      : `1px solid ${theme.palette.primary[600]}`,

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

  'internal-autofill-selected': {
    transform: 'scale(1.5) !important',
    backgroundImage: 'red !important',
    color: 'red !important',
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
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing(2),
  margin: '0 auto 2em',
}));

export const StyledSlider = styled(Slider)(({ theme }) => ({
  '& .MuiSlider-mark': {
    backgroundColor:
      theme.palette.mode === 'dark'
        ? theme.palette.primary[400]
        : theme.palette.neutral[50],
    height: 8,
  },

  '& .MuiSlider-markActive': {
    border:
      theme.palette.mode === 'dark'
        ? `1px solid ${theme.palette.common.white}`
        : `1px solid ${theme.palette.primary[500]} `,
  },

  '& .MuiSlider-track': {
    height: 10,
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
        : theme.palette.primary[700],
  },

  '& .MuiSlider-valueLabel': {
    backgroundColor:
      theme.palette.mode === 'dark'
        ? theme.palette.common.white
        : theme.palette.primary[700],
    color:
      theme.palette.mode === 'dark'
        ? theme.palette.primary[900]
        : theme.palette.common.white,
    ':before': {
      borderColor:
        theme.palette.mode === 'dark'
          ? theme.palette.common.white
          : theme.palette.neutral[100],
      borderLeftColor: 'transparent',
      borderBottomColor: 'transparent',
      borderRightColor: 'transparent',
    },
  },
}));
