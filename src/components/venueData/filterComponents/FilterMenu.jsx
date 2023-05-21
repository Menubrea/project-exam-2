import { Box, styled } from '@mui/joy';
import TuneIcon from '@mui/icons-material/Tune';
import CloseIcon from '@mui/icons-material/Close';
import { MainThemeButton } from '../../../styles/GlobalStyles';

const StyledFilterMenuBox = styled(Box)(({ theme }) => ({
  padding: 10,
  display: 'flex',
  justifyContent: 'space-between',
  borderRadius: '5px',

  backgroundColor:
    theme.palette.mode === 'dark'
      ? theme.palette.primary[700]
      : theme.palette.neutral[200],
}));

export default function FilterMenu({ ResetFilters, handleToggle, isShown }) {
  return (
    <StyledFilterMenuBox>
      <MainThemeButton
        id='filter-button'
        startDecorator={<TuneIcon fontSize='sm' />}
        onClick={handleToggle}
        size='sm'>
        {isShown ? 'Hide Filters' : 'Show Filters'}
      </MainThemeButton>{' '}
      <MainThemeButton
        endDecorator={<CloseIcon fontSize='sm' />}
        size='sm'
        onClick={ResetFilters}>
        Reset Filters
      </MainThemeButton>
    </StyledFilterMenuBox>
  );
}
