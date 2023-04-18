import { Button, Input, Sheet, styled } from '@mui/joy';

export const MainThemeButton = styled(Button)(({ theme }) => ({
  color: theme.palette.common.white,
  backgroundColor: theme.palette.primary[700],
  border:
    theme.palette.mode === 'dark'
      ? `1px solid ${theme.palette.common.white}`
      : `1px solid ${theme.palette.primary[700]}`,
  borderRadius: 3,
}));

export const MainThemeInput = styled(Input)(({ theme }) => ({
  color:
    theme.palette.mode === 'dark'
      ? theme.palette.primary[900]
      : theme.palette.primary[900],
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
}));
