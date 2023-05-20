import { MainThemeButton } from '../../../styles/GlobalStyles';
import { useEffect, useState } from 'react';
import { SearchModal } from '../../modals';
import { Box, styled } from '@mui/joy';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';

const StyledBox = styled(Box)(({ theme }) => ({
  position: 'fixed',
  left: '50%',
  borderRadius: '0 0 5px 5px',
  transform: 'translateX(-50%)',
  width: 'fit-content',
  backgroundColor:
    theme.palette.mode === 'dark'
      ? theme.palette.primary[700]
      : theme.palette.neutral[200],
  padding: theme.spacing(0.5),
  zIndex: '100',
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
        top: 50,
        width: { xs: '100%', sm: 'fit-content' },
      }}>
      <Box sx={{ margin: '0 auto' }}>
        <MainThemeButton
          sx={{
            alignItems: 'center',
          }}
          size='md'
          fullWidth
          startDecorator={<TravelExploreIcon />}
          onClick={handleOpenSearch}>
          {open ? 'Close' : 'Find the perfect vacation'}
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
