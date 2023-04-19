import { Button, Input, Sheet, styled, Box } from '@mui/joy';

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
  border:
    theme.palette.mode === 'dark'
      ? `1px solid ${theme.palette.common.white}`
      : `1px solid ${theme.palette.primary[700]}`,
}));

export const MainGrid = styled(Box)`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1em;
  max-width: 100%;
  margin: 0 auto 2em;
  min-height: 50vh;

  @media only screen and (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media only screen and (max-width: 870px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media only screen and (max-width: 600px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;
