import { Box, IconButton, styled } from '@mui/joy';
import SearchIcon from '@mui/icons-material/Search';
import { SearchVenueModal } from '../../modals';
import { useState } from 'react';

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  '--size': '2.5rem',

  width: 'var(--size)',
  height: 'var(--size)',

  color:
    theme.palette.mode === 'dark'
      ? theme.palette.primary[700]
      : theme.palette.neutral[400],
  borderRadius: '100vw',
  backgroundColor:
    theme.palette.mode === 'dark'
      ? theme.palette.neutral[50]
      : theme.palette.primary[500],
  border:
    theme.palette.mode === 'dark'
      ? `4px solid ${theme.palette.primary[700]}`
      : `4px solid ${theme.palette.neutral[400]}`,

  ':hover': {
    backgroundColor:
      theme.palette.mode === 'dark'
        ? theme.palette.neutral[300]
        : theme.palette.primary[700],
  },
}));

export default function Searching({ venues }) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box>
      <StyledIconButton aria-label='Search venues' onClick={handleOpen}>
        <SearchIcon />
      </StyledIconButton>

      <SearchVenueModal venues={venues} open={open} handleClose={handleClose} />
    </Box>
  );
}
