import { MainThemeButton } from '../../../styles/GlobalStyles';
import { useEffect, useState } from 'react';
import { SearchModal } from '../../modals';
import { Box, styled } from '@mui/joy';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';

const StyledBox = styled(Box)(({ theme }) => ({
  position: 'fixed',
  left: '50%',
  transform: 'translateX(-50%)',
  borderRadius: '5px',
  width: 'fit-content',
  backgroundColor:
    theme.palette.mode === 'dark'
      ? theme.palette.primary[700]
      : theme.palette.neutral[200],
  padding: theme.spacing(0.5),
  zIndex: '100',

  ':hover': {
    transition: 'all 1s ease-in-out',
    borderRadius: '100vh',
    '& button': {
      transition: 'all 1s ease-in-out',
      borderRadius: '100vh',
    },
  },
}));

export default function Search({ venues }) {
  const [search, setSearch] = useState('');
  const [filtered, setFiltered] = useState([]);
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    setAnchorEl(document.getElementById('search-input'));
  }, [open]);

  useEffect(() => {
    if (anchorEl) {
      anchorEl.focus();
    }
  }, [anchorEl]);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleOpenSearch = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSearch('');
  };

  return (
    <StyledBox
      sx={{
        top: { xs: 'auto', sm: 28 },
        bottom: { xs: 0, sm: 'auto' },
        width: { xs: '100%', sm: 'fit-content' },
        borderRadius: { xs: '0', sm: '5px' },
      }}>
      <Box sx={{ margin: '0 auto' }}>
        <MainThemeButton
          fullWidth
          startDecorator={<TravelExploreIcon />}
          size='sm'
          onClick={handleOpenSearch}>
          {open ? 'Close' : 'find your perfect vacation'}
        </MainThemeButton>
      </Box>

      <SearchModal
        venues={venues}
        handleChange={handleChange}
        handleClose={handleClose}
        search={search}
        setSearch={setSearch}
        open={open}
        setFiltered={setFiltered}
        filtered={filtered}
      />
    </StyledBox>
  );
}
